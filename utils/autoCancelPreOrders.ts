import PreOrderHospital from '../models/PreOrder.model';
import { dbConnect } from '../lib/dbConnect';

export const autoCancelPreOrders = async () => {
  await dbConnect();
  const now = new Date();
  await PreOrderHospital.updateMany(
    { status: 'active', expiresAt: { $lt: now } },
    { status: 'cancelled' }
  );
};

//curl https://yourwebsite.com/api/auto-cancel-preorders