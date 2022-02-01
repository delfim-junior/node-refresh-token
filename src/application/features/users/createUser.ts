import {client} from "../../../persistence/prisma/client";
import {hash} from "bcryptjs";

interface IUserRequest {
    name: string;
    password: string;
    userName: string;
}

class CreateUser {
    async execute({name, userName, password}: IUserRequest)  {
        // Verify if user exists
        let user = await client.user.findFirst({
            where: {
                userName
            }
        })

        if (user) {
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);

        user = await client.user.create({
            data: {
                name,
                userName,
                password: passwordHash
            }
        });

        return user;
    }
}

export {CreateUser};
