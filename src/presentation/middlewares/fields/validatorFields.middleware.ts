import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";



export class ValidatorFieldsMiddleware {
    private static resolveUsername(req: Request): string {
        return String(req.body?.username ?? req.body?.usuario ?? '').trim();
    }

    static validateFieldsRegister = async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all([
            check('name', 'Name is required').not().isEmpty().run(req),
            check('username', 'Username is required').custom(() => {
                const username = ValidatorFieldsMiddleware.resolveUsername(req);
                if (!username) {
                    throw new Error('Username is required');
                }
                return true;
            }).run(req),
            check('username', 'Username must be at least 3 characters').custom(() => {
                const username = ValidatorFieldsMiddleware.resolveUsername(req);
                if (username.length < 3) {
                    throw new Error('Username must be at least 3 characters');
                }
                return true;
            }).run(req),
            check('password', 'Password is required').not().isEmpty().run(req),
            check('password', 'Password must be at least 6 characters').isLength({ min: 6 }).run(req),
        ]);
        next();
    }

    static validateFieldsLogin = async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all([
            check('username', 'Username is required').custom(() => {
                const username = ValidatorFieldsMiddleware.resolveUsername(req);
                if (!username) {
                    throw new Error('Username is required');
                }
                return true;
            }).run(req),
            check('username', 'Username must be at least 3 characters').custom(() => {
                const username = ValidatorFieldsMiddleware.resolveUsername(req);
                if (username.length < 3) {
                    throw new Error('Username must be at least 3 characters');
                }
                return true;
            }).run(req),
            check('password', 'Password is required').not().isEmpty().run(req),
            check('password', 'Password must be at least 6 characters').isLength({ min: 6 }).run(req),
        ]);
        next();
    }

    static validateFieldsRegisterResult = async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all([
            check('resultado', 'Result is required').not().isEmpty().run(req),
            check('resultado', 'Result is not valid').isIn(['ganada', 'perdida', 'empatada']).run(req),
        ]);
        next();
    }

}
