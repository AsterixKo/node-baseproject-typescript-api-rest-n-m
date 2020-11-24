import { Router } from 'express';
import { booksController } from '../controllers/book.controller';

class BooksRoutes {

    public router: Router = Router();

    constructor(){
        
        this.router.get('/', booksController.index);
        this.router.get('/:id', booksController.showById);
        this.router.post('/', booksController.create);
        this.router.delete('/:id', booksController.delete);
        this.router.put('/:id', booksController.update);

    }
}

export const bookRoutes = new BooksRoutes();
