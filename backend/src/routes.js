const { Router } = require('express');

const OngController = require('./app/controllers/OngController');
const IncidentController = require('./app/controllers/IncidentController');
const ProfileController = require('./app/controllers/ProfileController');
const SessionController = require('./app/controllers/SessionController');

const routes = Router();

routes.get('/', (req, res) => res.json({ message: 'BE THE HERO API V1.0.0' }));

routes.post('/sessions', SessionController.store);

routes.get('/ongs', OngController.index);
routes.get('/ongs/:id', OngController.show);
routes.post('/ongs', OngController.store);

routes.get('/incidents', IncidentController.index);
routes.get('/incidents/:id', IncidentController.show);
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

routes.all('*', (req, res) => res.status(404).json({ error: 'Resource not found' }));

module.exports = routes;
