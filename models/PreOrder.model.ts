import mongoose from 'mongoose';

const PreOrderSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  cnic: { type: String, required: true },
  wardId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Still save the ObjectId of the ward
  wardName: { type: String, required: true }, // Save for easier filtering later
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  stripePaymentId: { type: String, required: true },
  status: { type: String, enum: ['active', 'cancelled', 'confirmed'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});


export default mongoose.models.PreOrderHospital || mongoose.model('PreOrderHospital', PreOrderSchema);
