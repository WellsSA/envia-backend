import Sequelize, { Model } from 'sequelize';

/*
endpoint:
  - id
  - sentAt
  - message
  - criteria
  - platforms
  - studentsQuantity
  - responsibleQuantity
  - students (string)

db:
+------------------+---------------+------+-----+---------+----------------+
| Field            | Type          | Null | Key | Default | Extra          |
+------------------+---------------+------+-----+---------+----------------+
| id_envio         | int(11)       | NO   | PRI | NULL    | auto_increment |
| data_hora_envio  | datetime      | YES  |     | NULL    |                |
| titulo_mensagem  | varchar(30)   | YES  |     | NULL    |                |
| criterio         | varchar(30)   | YES  |     | NULL    |                |
| plataforma       | varchar(30)   | YES  |     | NULL    |                |
| qtd_alunos       | int(10)       | YES  |     | NULL    |                |
| qtd_responsaveis | int(10)       | YES  |     | NULL    |                |
| alunos           | varchar(1000) | YES  |     | NULL    |                |
| id_escola        | int(10)       | YES  |     | NULL    |                |
+------------------+---------------+------+-----+---------+----------------+

*/

class Envio extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.NUMBER,
          allowNull: false,
          primaryKey: true,
          field: 'id_envio',
          autoIncrement: true,
        },
        sentAt: {
          type: Sequelize.DATE,
          field: 'data_hora_envio',
        },
        message: {
          type: Sequelize.STRING,
          field: 'titulo_mensagem',
        },
        criteria: {
          type: Sequelize.STRING,
          field: 'criterio',
        },
        platforms: {
          type: Sequelize.STRING,
          field: 'plataforma',
        },
        studentsQuantity: {
          type: Sequelize.NUMBER,
          field: 'qtd_alunos',
        },
        responsibleQuantity: {
          type: Sequelize.NUMBER,
          field: 'qtd_responsaveis',
        },
        students: {
          type: Sequelize.STRING,
          field: 'alunos',
        },
      },
      {
        tableName: 'envios',
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

export default Envio;
