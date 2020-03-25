import * as Yup from 'yup';

import dbConnection from '../../database/connection';

const storeSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  value: Yup.number().required(),
  ong_id: Yup.string().length(8).required(),
});

class IncidentController {
  async index(req, res) {
    try {
      const page = Number(req.query.page) || 1;
      const page_size = Number(req.query.page_size) || 5;
      const offset = (Number(page) - 1) * Number(page_size);

      const [count] = await dbConnection('incidents').count();
      const total_incidents = count['count(*)'];
      const total_pages = Math.ceil(total_incidents / page_size);

      res.header('X-Total-Count', total_incidents);
      res.header('X-Total-Pages', total_pages);
      res.header('X-Current-Page', page);

      const incidents = await dbConnection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(page_size)
        .offset(offset)
        .select([
          'incidents.title',
          'incidents.description',
          'incidents.value',
          'ongs.name',
          'ongs.email',
          'ongs.whatsapp',
          'ongs.city',
          'ongs.uf',
        ]);

      res.json({ incidents });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const incident = await dbConnection('incidents')
        .select('title', 'description', 'value', 'ong_id')
        .where({ id })
        .first();

      if (!incident) throw new Error('Incident not found');
      const { ong_id } = incident;

      const ong = await dbConnection('ongs')
        .select('name', 'email', 'whatsapp', 'city', 'uf')
        .where({ id: ong_id })
        .first();

      delete incident.ong_id;

      res.json({ ...incident, ong });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const ong_id = req.headers.authorization;
      if (!(await storeSchema.isValid({ ...req.body, ong_id }))) {
        throw new Error('Bad input. Invalid schema!');
      }

      const [id] = await dbConnection('incidents').insert({
        ...req.body,
        ong_id,
      });

      res.json({ id, ...req.body });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const ong_id = req.headers.authorization;
      const { id } = req.params;
      const incident = await dbConnection('incidents')
        .select('*')
        .where({ id })
        .first();

      if (!incident || incident.ong_id !== ong_id) {
        throw new Error('Bad input. Invalid schema or non authorized');
      }

      await dbConnection('incidents').delete().where({ id });
      res.status(204).send();
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }
}

export default new IncidentController();
