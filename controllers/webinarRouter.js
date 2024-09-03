const commonService = require('../services/commonService');
const axios=require("axios");
const handleError = require('../utils/errorHandler');
// Function to get webinar details
const getWebinarDetails = async (req,res) => {
    try {
        const webinarId=req.params.webinarId;
        const accessToken = await commonService.getAccessToken();
        const response = await axios.get(`${process.env.ZOOM_API_URL}/metrics/webinars/${webinarId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return handleError(error, res);
    }
};
const listParticipants = async (req,res) => {
    try {
        const meetingId=req.params.meetingId;
        const response=await commonService.getWebinarParticipantsList(meetingId);
    return res.status(200).json({data:response.data  });
    } catch (error) {
        return handleError(error, res);
    }
};

const listParticipantsCameras = async (req,res) => {
    try {
        const meetingId=req.params.meetingId;
        const response=await commonService.getWebinarParticipantsList(meetingId);
        const participants = response.data.participants;
        // Count participants with cameras on
        const camerasOnCount = participants.filter(participant => participant.user_video === 'on').length;
  
        return res.status(200).json({total_cameras:camerasOnCount  });
    } catch (error) {
        return handleError(error, res);
    }
};
module.exports = {
    getWebinarDetails,
    listParticipants
};
