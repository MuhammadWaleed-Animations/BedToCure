import mongoose from 'mongoose';

const WardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  occupiedBeds: { type: Number, required: true },
  availableBeds: { type: Number, required: true },
  costPerNight: { type: Number, required: true },
}, { _id: true }); // Each ward gets its own ID automatically

const BedDetailsSchema = new mongoose.Schema({
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  wards: [WardSchema],
});

export default mongoose.models.BedDetails || mongoose.model('BedDetails', BedDetailsSchema);
