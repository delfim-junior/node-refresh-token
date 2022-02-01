import {client} from "../../../persistence/prisma/client";
import {compare} from "bcryptjs";
import {JwtGenerator} from "../../../infrastructure/security/JwtGenerator";
import {IUser} from "../../../domain/User";

interface IRequest {
    userName: string;
    password: string;
}

export class AuthenticateUser {
    async execute({userName, password}: IRequest) {
        // Verify
        let loggedUser = await client.user.findFirst({
            where: {
                userName
            }
        });

        loggedUser = loggedUser as IUser;

        if (!loggedUser) {
            throw new Error('User or password incorrect.');
        }

        const passwordMatch = await compare(password, loggedUser.password);

        if (!passwordMatch) {
            throw new Error('User or password incorrect.');
        }

        // Generate User token
        const jwtGenerator = new JwtGenerator();
        const token = jwtGenerator.getToken(loggedUser);

        return {token};
    }
}
