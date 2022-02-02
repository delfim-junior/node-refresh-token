import 'dotenv';
import {sign} from "jsonwebtoken";
import {IUser} from "../../domain/User";

export class JwtGenerator {
    getToken(userId: string): string {
        const token = sign({}, process.env.ACCESS_TOKEN_SECRET, {
            subject: userId,
            expiresIn: "20s",

        });
        return token;
    }
}
