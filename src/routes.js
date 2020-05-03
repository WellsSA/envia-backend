import { Router } from 'express';
import { ProfessoresController } from './app/controllers';

const routes = new Router();

routes.get('/', (req, res) => res.json({ ok: true }));

// simulating auth
routes.use((req, _, next) => {
  req.userId = 10;
  next();
});

routes.get('/professores', ProfessoresController.index);
routes.post('/professores', ProfessoresController.store);
routes.put('/professores/:id', ProfessoresController.update);
routes.delete('/professores/:id', ProfessoresController.delete);

export default routes;

/*

ROUTES:

sessions:
  - token
  - user: {
      id
    }

professores:
  - name
  - id

cursos:
  - id
  - name

turmas:
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

modelosMensagens:
  - id
  - title
  - greeting
  - content

ultimosEnvios:
  - id
  - sentAt
  - message
  - criteria
  - platforms
  - studentsQuantity
  - responsibleQuantity
  - students (string)
*/
