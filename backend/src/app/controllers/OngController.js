/* eslint-disable no-console */
import crypto from 'crypto';
import * as Yup from 'yup';

import dbConnection from '../../database/connection';

const ongIdSchema = Yup.object().shape({
  id: Yup.string().length(8).strict().required(),
});

const storeSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  whatsapp: Yup.number().test(
    'len',
    'Number should vary between 10 to 13 digits',
    (n) => {
      const len = `${n}`.length;
      return len >= 10 && len <= 13;
    }
  ),
  city: Yup.string().required(),
  uf: Yup.string().required().length(2),
});

class OngController {
  async index(req, res) {
    try {
      const page = Number(req.query.page) || 1;
      const page_size = Number(req.query.page_size) || 5;
      const pageOffset = (page - 1) * page_size;

      let [{ 'count(*)': count }] = await dbConnection('ongs').count();
      count = Number(count);

      res.header('X-Total-Count', count);
      res.header('X-Total-Pages', Math.ceil(count / page_size));
      res.header('X-Current-Page', page);

      const ongs = await dbConnection('ongs')
        .select('name', 'email', 'whatsapp', 'city', 'uf')
        .offset(pageOffset)
        .limit(page_size);

      return res.json({ ongs });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!(await ongIdSchema.isValid({ id }))) {
        return res.status(400).json({ message: 'Invalid schema' });
      }

      const ong = await dbConnection('ongs').select('*').where({ id }).first();
      if (!ong) {
        return res.status(404).json({ message: 'ONG not found' });
      }

      return res.json(ong);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      try {
        await storeSchema.validate(req.body);
      } catch ({ message }) {
        return res.status(400).json({ message });
      }

      const emailExist = await dbConnection('ongs')
        .select('id')
        .where({ email: req.body.email })
        .first();

      if (emailExist) {
        return res.status(400).json({ message: 'This email already exists' });
      }

      const id = crypto.randomBytes(4).toString('HEX');
      const ong = { ...req.body, id };

      await dbConnection('ongs').insert(ong);

      return res.json({ ong_id: ong.id });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export default new OngController();
