import { RankingJugador, StatsRepository } from '../..';

interface GetGlobalStatsUseCase {
    execute(): Promise<RankingJugador[]>;
}

export class GetGlobalStats implements GetGlobalStatsUseCase {
    constructor(
        private readonly statsRepository: StatsRepository,
    ) { }

    execute(): Promise<RankingJugador[]> {
        return this.statsRepository.getGlobalStats();
    }
}
