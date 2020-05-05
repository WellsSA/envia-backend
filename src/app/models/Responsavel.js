import Sequelize, { Model } from 'sequelize';

class Responsavel extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.NUMBER,
          allowNull: false,
          primaryKey: true,
          field: 'id_responsavel',
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          field: 'nome_responsavel',
        },
        email: {
          type: Sequelize.STRING,
          field: 'email_responsavel',
        },
        phone: {
          type: Sequelize.STRING,
          field: 'celular_responsavel',
        },
      },
      {
        tableName: 'responsavelexterno',
        sequelize,
      }
    );

    return this;
  }
}

export default Responsavel;
