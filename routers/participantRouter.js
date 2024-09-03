const express = require('express');
const router = express.Router();
const participantsController=require('../controllers/participantController');
const { sportlightSchema } = require('../validators/validateParticipant');
const validate = require('../middlewares/validate');

router.post('/spotlight',validate(sportlightSchema),participantsController.sportlightParticipant);




module.exports = router;
