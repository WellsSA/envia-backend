import Sequelize, { Model } from 'sequelize';


/*
endpoint:
  - id OK
  - name OK
  - days
  - hours
  - course: {
    id,
    name
  }
  - teacher: {
    id,
    name
  }

banco:

| id_turma         | int(11)      | NO   | PRI | NULL    | auto_increment |
| nome_turma       | varchar(50)  | YES  |     | NULL    |                |
| dias_aulas_turma | varchar(100) | YES  |     | NULL    |                |
| horarios_turma   | varchar(100) | YES  |     | NULL    |                |
| id_curso         | int(11)      | YES  | MUL | NULL    |                |
| id_professor     | int(11)      | YES  | MUL | NULL    |                |
| id_escola        |

*/
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
  }
}

export default Turma;
