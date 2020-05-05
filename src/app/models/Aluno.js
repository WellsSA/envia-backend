import Sequelize, { Model } from 'sequelize';

class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.NUMBER,
          allowNull: false,
          primaryKey: true,
          field: 'id_aluno',
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          field: 'nome_aluno',
        },
      },
      {
        tableName: 'aluno',
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

export default Aluno;
