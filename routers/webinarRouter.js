const express = require('express');
const router = express.Router();
const webinarController = require('../controllers/webinarRouter');


router.get('/get-webinar-details/:id', webinarController.getWebinarDetails);
router.get('/participants-list/:webinarId',webinarController.listParticipants);

module.exports = router;
