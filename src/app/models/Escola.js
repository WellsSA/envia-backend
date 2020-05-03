import Sequelize, { Model } from 'sequelize';

class Escola extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.NUMBER,
          allowNull: false,
          primaryKey: true,
          field: 'id_escola',
        },
      },
      {
        tableName: 'escola',
        sequelize,
      }
    );

    return this;
  }

}

export default Escola;
