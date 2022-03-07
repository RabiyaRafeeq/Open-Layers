const express = require('express');
const AmplifierController = require('../controllers/AmplifierController');

const router = express.Router();

router.route("/")
    .post(AmplifierController.postData)
    .get(AmplifierController.getData)
router.route("/:id")
    .put(AmplifierController.updateData)
router.route("/byFence")
    .post(AmplifierController.getByFence)
module.exports = router;