const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');
const { sdkParamsSchema } = require('../validators/validateSdkParams');
const validate = require('../middlewares/validate');

router.get('/get-meeting-details/:meetingId', meetingController.getMeetingDetails);
router.get('/participants-list/:meetingId',meetingController.listParticipants);
router.get('/get-cameras-count/:meetingId',meetingController.listParticipantsCameras);
router.get('/webhook',meetingController.handleWebhookEvent);
router.get('/authAccess',meetingController.getAuthAccess);
router.get('/getMeetingSdk',validate(sdkParamsSchema),meetingController.getMeetingSdkSignature)
module.exports = router;
