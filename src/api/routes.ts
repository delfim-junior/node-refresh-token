import {Router} from "express";
import {UsersController} from "./controller/UsersController";

const router = Router();
const usersController = new UsersController();

router.post('/api/users', usersController.handleCreateUser);

export {router};
