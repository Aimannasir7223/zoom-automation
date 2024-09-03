const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');


router.get('/get-meeting-details/:meetingId', meetingController.getMeetingDetails);
router.get('/participants-list/:meetingId',meetingController.listParticipants);
router.get('/get-cameras-count/:meetingId',meetingController.listParticipantsCameras);
router.post('/webhook',meetingController.handleWebhookEvent);
module.exports = router;
