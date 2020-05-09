import { Router } from 'express';
import {
  SessionsController,
  ProfessoresController,
  CursosController,
  TurmasController,
  ModelosMensagensController,
  EnviosController,
  AlunosController,
} from './app/controllers';

const routes = new Router();

routes.get('/', (req, res) => res.json({ hello: true }));
routes.get('/sessions', SessionsController.index);

// simulating auth
routes.use((req, _, next) => {
  req.userId = 10;
  next();
});

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
