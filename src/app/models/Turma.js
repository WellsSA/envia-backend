import Sequelize, { Model } from 'sequelize';

class Turma extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.NUMBER,
          allowNull: false,
          primaryKey: true,
          field: 'id_turma',
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          field: 'nome_turma',
        },
        days: {
          type: Sequelize.STRING,
          field: 'dias_aulas_turma',
        },
        hours: {
          type: Sequelize.STRING,
          field: 'horarios_turma',
        },
      },
      {
        tableName: 'turma',
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

    this.belongsTo(models.Curso, {
      foreignKey: 'id_curso',
      as: 'course',
    });

    this.belongsTo(models.Professor, {
      foreignKey: 'id_professor',
      as: 'teacher',
    });

    this.belongsToMany(models.Aluno, {
      through: 'turma_alunos',
      as: 'alunos',
      foreignKey: 'id_turma',
    });
  }
}

export default Turma;
