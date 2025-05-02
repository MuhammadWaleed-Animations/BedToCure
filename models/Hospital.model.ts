import mongoose from 'mongoose';

const HospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  location: { type: String, required: true }, // Google Maps URL
  imageUrl: { type: String },
});

export default mongoose.models.Hospital || mongoose.model('Hospital', HospitalSchema);
