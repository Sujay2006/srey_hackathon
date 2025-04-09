const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadEvent, getAllEvents, getEventByUserId, deleteEvent, updateEvent, getEventDetail,searchEvents } = require('../../controllers/event/event-controllers');

const upload = multer({ dest: 'uploads/' }); 

router.post('/upload', upload.array('images'), uploadEvent);
router.get('/', getAllEvents);
router.get('/search/:keyword', searchEvents);
router.get('/user/:userId', getEventByUserId);
router.get('/detail/:id', getEventDetail);
router.delete('/:id', deleteEvent);
router.put('/:id', upload.array('images'), updateEvent);

module.exports = router;
