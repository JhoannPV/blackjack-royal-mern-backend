import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";



export class ValidatorFieldsMiddleware {
    static validateFieldsRegister = async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all([
            check('name', 'Name is required').not().isEmpty().run(req),
            check('usuario', 'Username is required').not().isEmpty().run(req),
            check('usuario', 'Username must be at least 3 characters').isLength({ min: 3 }).run(req),
            check('password', 'Password is required').not().isEmpty().run(req),
            check('password', 'Password must be at least 6 characters').isLength({ min: 6 }).run(req),
        ]);
        next();
    }

    static validateFieldsLogin = async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all([
            check('usuario', 'Username is required').not().isEmpty().run(req),
            check('usuario', 'Username must be at least 3 characters').isLength({ min: 3 }).run(req),
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
