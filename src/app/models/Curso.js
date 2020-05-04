import Sequelize, { Model } from 'sequelize';

class Curso extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.NUMBER,
          allowNull: false,
          primaryKey: true,
          field: 'id_curso',
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          field: 'nome_curso',
        },
      },
      {
        tableName: 'curso',
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

export default Curso;
