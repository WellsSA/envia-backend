import Sequelize, { Model } from 'sequelize';

class Professor extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.NUMBER,
          allowNull: false,
          primaryKey: true,
          field: 'id_professor',
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          field: 'nome_professor',
        },
      },
      {
        tableName: 'professor',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Escola, {
      foreignKey: 'id_escola',
      as: 'escola',
    });
  }
}

export default Professor;
