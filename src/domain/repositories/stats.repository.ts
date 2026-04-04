import { RankingJugador, RegisterResultDto, StatsSummary } from '..';

export abstract class StatsRepository {
    abstract getMyStats(userId: string): Promise<StatsSummary>;
    abstract registerResult(userId: string, registerResultDto: RegisterResultDto): Promise<StatsSummary>;
    abstract getGlobalStats(): Promise<RankingJugador[]>;
}
