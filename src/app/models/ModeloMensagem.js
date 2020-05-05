import Sequelize, { Model } from 'sequelize';

/*
endpoint:
  - id
  - title
  - greeting
  - content

db:

+-------------------+---------------+------+-----+---------+----------------+
| Field             | Type          | Null | Key | Default | Extra          |
+-------------------+---------------+------+-----+---------+----------------+
| id_mensagem       | int(11)       | NO   | PRI | NULL    | auto_increment |
| conteudo_mensagem | varchar(1000) | YES  |     | NULL    |                |
| id_escola         | int(11)       | YES  | MUL | NULL    |                |
| titulo_mensagem   | varchar(30)   | YES  |     | NULL    |                |
| saudacao_mensagem | varchar(80)   | YES  |     | NULL    |                |
+-------------------+---------------+------+-----+---------+----------------+

*/

class ModeloMensagem extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.NUMBER,
          allowNull: false,
          primaryKey: true,
          field: 'id_mensagem',
          autoIncrement: true,
        },
        title: {
          type: Sequelize.STRING,
          field: 'titulo_mensagem',
        },
        greeting: {
          type: Sequelize.STRING,
          field: 'saudacao_mensagem',
        },
        content: {
          type: Sequelize.STRING,
          field: 'conteudo_mensagem',
        },
      },
      {
        tableName: 'mensagem',
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

export default ModeloMensagem;
