import { Model, DataTypes } from 'sequelize';
import { sequelize } from './database';

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  // ... other fields

  // Optional: Define associations with other models
  // static associate(models: any) {
  //   // Define associations here
  // }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // ... other fields
  },
  {
    sequelize,
    modelName: 'User', // Set the model name
    tableName: 'users', // Set the table name (optional, defaults to pluralized model name)
  }
);

export default User;