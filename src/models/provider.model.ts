import { Model, Sequelize, DataTypes } from 'sequelize';
import { database } from '../database';

export class Provider extends Model {
    public id!: number;
    public name!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Provider.init({
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
    createdAt :{
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'providers',
    sequelize: database // Es donde decimos como conectanros a la base de datos
})