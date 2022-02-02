import {Request, Response} from "express";
import {AuthenticateUser} from "../../application/features/auth/AuthenticateUser";
import {RefreshUserToken} from "../../application/features/auth/RefreshUserToken";

export class AuthController {
    async handleAuthentication(request: Request, response: Response) {
        const {userName, password} = request.body;

        const authenticateUser = new AuthenticateUser();
        const token = await authenticateUser.execute({
            userName,
            password
        });

        response.json(token);
    }

    async handleRefreshToken(request: Request, response: Response) {
        const {refreshToken} = request.body;

        const refreshUserToken = new RefreshUserToken();
        const token = await refreshUserToken.execute(refreshToken);

        response.json(token);
    }

}
