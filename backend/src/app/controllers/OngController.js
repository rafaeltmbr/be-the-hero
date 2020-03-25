/* eslint-disable no-console */
import crypto from 'crypto';
import * as Yup from 'yup';

import dbConnection from '../../database/connection';

const ongIdSchema = Yup.object().shape({
  id: Yup.string().length(8).strict().required(),
});

const storeSchema = Yup.object().shape({
  name: Yup.string().strict().required(),
  email: Yup.string().email().strict().required(),
  whatsapp: Yup.string().strict().required(),
  city: Yup.string().strict().required(),
  uf: Yup.string().strict().required(),
});

class OngController {
  async index(req, res) {
    try {
      const ongs = await dbConnection('ongs').select(
        'name',
        'email',
        'whatsapp',
        'city',
        'uf'
      );
      res.json({ ongs });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!(await ongIdSchema.isValid({ id }))) {
        throw new Error('Bad input. Invalid schema!');
      }

      const ong = await dbConnection('ongs').select('*').where({ id });
      if (!ong) throw new Error('ONG not found');

      res.json(...ong);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      if (!(await storeSchema.isValid(req.body))) {
        throw new Error('Bad input. Invalid schema!');
      }

      const id = crypto.randomBytes(4).toString('HEX');
      const ong = { ...req.body, id };

      await dbConnection('ongs').insert(ong);

      res.json({ ong_id: ong.id });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default new OngController();
