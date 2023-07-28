'use strict';
import Sequelize, {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import Seat from './seats';
import User from './users';

class Reservation extends Model<
  InferAttributes<Reservation>,
  InferCreationAttributes<Reservation>
> {
  declare reservationId: CreationOptional<number>;
  declare userId: number;
  declare seatId: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Reservation.init(
      {
        reservationId: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        seatId: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        modelName: 'Reservations',
        tableName: 'Reservations',
        sequelize,
      }
    );
  }
  static associate() {
    this.belongsTo(User, { foreignKey: 'userId', targetKey: 'userId' });
    this.belongsTo(Seat, { foreignKey: 'seatId', targetKey: 'seatId' });
  }
}

export default Reservation;
