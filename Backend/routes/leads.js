const express = require('express');
const router = express.Router();
const { getLeads, createLead, bulkUpload } = require('../controllers/leadController');

router.get('/', getLeads);
router.post('/', createLead);
router.post('/upload', bulkUpload); // CSV upload

module.exports = router;
