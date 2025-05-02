import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'hospitaladmin'], default: 'hospitaladmin' },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'HospitalHospital' }, // only for hospital admins
});

export default mongoose.models.AdminHospital || mongoose.model('AdminHospital', AdminSchema);
