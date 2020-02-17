const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {
        const { booking_id } = req.params;

        const booking = await (await Booking.findById(booking_id)).populate('spot');

        booking.approved = false;

        await  bookign.save(); 

        const bookingUserSocket = req.connectedUsers[booking.spot.user];

        if(bookingUserSocket) {
            req.io.to(bookingUserSocket).emit('booking_response', booking);
        }

        return res.json(booking);
    } 
};
