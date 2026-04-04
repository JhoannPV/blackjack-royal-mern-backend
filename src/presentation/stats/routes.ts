import { Router } from 'express';

import { AuthMiddleware, ResErrorsMiddleware, ValidatorFieldsMiddleware } from '..';
import { StatsDatasourceImpl, StatsRepositoryImpl } from '../../insfrastructure';
import { StatsController } from './controller';

export class StatsRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new StatsDatasourceImpl();
        const statsRepository = new StatsRepositoryImpl(datasource);
        const controller = new StatsController(statsRepository);

        router.get('/me', [AuthMiddleware.validateJWT], controller.getMyStats);

        router.post(
            '/register-result',
            [
                AuthMiddleware.validateJWT,
                ValidatorFieldsMiddleware.validateFieldsRegisterResult,
                ResErrorsMiddleware.resErrors,
            ],
            controller.registerResult
        );

        router.get('/global', [AuthMiddleware.validateJWT], controller.getGlobalStats);

        return router;
    }
}
