import nc from 'next-connect';
import { stringifyData } from '../../../utils';
import { isAuth } from '../../../utils/auth';

const handler = nc();

handler.use(isAuth);

handler.get(async (req, res) => {
  res.send(stringifyData(process.env.PAYPAL_CLIENT_ID) || 'sb');
});

export default handler;
