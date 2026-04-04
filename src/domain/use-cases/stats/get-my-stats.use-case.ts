import { StatsRepository, StatsSummary } from '../..';

interface GetMyStatsUseCase {
    execute(userId: string): Promise<StatsSummary>;
}

export class GetMyStats implements GetMyStatsUseCase {
    constructor(
        private readonly statsRepository: StatsRepository,
    ) { }

    execute(userId: string): Promise<StatsSummary> {
        return this.statsRepository.getMyStats(userId);
    }
}
