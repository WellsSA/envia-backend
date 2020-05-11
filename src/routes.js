import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import {
  SessionsController,
  ProfessoresController,
  CursosController,
  TurmasController,
  ModelosMensagensController,
  EnviosController,
  AlunosController,
  ImportController,
} from './app/controllers';

import multer from 'multer';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (_, res) => res.json({ hello: true }));
routes.post('/sessions', SessionsController.index);

routes.use(authMiddleware);

routes.get('/professores', ProfessoresController.index);
routes.post('/professores', ProfessoresController.store);
routes.put('/professores/:id', ProfessoresController.update);
routes.delete('/professores/:id', ProfessoresController.delete);

routes.get('/cursos', CursosController.index);
routes.post('/cursos', CursosController.store);
routes.put('/cursos/:id', CursosController.update);
routes.delete('/cursos/:id', CursosController.delete);

routes.get('/turmas', TurmasController.index);
routes.post('/turmas', TurmasController.store);
routes.put('/turmas/:id', TurmasController.update);
routes.delete('/turmas/:id', TurmasController.delete);

routes.get('/alunos', AlunosController.index);
routes.post('/alunos', AlunosController.store);
routes.put('/alunos/:id', AlunosController.update);
routes.delete('/alunos/:id', AlunosController.delete);

routes.get('/modelosMensagens', ModelosMensagensController.index);
routes.post('/modelosMensagens', ModelosMensagensController.store);
routes.put('/modelosMensagens/:id', ModelosMensagensController.update);
routes.delete('/modelosMensagens/:id', ModelosMensagensController.delete);

routes.get('/ultimosEnvios', EnviosController.index);

routes.post('/import/:kind', upload.single('file'), ImportController.store);

export default routes;

/*

ROUTES:

sessions:
  - token
  - user: {
      id
    }

professores: OK
  - name
  - id

cursos: OK
  - id
  - name

turmas: OK
  - id
  - name
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

alunos:
  - id
  - name
  - birthDate
  - email
  - responsible
  - responsible_email
  - responsible_phone
  - turmas: [ id, id, id, id ] // FIX

modelosMensagens: OK
  - id
  - title
  - greeting
  - content

ultimosEnvios: OK
  - id
  - sentAt
  - message
  - criteria
  - platforms
  - studentsQuantity
  - responsibleQuantity
  - students (string)
*/
