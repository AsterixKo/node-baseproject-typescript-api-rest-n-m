import { Model, Sequelize, DataTypes } from 'sequelize';
import { database } from '../database';
import { Author } from './author.model';
import { Book } from './book.model';

export class AuthorHasBook extends Model {
    public id!: number;
    public title!: string;
    public AuthorId!: number;
    public BookId!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

AuthorHasBook.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    AuthorId: {
        type: DataTypes.INTEGER
    },
    BookId: {
        type: DataTypes.INTEGER
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
    tableName: 'AuthorHasBook',
    sequelize: database // Es donde decimos como conectanros a la base de datos
});

// Book.belongsToMany(Author, { through: 'AuthorHasBook', foreignKey: 'BookId', otherKey: 'AuthorId' });
// Author.belongsToMany(Book, { through: 'AuthorHasBook', foreignKey: 'AuthorId', otherKey: 'BookId' });