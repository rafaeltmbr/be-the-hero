import * as Yup from 'yup';

import dbConnection from '../../database/connection';

const storeSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  value: Yup.number().strict().required(),
});

const ongIdSchema = Yup.object().shape({
  id: Yup.string().length(8).strict().required(),
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

      return res.json({ incidents });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const incident = await dbConnection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .where('incidents.id', id)
        .first()
        .select(
          'incidents.title',
          'incidents.description',
          'incidents.value',
          'ongs.name',
          'ongs.email',
          'ongs.whatsapp',
          'ongs.city',
          'ongs.uf'
        );

      if (!incident) {
        return res.status(404).json({ message: 'Incident not found' });
      }

      return res.json({ ...incident });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const ong_id = req.headers.authorization;
      if (!(await ongIdSchema.isValid({ id: ong_id }))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const ong = await dbConnection('ongs')
        .select('id')
        .where({ id: ong_id })
        .first();

      if (!ong) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      if (!(await storeSchema.isValid(req.body))) {
        return res.status(400).json({ message: 'Invalid schema' });
      }

      const [id] = await dbConnection('incidents').insert({
        ...req.body,
        ong_id,
      });

      return res.json({ id, ...req.body });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const ong_id = req.headers.authorization;
      const { id } = req.params;

      if (!(await ongIdSchema.isValid({ id: ong_id }))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const incident = await dbConnection('incidents')
        .select('*')
        .where({ id })
        .first();

      if (!incident) {
        return res.status(404).json({ message: 'Incident not found' });
      }

      if (incident.ong_id !== ong_id) {
        return res.status(401).json({ message: 'Operation not permitted' });
      }

      await dbConnection('incidents').delete().where({ id });
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export default new IncidentController();
