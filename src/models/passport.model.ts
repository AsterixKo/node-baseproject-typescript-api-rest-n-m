import { Model, Sequelize, DataTypes } from 'sequelize';
import { database } from '../database';

export class Passport extends Model {
    public id!: number;
    public passportNumber!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Passport.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    passporNumber: {
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
    tableName: 'passports',
    sequelize: database // Es donde decimos como conectanros a la base de datos
})