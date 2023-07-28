'use strict';
import Sequelize, {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import Show from './shows';
import Reservation from './reservations';

class Seat extends Model<InferAttributes<Seat>, InferCreationAttributes<Seat>> {
  declare seatId: CreationOptional<number>;
  declare showId: number;
  declare seatNumber: number;
  declare grade: string;
  declare price: number;
  declare isReservation: boolean;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Seat.init(
      {
        seatId: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        showId: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        seatNumber: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        grade: {
          allowNull: false,
          type: DataTypes.STRING(10),
        },
        price: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        isReservation: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        modelName: 'Seats',
        tableName: 'Seats',
        sequelize,
      }
    );
  }
  static associate() {
    this.belongsTo(Show, { foreignKey: 'showId', targetKey: 'showId' });
    this.hasOne(Reservation, { foreignKey: 'seatId', sourceKey: 'seatId' });
  }
}

export default Seat;
