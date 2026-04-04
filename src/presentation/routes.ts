import { Router } from "express";
import { AuthRoutes, StatsRoutes } from ".";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        // Definir todas mis rutas principales
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/stats', StatsRoutes.routes);

        return router;
    }
}