import Appointment from '../models/appointment.model.js';

export const createAppointment = async (req, res) => {
    try {
        const { name, email, phone, date, time, projectType, budget, message } = req.body;

        const newAppointment = new Appointment({
            name,
            email,
            phone,
            date,
            time,
            projectType,
            budget,
            message
        });

        await newAppointment.save();

        res.status(201).json({
            success: true,
            message: 'Appointment created successfully',
            data: newAppointment
        });
    } catch (error) {
        console.error('Error in createAppointment:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Failed to create appointment',
            error: error.message
        });
    }
};
