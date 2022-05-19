import { cors } from 'lib/middleware';
const { uuid } = require('uuidv4');
const Razorpay = require('razorpay');

export default async function handler(req, res) {
  await cors(req, res);
  if (req.method === 'POST') {
    const { price } = req.body;
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: price * 100, // e.g: Rs.200 -> 20000p
      currency: 'INR',
      receipt: uuid(),
      payment_capture: 1,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
