import dbConnect from '../../utils/dbConnect';
import Mail from '../../utils/models/waitList';

// connect to DB
dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  if (method === 'GET') {
    try {
      const mails = await Mail.find({});
      res.status(200).json({ success: true, mail: mails });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  }
  if (method === 'POST') {
    try {
      // eslint-disable-next-line no-unused-vars
      const mail = await Mail.create(req.body);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  }
}
