import { log } from 'console';
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Author } from '../models/author.model';
import { Book } from '../models/book.model';
import { Product } from '../models/product.model';
import { Provider } from '../models/provider.model';

class AuthorsController {

    public async index(req: Request, res: Response) {

        try {
            console.log('index');
            // Book.belongsToMany(Author, { through: 'AuthorHasBook', foreignKey: 'BookId', otherKey: 'AuthorId' });
            // Author.belongsToMany(Book, { through: 'AuthorHasBook', foreignKey: 'AuthorId', otherKey: 'BookId' });
            Book.belongsToMany(Author, { through: 'AuthorHasBook' });
            Author.belongsToMany(Book, { through: 'AuthorHasBook' });

            const authors = await Author.findAll({
                include: Book
            });

            if (authors) {
                res.send(authors);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }

        // try {
        //     const authors = await Author.findAll({
        //         raw: true
        //     });

        //     if (authors) {
        //         res.send(authors);
        //     } else {
        //         res.sendStatus(404);
        //     }
        // } catch (error) {
        //     console.log(error);
        //     res.sendStatus(500);
        // }
    }



    // public async providers (req: Request, res: Response) {
    //     const product: Provider[] = await Provider.findAll(
    //         {
    //             include: [
    //                 {
    //                     model: Product
    //                 }
    //             ]   
    //         }
    //     );

    //     res.send(product);

    // }

    // public async show (req: Request, res: Response) {

    //     const product: Product[] = await Product.findAll(
    //         {
    //             include: [
    //                 {
    //                     model: Provider
    //                 }
    //             ]   
    //         }
    //     );

    //     res.send(product);

    // }

    public async showById(req: Request, res: Response) {

        try {
            const books = await Book.findAll({ where: { authorId: req.params.id } });
            if (books.length > 0) {
                res.json(books);
            } else {
                res.sendStatus(404);
            }

        } catch (error) {
            res.json(error);
        }
    }

    public async create(req: Request, res: Response) {

        try {
            console.log(req.params.id);
            const author = await Author.findByPk(req.params.id);

            if (author) {
                const request = req.body;
                const title = request.title;
                const description = request.description;
                console.log('title:', title);

                const bookFound = await Book.findAll({
                    where: {
                        title: title
                    }
                });

                if (bookFound.length > 0) {
                    console.log('bookFound: updating authorId:', bookFound);
                    const book = await Book.update(
                        {
                            authorId: req.params.id
                        },
                        {
                            where: {
                                title: title
                            }
                        }
                    );
                    res.sendStatus(200);
                } else {
                    console.log('Creating book')
                    const bookCreate = await Book.create({ title: title, description: description, authorId: req.params.id });
                    res.sendStatus(200);
                }


            } else {
                res.sendStatus(404);
            }

            // res.sendStatus(200);
            // const request = req.body;
            // const newUser = await User.create(request);
            // res.json(newUser);

        } catch (error) {
            res.json(error);
        }

    }

    public async delete(req: Request, res: Response) {

        try {
            console.log('req.params.id:', req.params.id);
            console.log('req.body.id:', req.body.id);
            const book = await Book.update(
                {
                    authorId: null
                },
                {
                    where: {
                        id: req.body.id,
                        authorId: req.params.id
                    }
                }
            );
            res.sendStatus(200);

        } catch (error) {
            res.json(error);
        }
    }

    public async update(req: Request, res: Response) {

        //     try {

        //         const user = await User.update(
        //             {
        //                 name: req.body.name,
        //                 familyName: req.body.familyName
        //             },
        //             {
        //                 where: {
        //                     id: req.params.id
        //                 }
        //             }
        //         );

        //         res.json(user);

        //     } catch (error){
        //         res.json(error);
        //     }
    }

}

export const authorsController = new AuthorsController();