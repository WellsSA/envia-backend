import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';
import {
  Professor,
  Licenca,
  Escola,
  Curso,
  Turma,
  ModeloMensagem,
  Envio,
  Responsavel,
  Aluno,
} from '../app/models';

const models = [
  Professor,
  Licenca,
  Escola,
  Curso,
  Turma,
  ModeloMensagem,
  Envio,
  Responsavel,
  Aluno,
];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    const _connect = async () => {
      try {
        this.mongoConnection = await mongoose.connect(process.env.MONGO_URL, {
          useNewUrlParser: true,
          useFindAndModify: true,
          useUnifiedTopology: true,
        });
        console.info('MongoDB connected!');
      } catch (err) {
        console.error('@database/mongo. Error:', err.message);
        console.info('MongoDB not connected.');
      }
    };

    _connect();
  }
}

export default new Database();
