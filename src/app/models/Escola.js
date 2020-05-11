import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Escola extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.NUMBER,
          allowNull: false,
          primaryKey: true,
          field: 'id_escola',
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'nome_escola',
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'email_escola',
        },
        password: Sequelize.VIRTUAL,
        password_hash: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'senha_escola',
        },
      },
      {
        tableName: 'escola',
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Escola;
