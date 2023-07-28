'use strict';
import Sequelize, {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import User from './users';
import Seat from './seats';

class Show extends Model<InferAttributes<Show>, InferCreationAttributes<Show>> {
  declare showId: CreationOptional<number>;
  declare userId: number;
  declare title: string;
  declare description: string;
  declare showTime: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Show.init(
      {
        showId: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
        },
        title: {
          allowNull: false,
          type: DataTypes.STRING(20),
          unique: true,
        },
        description: {
          allowNull: false,
          type: DataTypes.STRING(100),
        },
        showTime: {
          allowNull: false,
          type: DataTypes.STRING(20),
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        modelName: 'Shows',
        tableName: 'Shows',
        sequelize,
      }
    );
  }
  static associate() {
    this.belongsTo(User, { foreignKey: 'userId', targetKey: 'userId' });
    this.hasMany(Seat, { foreignKey: 'showId', sourceKey: 'showId' });
  }
}

export default Show;
