import {client} from "../../../persistence/prisma/client";
import {JwtGenerator} from "../../../infrastructure/security/JwtGenerator";
import dayjs from "dayjs";
import {RefreshTokenGenerator} from "../../../infrastructure/security/RefreshTokenGenerator";

export class RefreshUserToken {
    async execute(refToken: string): Promise<Object> {
        let refreshToken = await client.refreshToken.findFirst({
            where: {
                tokenValue: refToken
            }
        })
        if (!refreshToken) {
            throw new Error('Refresh token invalid');
        }

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

        if(refreshTokenExpired){
            await client.refreshToken.delete({
                where: {
                    userId: refreshToken.userId
                }
            });

            const refreshTokenGenerator = new RefreshTokenGenerator();
            refreshToken = await refreshTokenGenerator.execute(refreshToken.userId);
        }

        const jwtGenerator = new JwtGenerator();
        const token = jwtGenerator.getToken(refreshToken.userId);

        return {token};
    }
}
