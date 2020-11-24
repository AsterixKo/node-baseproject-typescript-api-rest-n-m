import { log } from 'console';
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { User } from '../models/user.model';
import { Product } from '../models/product.model';
import { Provider } from '../models/provider.model';

class UsersController {

    public async index (req: Request, res: Response) {        
    
        try{
            // SELECT * FROM USERS WHERE name = 'Antonio' AND id:3 AND familyName = 'Lozano' OR familyName='Belén'
            const users = await User.findAll({ 
                where: {
                    name: {
                        [Op.like] : '%A%'
                    },
                    id: 3,
                    [Op.or] : [
                        {familyName: 'Lozano'},
                        {familyName: 'Belén'}
                    ]
                },
                raw: true
            });
            const userAntonio = await User.findByPk(3, { raw: true});

            if(userAntonio && users){
                res.send(users);
            }else{
                res.sendStatus(404);
            }
            
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }   
    }

    public async providers (req: Request, res: Response) {
        const product: Provider[] = await Provider.findAll(
            {
                include: [
                    {
                        model: Product
                    }
                ]   
            }
        );

        res.send(product);
        
    }

    public async show (req: Request, res: Response) {

        const product: Product[] = await Product.findAll(
            {
                include: [
                    {
                        model: Provider
                    }
                ]   
            }
        );

        res.send(product);
        
    }

    public async showById(req: Request, res: Response){
        console.log(req.params.id);

        try {
            
            const user = await User.findByPk(req.params.id, { raw: true});

            res.send(user);

        } catch (error){
            res.json(error);
        }
    }

    public async create (req: Request, res: Response){

        try{
            const request = req.body;
            const newUser = await User.create(request);

            res.json(newUser);

        }catch(error){

            res.json(error);
            
        }
            
    }

    public async delete (req: Request, res: Response){

        console.log(req.params.id);

        try {
            
            const user = await User.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.sendStatus(200);

        } catch (error){
            res.json(error);
        }
    }

    public async update (req: Request, res: Response){

        try {
            
            const user = await User.update(
                {
                    name: req.body.name,
                    familyName: req.body.familyName
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            );

            res.json(user);

        } catch (error){
            res.json(error);
        }
    }

}

export const usersController = new UsersController();