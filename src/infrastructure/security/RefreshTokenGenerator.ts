import {client} from "../../persistence/prisma/client";
import dayjs from 'dayjs'

export class RefreshTokenGenerator {
    async execute(userId: string) {
        const expiresIn = dayjs().add(15, 'second').unix();

        const generatedRefreshToken = await client.refreshToken.create({
            data: {
                userId,
                expiresIn
            }
        });
        return generatedRefreshToken;
    }
}
