import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import {
  Professor,
  Escola,
  Curso,
  Turma,
  ModeloMensagem,
  Envio,
  Aluno,
  Responsavel,
} from '../app/models';

const models = [
  Professor,
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
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
