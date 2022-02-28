const express = require('express');
const DataLoadController = require('../controllers/DataLoadController');

const router = express.Router();

router.route("/")
    .post(DataLoadController.postData)
    .get(DataLoadController.getData)
router.route("/:id")
    .put(DataLoadController.updateData)

module.exports = router;