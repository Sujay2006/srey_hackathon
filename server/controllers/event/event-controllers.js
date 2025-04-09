const Event = require('../../models/Event');
const cloudinary = require('../../utils/cloudinary');

// Upload and create event
const uploadEvent = async (req, res) => {
  try {
    const { heading, paragraph, userId , location} = req.body;
    const files = req.files;
    console.log(heading,userId,location, files);
    
    if (!files || files.length === 0) {
      console.log("No images uploaded");
      
      return res.status(400).json({ message: 'No images uploaded' });
    }

    // Upload all images to Cloudinary
    const imageUploadPromises = files.map(file =>
      cloudinary.uploader.upload(file.path, { folder: 'events' })
    );

    const uploadResults = await Promise.all(imageUploadPromises);
    const imageUrls = uploadResults.map(result => result.secure_url);

    const newEvent = new Event({
      userId,
      heading,
      paragraph,
      location,
      images: imageUrls
    });

    await newEvent.save();
    res.status(201).json(newEvent);

  } catch (error) {
    res.status(500).json({ message: 'Error uploading event', error });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
    try {
      const events = await Event.find()
        .populate('userId', 'userName') // 👈 fetches userName
        .sort({ createdAt: -1 });
  
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching events', error });
    }
  };
  
  const getEventByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
      const events = await Event.find({ userId })
        .populate('userId', 'userName') // 👈 fetches userName
        .sort({ createdAt: -1 });
  
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user events', error });
    }
  };
  

// Delete event
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};

// Update event (text + optional image)
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { heading, paragraph } = req.body;
  const files = req.files;

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.heading = heading || event.heading;
    event.paragraph = paragraph || event.paragraph;

    // If new images are uploaded
    if (files && files.length > 0) {
      const imageUploadPromises = files.map(file =>
        cloudinary.uploader.upload(file.path, { folder: 'events' })
      );
      const uploadResults = await Promise.all(imageUploadPromises);
      event.images = uploadResults.map(r => r.secure_url);
    }

    await event.save();
    res.status(200).json(event);

  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};

module.exports = {
  uploadEvent,
  getAllEvents,
  getEventByUserId,
  deleteEvent,
  updateEvent
};
