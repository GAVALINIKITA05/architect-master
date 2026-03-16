import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    projectType: { type: String, required: true },
    budget: { type: String },
    message: { type: String }
}, {
    timestamps: true
});

export default mongoose.model('Appointment', appointmentSchema);
