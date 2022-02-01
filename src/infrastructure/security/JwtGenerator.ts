import 'dotenv';
import {sign} from "jsonwebtoken";
import {IUser} from "../../domain/User";

export class JwtGenerator {
    getToken(user: IUser): string {
        const token = sign({}, process.env.ACCESS_TOKEN_SECRET, {
            subject: JSON.stringify(user.id),
            expiresIn: "20s",

        });
        return token;
    }
}
