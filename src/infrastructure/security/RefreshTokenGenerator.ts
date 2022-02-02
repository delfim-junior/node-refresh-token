import {client} from "../../persistence/prisma/client";
import dayjs from 'dayjs'
import {generateRandomString} from "../../application/helpers/generateRandomString";

export class RefreshTokenGenerator {
    async execute(userId: string) {
        const expiresIn = dayjs().add(15, 'second').unix();
        const tokenValue = generateRandomString(12);

        const generatedRefreshToken = await client.refreshToken.create({
            data: {
                userId,
                expiresIn,
                tokenValue
            }
        });

        return generatedRefreshToken;
    }
}
