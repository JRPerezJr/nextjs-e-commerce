import nc from 'next-connect';
import db from '../../../../utils/db';
import Order from '../../../../models/Order';
import { isAuth } from '../../../../utils/auth';
import { onError } from '../../../../utils/error';

const handler = nc({
  onError,
});

handler.use(isAuth);

handler.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.payer.email_address,
    };

    const paidOrder = await order.save();
    await db.disconnect();
    res.status(201).send({ message: 'order has been paid', order: paidOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'no order found' });
  }
});

export default handler;
