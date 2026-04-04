import { Request, Response } from 'express';

import { CustomError, GetGlobalStats, GetMyStats, RegisterResult, RegisterResultDto, StatsRepository } from '../../domain';

export class StatsController {
    constructor(
        private readonly statsRepository: StatsRepository,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    };

    getMyStats = async (req: Request, res: Response) => {
        try {
            const userId = req.body.user?.id;

            if (!userId) {
                res.status(401).json({ error: 'User not found in token' });
                return;
            }

            const response = await new GetMyStats(this.statsRepository).execute(userId);

            res.status(200).json(response);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    registerResult = async (req: Request, res: Response) => {
        try {
            const userId = req.body.user?.id;
            const [error, registerResultDto] = RegisterResultDto.create(req.body);

            if (!userId) {
                res.status(401).json({ error: 'User not found in token' });
                return;
            }

            if (error) {
                res.status(400).json({ error: 'Invalid register result dto' });
                return;
            }

            const response = await new RegisterResult(this.statsRepository).execute(
                userId,
                registerResultDto!,
            );

            res.status(200).json(response);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    getGlobalStats = async (_req: Request, res: Response) => {
        try {
            const ranking = await new GetGlobalStats(this.statsRepository).execute();

            res.status(200).json({ ranking });
        } catch (error) {
            this.handleError(error, res);
        }
    };
}
