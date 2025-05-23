const Event = require('../../models/Event');
const cloudinary = require('../../utils/cloudinary');

// Upload and create event
const uploadEvent = async (req, res) => {
  try {
    const { heading, paragraph, userId , location, isCultureExtincting} = req.body;
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
      images: imageUrls,
      isCultureExtincting
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
      // console.log("coming");
      
      const events = await Event.find()
        .populate('userId', 'userName')
        .sort({ isCultureExtincting: -1,createdAt: -1 });
      // console.log(events);
      
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching events', error });
    }
  };
  
  const getEventByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
      const events = await Event.find({ userId })
        .populate('userId', 'userName') 
        .sort({ createdAt: -1 });
  
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user events', error });
    }
  };
  const getEventDetail = async (req, res) => {
    const { id } = req.params;
  
    try {
      const eventDetail = await Event.findById(id).populate('userId', 'userName');
  
      if (!eventDetail) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      res.status(200).json(eventDetail);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching event detail', error });
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

const searchEvents = async (req, res) => {
  try {
    const { keyword } = req.params;
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        succes: false,
        message: "Keyword is required and must be in string format",
      });
    }

    const regEx = new RegExp(keyword, "i");

    const createSearchQuery = {
      $or: [
        { heading: regEx },
        { location: regEx },
      ],
    };

    const searchResults = await Event.find(createSearchQuery);

    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
module.exports = {
  uploadEvent,
  getAllEvents,
  getEventByUserId,
  deleteEvent,
  updateEvent,
  getEventDetail,
  searchEvents,
};
