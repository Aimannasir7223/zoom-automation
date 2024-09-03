const commonService = require('../services/commonService');
const axios=require("axios");
const handleError = require('../utils/errorHandler');
const { getIo } = require('../utils/socket.io');
let participantCount = 0;
    let cameraOnCount = 0;
    let handRaiseCount = 0;
// Function to get webinar details
const getMeetingDetails = async (req,res) => {
    try {
        const meetingId=req.params.meetingId;
        const accessToken = await commonService.getAccessToken();
            const response = await axios.get(`${process.env.ZOOM_API_URL}/metrics/meetings/${meetingId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
        return res.status(200).json({data:response.data});
    } catch (error) {
        return handleError(error, res);
    }
};
const listParticipants = async (req,res) => {
    try {
        const meetingId=req.params.meetingId;
        const response=await commonService.getParticipantsList(meetingId);
    return res.status(200).json({data:response.data  });
    } catch (error) {
        return handleError(error, res);
    }
};

const listParticipantsCameras = async (req,res) => {
    try {
        const meetingId=req.params.meetingId;
        const response=await commonService.getParticipantsList(meetingId);
        const participants = response.data.participants;
        // Count participants with cameras on
        const camerasOnCount = participants.filter(participant => participant.user_video === 'on').length;
  
        return res.status(200).json({total_cameras:camerasOnCount  });
    } catch (error) {
        return handleError(error, res);
    }
};
const handleWebhookEvent =async (req, res) => {
    const event = req.body.event;
    const meetingId = req.body.payload.object.id;
    
    switch(event) {
        case 'meeting.participant_joined':
            participantCount++;
            break;
        case 'meeting.participant_left':
            participantCount--;
            break;
        default:
            break;
    }
    updateParticipantStatus(meetingId);
    res.sendStatus(200);
};
const updateParticipantStatus = async (meetingId) => {
    const response = await commonService.getParticipantsList(meetingId);
    const participants = response.data.participants;
    cameraOnCount = participants.filter(participant => participant.user_video === 'on').length;
    handRaiseCount = participants.filter(participant => participant.user_raise_hand === true).length;
    const io= getIo();
    io.emit('update', {
        participantCount,
        cameraOnCount,
        handRaiseCount
    });
};
module.exports = {
    getMeetingDetails,
    listParticipants,
    listParticipantsCameras,
    handleWebhookEvent 
};
