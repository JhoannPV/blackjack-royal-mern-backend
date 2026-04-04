import { RankingJugador, RegisterResultDto, StatsSummary } from '..';

export abstract class StatsDatasource {
    abstract getMyStats(userId: string): Promise<StatsSummary>;
    abstract registerResult(userId: string, registerResultDto: RegisterResultDto): Promise<StatsSummary>;
    abstract getGlobalStats(): Promise<RankingJugador[]>;
}
