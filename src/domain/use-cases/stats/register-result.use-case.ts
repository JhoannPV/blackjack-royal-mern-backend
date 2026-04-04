import { RegisterResultDto, StatsRepository, StatsSummary } from '../..';

interface RegisterResultUseCase {
    execute(userId: string, registerResultDto: RegisterResultDto): Promise<StatsSummary>;
}

export class RegisterResult implements RegisterResultUseCase {
    constructor(
        private readonly statsRepository: StatsRepository,
    ) { }

    execute(userId: string, registerResultDto: RegisterResultDto): Promise<StatsSummary> {
        return this.statsRepository.registerResult(userId, registerResultDto);
    }
}
