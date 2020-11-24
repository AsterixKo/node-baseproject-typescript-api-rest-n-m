import { Router } from 'express';
import { usersController } from '../controllers/users.controller';

class UsersRoutes {

    public router: Router = Router();

    constructor(){
        this.router.get('/show', usersController.show);
        
        this.router.get('/', usersController.index);
        this.router.get('/:id', usersController.showById);
        this.router.post('/', usersController.create);
        this.router.delete('/:id', usersController.delete);
        this.router.put('/:id', usersController.update);

        this.router.get('/providers', usersController.providers);
    }
}

export const userRoutes = new UsersRoutes();
