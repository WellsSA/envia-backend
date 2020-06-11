import Sequelize, { Model } from 'sequelize';

/*
edpoint:
{
  id: 1,
  name: 'Zezim schoool',
  email: 'aa@bb.c',
  password: 1,
  licence: {
    licence: 'XOAB1D',
    start: '12'
    duration: '7d',
    type: 'ENVIA'
  }
}

db:
+-----------------+-------------+------+-----+---------+----------------+
| Field           | Type        | Null | Key | Default | Extra          |
+-----------------+-------------+------+-----+---------+----------------+
| id_licenca      | int(10)     | NO   | PRI | NULL    | auto_increment |
| licenca_licenca | varchar(60) | YES  |     | NULL    |                |
| vigencia_inicio | datetime    | YES  |     | NULL    |                |
| vigencia_fim    | datetime    | YES  |     | NULL    |                |
| tipo_licenca    | varchar(30) | YES  |     | NULL    |                |
+-----------------+-------------+------+-----+---------+----------------+
*/

class Licenca extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.NUMBER,
          allowNull: false,
          primaryKey: true,
          field: 'id_licenca',
          autoIncrement: true,
        },
        licence: {
          type: Sequelize.STRING,
          field: 'licenca_licenca',
        },
        start: {
          type: Sequelize.DATE,
          field: 'vigencia_inicio',
        },
        end: {
          type: Sequelize.DATE,
          field: 'vigencia_fim',
        },
        type: {
          type: Sequelize.STRING,
          field: 'tipo_licenca',
        },
        user_id: {
          type: Sequelize.NUMBER,
          field: 'id_escola',
        },
      },
      {
        tableName: 'licenca',
        sequelize,
      }
    );

    return this;
  }
}

export default Licenca;
