import { NextFunction, Response } from "express";
import { createToken } from "../../middleware/auth";
import { AuthRequest } from "../../middleware/auth/auth.types";

export default class AuthController {
    login = async (req: AuthRequest, res: Response, next: NextFunction) => {
        // don't show password
        const { user } = req;
        return res.json({
            user,
            // TODO as token?
            token: createToken(user),
        });
    };
}
