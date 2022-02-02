import {Request, Response, Router} from "express";
import {UsersController} from "./controller/UsersController";
import {AuthController} from "./controller/AuthController";
import {ensureAuthentication} from "./middlewares/ensureAuthentication";

const router = Router();
const usersController = new UsersController();
const authController = new AuthController();

router.post('/api/users', usersController.handleCreateUser);
router.post('/api/auth', authController.handleAuthentication);

router.get('/api/dishes', ensureAuthentication, (request: Request, response: Response) => {
    return response.json([
        {id: 1, name: 'Kakana'},
        {id: 2, name: 'Grão de Bico'},
    ]);
});

router.get('/api/auth', authController.handleRefreshToken);

export {router};
