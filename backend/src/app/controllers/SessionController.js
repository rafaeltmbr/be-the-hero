const { string, object, number } = require('yup');

const Yup = {
  string,
  object,
  number,
};
const dbConnection = require('../../database/connection');

const ongIdSchema = Yup.object().shape({
  id: Yup.string().length(8).required(),
});

class SessionController {
  async store(req, res) {
    try {
      const { id } = req.body;

      if (!(await ongIdSchema.isValid({ id }))) {
        return res.status(401).json({ message: 'Invalid schema' });
      }

      const ong = await dbConnection('ongs').select('name').where({ id }).first();

      if (!ong) {
        return res.status(404).json({ message: 'ONG not found' });
      }

      return res.send(ong);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new SessionController();
