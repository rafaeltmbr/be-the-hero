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
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const ong = await dbConnection('ongs').select('id').where({ id }).first();
      if (!ong) {
        return res.status(401).json({ message: 'Operation not permitted' });
      }

      const incidents = await dbConnection('incidents')
        .select('id', 'title', 'description', 'value')
        .where({ ong_id: id });

      return res.json({ incidents });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export default new ProfileController();
