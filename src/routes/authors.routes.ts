import { Router } from 'express';
import { authorsController } from '../controllers/authors.controller';
import { booksController } from '../controllers/book.controller';

class AuthorsRoutes {

    public router: Router = Router();

    constructor(){
        
        this.router.get('/', authorsController.index);
        this.router.get('/:id/books', authorsController.showById);
        this.router.post('/:id/books', authorsController.create);
        this.router.delete('/:id/books', authorsController.delete);
        // this.router.put('/authors/:id/books', authorsController.update);

    }
}

export const authorRoutes = new AuthorsRoutes();
