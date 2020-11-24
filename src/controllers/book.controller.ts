import { log } from 'console';
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Product } from '../models/product.model';
import { Provider } from '../models/provider.model';
import { Book } from '../models/book.model';

class BooksController {

    public async index(req: Request, res: Response) {

        try {
            const books = await Book.findAll({raw: true});

            if (books) {
                res.send(books);
            } else {
                res.sendStatus(404);
            }

        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }

    public async showById(req: Request, res: Response) {
        console.log(req.params.id);

        try {

            const book = await Book.findByPk(req.params.id, { raw: true });

            res.send(book);

        } catch (error) {
            res.json(error);
        }
    }

    public async create(req: Request, res: Response) {

        try {
            const request = req.body;
            const newUser = await Book.create(request);

            res.json(newUser);

        } catch (error) {

            res.json(error);

        }

    }

    public async delete(req: Request, res: Response) {

        console.log(req.params.id);

        try {

            const user = await Book.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.sendStatus(200);

        } catch (error) {
            res.json(error);
        }
    }

    public async update(req: Request, res: Response) {

        try {

            const book = await Book.update(
                {
                    title: req.body.title,
                    description: req.body.description
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            );

            res.json(book);

        } catch (error) {
            res.json(error);
        }
    }

}

export const booksController = new BooksController();