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

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare userId: CreationOptional<number>;
  declare name: string;
  declare nickname: string;
  declare email: string;
  declare password: string;
  declare point: CreationOptional<number>;
  declare isAdmin: boolean;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initiate(sequelize: Sequelize.Sequelize) {
    User.init(
      {
        userId: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING(20),
        },
        nickname: {
          allowNull: false,
          type: DataTypes.STRING(20),
          unique: true,
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING(20),
          unique: true,
        },
        password: {
          allowNull: false,
          type: DataTypes.STRING(255),
        },
        point: {
          type: DataTypes.INTEGER.UNSIGNED,
        },
        isAdmin: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        modelName: 'Users',
        tableName: 'Users',
        sequelize,
      }
    );
  }
  static associate() {
    this.hasMany(Show, { foreignKey: 'userId', sourceKey: 'userId' });
    this.hasMany(Reservation, { foreignKey: 'userId', sourceKey: 'userId' });
  }
}

export default User;
// User.init(
//   {
//     userId: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       allowNull: false,
//       type: DataTypes.STRING(20),
//       unique: true,
//     },
//     nickname: {
//       allowNull: false,
//       type: DataTypes.STRING(20),
//       unique: true,
//     },
//     email: {
//       allowNull: false,
//       type: DataTypes.STRING(20),
//       unique: true,
//     },
//     password: {
//       allowNull: false,
//       type: DataTypes.STRING(30),
//     },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//   },
//   {
//     modelName: 'Users',
//     tableName: 'users',
//     sequelize,
//   }
// );

//   User.hasMany(Project, {
//     sourceKey: 'id',
//     foreignKey: 'ownerId',
//     as: 'projects' // this determines the name in `associations`!
//   });

//   Address.belongsTo(User, { targetKey: 'id' });
//   User.hasOne(Address, { sourceKey: 'id' });
