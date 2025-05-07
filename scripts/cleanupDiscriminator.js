import mongoose from 'mongoose';

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  await mongoose.connection.db.collection('preorderhospitals').updateMany({}, { $set: { '__t': null } });
  console.log('Discriminator field removed');
  await mongoose.disconnect();
}

run().catch(console.error);
