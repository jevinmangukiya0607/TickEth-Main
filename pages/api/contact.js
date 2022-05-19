import dbConnect from '../../utils/dbConnect';
import ContactList from '../../utils/models/contactList';

// connect to DB
dbConnect();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const contactList = await ContactList.create(req.body);
      res.status(200).json({ success: true, form: contactList });
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
