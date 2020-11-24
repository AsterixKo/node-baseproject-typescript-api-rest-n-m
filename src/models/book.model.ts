import { Model, Sequelize, DataTypes } from 'sequelize';
import { database } from '../database';

export class Book extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public authorId!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Book.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    authorId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    tableName: 'books',
    sequelize: database // Es donde decimos como conectanros a la base de datos
})