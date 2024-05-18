import Joi from "joi";
import { Event, Student, Teacher } from "../models/index.js";
import CustomErrorHandler from "../utils/CustomErrorHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
const eventController = {
  async create(req, res, next) {
    const eventSchema = Joi.object({
      name: Joi.string().required(),
      author: Joi.string().required(),
      description: Joi.string().required(),
      eventDate: Joi.string().required(),
    });

    const { error } = eventSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { name, author, description, eventDate } = req.body;
    const currentDate = new Date();
    if (new Date(eventDate) < currentDate) {
      return next(
        CustomErrorHandler.notValid("Event date cannot be in the past")
      );
    }

    // Upload the image on Cloudinary
    let imageUrl;
    if (req.files && req.files.image) {
      const imageFile = req.files.image[0];
      const cloudinaryResponse = await uploadOnCloudinary(imageFile.buffer);
      // Upload image to Cloudinary
      //  console.log(cloudinaryResponse)
      imageUrl = cloudinaryResponse; // Get image URL
    }

    // if valid author let's check in Teacher DB
    try {
      const document = await Teacher.findById(author);
      if (!document) {
        return next(
          CustomErrorHandler.notValid("Not Authorized To Organize Event!")
        );
      }
    } catch (error) {
      return next(CustomErrorHandler.notValid("Event Name Already Exists!"));
    }

    try {
      const newEvent = new Event({
        name,
        author,
        description,
        eventDate,
        image: imageUrl || "",
      });
      const savedEvent = await newEvent.save();
      res.json(savedEvent);
    } catch (error) {
      return next(error);
    }
  },
  async events(req, res, next) {
    try {
      const documents = await Event.find()
        .select("-_v")
        .populate("author", "name");
      res.json(documents);
    } catch (error) {
      return next(error);
    }
  },
  async register(req, res, next) {
    const { eventId } = req.params;
    const { studentId } = req.body;
    if (!eventId || !studentId) {
      console.log("Hello");
      return next(
        CustomErrorHandler.notValid("EventId or StudentId is missing!")
      );
    }

    // check if event exist
    try {
      const isEvent = await Event.findById(eventId);
      if (!isEvent) {
        return next(CustomErrorHandler.notValid("EventId is not Valid"));
      }
      const isStudent = await Student.findById(studentId);
      if (!isStudent) {
        return next(CustomErrorHandler.notValid("Student is not Valid"));
      }
      //Now put this eventId in Student ParticipatedIn Array
      isStudent.participatedIn.push(eventId);
      await isStudent.save();
      //Now put this studentId in Event Participants Array
      isEvent.participants.push(studentId);
      await isEvent.save();
      res.json("Student SuccessFully Register!");
    } catch (error) {
      return next(error);
    }
  },
  async deRegister(req, res, next) {
    const { eventId, studentId } = req.params;
    try {
      // Check if event exists
      const event = await Event.findById(eventId);
      if (!event) {
        return next(CustomErrorHandler.notValid("EventId is not valid"));
      }
      // Check if student exists
      const student = await Student.findById(studentId);
      // console.log('Done')
      if (!student) {
        return next(CustomErrorHandler.notValid("StudentId is not valid"));
      }
      // Remove the eventId from the student's participatedIn array
      const studentIndex = student.participatedIn.indexOf(eventId);
      if (studentIndex !== -1) {
        student.participatedIn.splice(studentIndex, 1);
      }
      await student.save();
      // Remove the studentId from the event's participants array
      const eventIndex = event.participants.indexOf(studentId);
      if (eventIndex !== -1) {
        event.participants.splice(eventIndex, 1);
      }
      await event.save();
      res.json("Student successfully deregistered from the event.");
    } catch (error) {
      return next(error);
    }
  },
  async participants(req, res, next) {
    const { eventId } = req.params;
    if (!eventId) {
      return next(CustomErrorHandler.notValid("EventId  is missing!"));
    }
    try {
      const isEvent = await Event.findById(eventId).populate("participants");
      if (!isEvent) {
        return next(CustomErrorHandler.notValid("EventId is not Valid"));
      }
      res.json({ participants: isEvent.participants });
    } catch (error) {
      return next(error);
    }
  },
  async teacherEvents(req, res, next) {
    const { id } = req.params;
    if (!id) {
      return next(CustomErrorHandler.notValid("Teacher is not Valid!"));
    }
    try {
      const response = await Event.find({ author: id })
        .populate("author", "name")
        .select("-winners -participants -createdAt -updatedAt -__v");

      res.json(response);
    } catch (error) {
      return next(error);
    }
  },
  async markAttendence(req, res, next) {
    try {
      const { studentId } = req.body;
      const eventId = req.params.eventId;

      // Find the student by ID
      const student = await Student.findById(studentId);
      if (!student) {
        return next(CustomErrorHandler.notValid("Student Not Found"));
      }
      // Add attendance for the event
      student.attendence.push(eventId);
      await student.save();

      res.status(201).json({ message: "Attendance marked successfully" });
    } catch (error) {
      return next(error);
    }
  },
  async unmarkAttendance(req, res, next) {
    try {
      const { studentId, eventId } = req.params;
      // Find the student by ID
      const student = await Student.findById(studentId);
      if (!student) {
        return next(CustomErrorHandler.notValid("Student Not Found"));
      }
      // Remove attendance for the event
      const index = student.attendence.indexOf(eventId);
      if (index !== -1) {
        student.attendence.splice(index, 1);
      }
      await student.save();
      res.status(200).json({ message: "Attendance unmarked successfully" });
    } catch (error) {
      return next(error);
    }
  },

  async getEventAttended(req, res, next) {
    try {
      const { studentId } = req.params;

      // Find the student by ID
      const student = await Student.findById(studentId).populate({
        path: "attendence",
        select: "-participants -createdAt -updatedAt -__v -winners",
        populate: { path: "author", select: "name" },
      });

      res.status(200).json({ events: student.attendence });
    } catch (error) {
      return next(error);
    }
  },
  async markWinner(req, res, next) {
    try {
      const { studentId } = req.body;
      const { eventId } = req.params;

      // Find the event
      const event = await Event.findById(eventId);
      if (!event) {
        return next(CustomErrorHandler.notValid("Event not found"));
      }

      // Check if the provided studentId is among the participants of the event
      if (!event.participants.includes(studentId)) {
        return next(
          CustomErrorHandler.notValid(
            "Student is not a participant of the event"
          )
        );
      }

      // Check if the student has already been marked as a winner for this event
      if (event.winners.includes(studentId)) {
        return next(
          CustomErrorHandler.notValid(
            "Student is already marked as a winner for this event"
          )
        );
      }

      // Mark the student as the winner by adding their ID to the winners array
      event.winners.push(studentId);
      await event.save();

      res.status(200).json({ message: "Winner marked successfully" });
    } catch (error) {
      // Handle errors
      return next(error);
    }
  },
  async getWinners(req, res, next) {
    try {
      const { eventId } = req.params;

      // Find the event
      const event = await Event.findById(eventId);
      if (!event) {
        return next(CustomErrorHandler.notValid("Event not found"));
      }

      // Extract the winner IDs
      const winnerIds = event.winners;

      res.status(200).json({ winners: winnerIds });
    } catch (error) {
      // Handle errors
      return next(error);
    }
  },
};
export default eventController;
