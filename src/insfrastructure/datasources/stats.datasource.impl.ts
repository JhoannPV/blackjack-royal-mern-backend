import { CustomError, RankingJugador, RegisterResultDto, StatsDatasource, StatsSummary } from '../../domain';
import { StatsModel, UserModel } from '../../data/mongodb';
import { StatsMapper } from '../mappers/stats.mapper';

const emptyStats: StatsSummary = {
    ganadas: 0,
    perdidas: 0,
    empatadas: 0,
    totalPartidas: 0,
};

export class StatsDatasourceImpl implements StatsDatasource {
    async getMyStats(userId: string): Promise<StatsSummary> {
        try {
            const stats = await StatsModel.findOne({ user: userId });

            if (!stats) {
                return emptyStats;
            }

            return StatsMapper.statsSummaryFromObject(stats);
        } catch {
            throw CustomError.internalServer();
        }
    }

    async registerResult(userId: string, registerResultDto: RegisterResultDto): Promise<StatsSummary> {
        try {
            const { resultado } = registerResultDto;

            const updateField = resultado === 'ganada'
                ? { ganadas: 1 }
                : resultado === 'perdida'
                    ? { perdidas: 1 }
                    : { empatadas: 1 };

            const stats = await StatsModel.findOneAndUpdate(
                { user: userId },
                { $inc: updateField },
                { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true }
            );

            return StatsMapper.statsSummaryFromObject(stats);
        } catch {
            throw CustomError.internalServer();
        }
    }

    async getGlobalStats(): Promise<RankingJugador[]> {
        try {
            const users = await UserModel.find().select('_id name username').lean();
            const stats = await StatsModel.find().lean();

            const statsMap = new Map(
                stats.map(item => [item.user.toString(), item])
            );

            const rankingBase = users.map(user => {
                const item = statsMap.get(user._id.toString());
                const ganadas = item?.ganadas ?? 0;
                const perdidas = item?.perdidas ?? 0;
                const empatadas = item?.empatadas ?? 0;
                const total = ganadas + perdidas + empatadas;
                const efectividad = total > 0 ? (ganadas / total) * 100 : 0;

                return StatsMapper.rankingWithoutPositionFromObject({
                    nombre: user.name,
                    usuario: user.username,
                    ganadas,
                    perdidas,
                    empatadas,
                    total,
                    efectividad,
                });
            }).sort((a, b) => {
                if (b.ganadas !== a.ganadas) return b.ganadas - a.ganadas;
                if (b.efectividad !== a.efectividad) return b.efectividad - a.efectividad;
                return b.total - a.total;
            });

            const ranking = rankingBase.map((item, index) =>
                StatsMapper.rankingFromObject(item, index + 1)
            );

            return ranking;
        } catch {
            throw CustomError.internalServer();
        }
    }
}
