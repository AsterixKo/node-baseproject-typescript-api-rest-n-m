import { Model, Sequelize, DataTypes } from 'sequelize';
import { database } from '../database';
import { Provider } from './provider.model';

export class Product extends Model {
    public id!: number;
    public name!: string;
    public price!: number;
    public providerId!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Product.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    },
    providerId: {
        type: DataTypes.INTEGER
    },
    createdAt :{
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'products',
    sequelize: database // Es donde decimos como conectanros a la base de datos
})

Product.belongsTo(Provider);
Provider.hasMany(Product);