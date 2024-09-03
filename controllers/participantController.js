const { getIo } = require('../utils/socket.io');
const commonService = require('../services/commonService');
const handleError = require('../utils/errorHandler');



 const sportlightParticipant= async (req, res)=>{
    try{
        const { meetingNumber, meetingPassword, userId } = req.body;
        const signature = commonService.generateSignature(82780516327);
        const io = getIo(); // Get the initialized io instance
        io.emit('spotlight', {
            meetingNumber:82780516327,
            userId:"lYmiSfCiSJKd9hN4ta5vjQ", // Use the dynamic userId
            signature,
            apiKey: process.env.ZOOM_CLIENT_ID,
            password: meetingPassword
        });
    
        res.sendStatus(200);
    }catch(err){
        return handleError(err, res);
    }
 }
module.exports = {
    sportlightParticipant,
};
