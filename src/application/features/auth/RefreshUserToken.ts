import {client} from "../../../persistence/prisma/client";
import {JwtGenerator} from "../../../infrastructure/security/JwtGenerator";

export class RefreshUserToken {
    async execute(refToken: string): Promise<Object> {
        const refreshToken = await client.refreshToken.findFirst({
            where: {
                tokenValue: refToken
            }
        })
        if (!refreshToken) {
            throw new Error('Refresh token invalid');
        }

        const jwtGenerator = new JwtGenerator();
        const token = jwtGenerator.getToken(refreshToken.userId);

        return {token};
    }
}
