import {Request, Response} from "express";
import {AuthenticateUser} from "../../application/features/auth/AuthenticateUser";

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
}
