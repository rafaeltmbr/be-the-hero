import * as Yup from 'yup';

import dbConnection from '../../database/connection';

const ongIdSchema = Yup.object().shape({
  id: Yup.string().length(8).required(),
});

class SessionController {
  async store(req, res) {
    try {
      const { id } = req.body;

      if (!(await ongIdSchema.isValid({ id })))
        throw new Error('Bad input. Invalid schema');

      const ong = await dbConnection('ongs')
        .select('name')
        .where({ id })
        .first();
      if (!ong) throw new Error('ONG not found with the provided id');

      res.send(ong);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default new SessionController();
