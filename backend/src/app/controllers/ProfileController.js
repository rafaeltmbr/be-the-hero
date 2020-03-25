import * as Yup from 'yup';

import dbConnection from '../../database/connection';

const ongIdSchema = Yup.object().shape({
  id: Yup.string().length(8).strict().required(),
});

class ProfileController {
  async index(req, res) {
    try {
      const id = req.headers.authorization;

      if (!(await ongIdSchema.isValid({ id }))) {
        throw new Error('Bad input. Invalid schema!');
      }

      const incidents = await dbConnection('incidents')
        .select('id', 'title', 'description', 'value')
        .where({ ong_id: id });

      res.json({ incidents });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }
}

export default new ProfileController();
