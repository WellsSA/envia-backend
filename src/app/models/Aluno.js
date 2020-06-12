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
        email: {
          type: Sequelize.STRING,
          field: 'email_aluno',
          unique: true,
        },
        phone: {
          type: Sequelize.STRING,
          field: 'celular_aluno',
        },
        birthDate: {
          type: Sequelize.DATE,
          field: 'data_nascimento',
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

    this.belongsTo(models.Responsavel, {
      foreignKey: 'id_responsavel',
      as: 'responsible',
    });

    this.belongsToMany(models.Turma, {
      through: 'turma_alunos',
      as: 'turmas',
      foreignKey: 'id_aluno',
    });
  }
}

export default Aluno;
