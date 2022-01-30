import {Request, Response} from "express";
import {CreateUser} from '../../application/features/users';
class UsersController {
    async handleCreateUser(request: Request, response: Response) {
        const {userName, name, password} = request.body;

        const createUser = new CreateUser();
        const user = await createUser.execute({
            name,
            userName,
            password
        });

        return response.status(201).json(user);
    }
}

export {UsersController};
