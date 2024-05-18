import { Event, Student, Teacher } from "../models/index.js";
const adminController = {
  async getCount(req, res, next) {
    try {
      const studentCount = await Student.countDocuments({});
      const teacherCount = await Teacher.countDocuments({});
      const eventCount = await Event.countDocuments({});
      const currentDate = new Date();
      const eventCountUpcoming = await Event.aggregate([
        {
          $match: {
            eventDate: { $gt: currentDate },
          },
        },
        {
          $count: "upcomingEventsCount",
        },
      ]);
      const upcomingEventsCount =
        eventCountUpcoming.length > 0
          ? eventCountUpcoming[0].upcomingEventsCount
          : 0;
      const countsByBranch = await Student.aggregate([
        {
          $group: {
            _id: "$branch",
            studentCount: { $sum: 1 },
          },
        },
      ]);
      const majorBranches = [
        "Computer Science",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Production Engineering",
        "Information Technology",
      ];

      let branchCounts = {};
      majorBranches.forEach((branch) => {
        branchCounts[branch] = 0;
      });

      countsByBranch.forEach((branch) => {
        branchCounts[branch._id] = branch.studentCount;
      });
      res.json({
        studentCount: studentCount,
        branchCounts,
        teacherCount: teacherCount - 1,
        eventCount,
        upcomingEventsCount,
      });
    } catch (error) {
      next(error);
    }
  },

  async studentList(req, res, next) {
    try {
      const students = await Student.find({});
      res.json(students);
    } catch (error) {
      next(error);
    }
  },
  async teacherList(req, res, next) {
    try {
      const teachers = await Teacher.find({});
      res.json(teachers);
    } catch (error) {
      next(error);
    }
  },
  async eventList(req, res, next) {
    try {
      const events = await Event.find({});
      res.json(events);
    } catch (error) {
      next(error);
    }
  },

  async editStudent(req, res, next) {
    try {
      const id = req.params.id;
      const { name, username, rollNo, branch, badge } = req.body;

      const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { name, username, rollNo, branch, badge },
        { new: true }
      );
      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json({
        message: "Student updated successfully",
        student: updatedStudent,
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteStudent(req, res, next) {
    try {
      const id = req.params.id;
      const deletedStudent = await Student.findByIdAndDelete(id);
      if (!deletedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json({
        message: "Student deleted successfully",
        student: deletedStudent,
      });
    } catch (error) {
      next(error);
    }
  },
  async editTeacher(req, res, next) {
    try {
      const id = req.params.id;
      const { name, mCode, username } = req.body;
      const updatedTeacher = await Teacher.findByIdAndUpdate(
        id,
        { name, mCode, username },
        { new: true }
      );

      if (!updatedTeacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }

      res.json({
        message: "Teacher updated successfully",
        teacher: updatedTeacher,
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteTeacher(req, res, next) {
    try {
      const id = req.params.id;
      const deletedTeacher = await Teacher.findByIdAndDelete(id);
      if (!deletedTeacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      res.json({
        message: "Teacher deleted successfully",
        teacher: deletedTeacher,
      });
    } catch (error) {
      next(error);
    }
  },
  async editEvent(req, res, next) {
    try {
      const id = req.params.id;
      const { winners, name, description, participants, image, eventDate } =
        req.body;

      const updatedEventData = {};
      if (winners) updatedEventData.winners = winners;
      if (name) updatedEventData.name = name;
      if (description) updatedEventData.description = description;
      if (participants) updatedEventData.participants = participants;
      if (image) updatedEventData.image = image;
      if (eventDate) updatedEventData.eventDate = eventDate;

      const updatedEvent = await Event.findByIdAndUpdate(id, updatedEventData, {
        new: true,
      });

      if (!updatedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.json({
        message: "Event updated successfully",
        event: updatedEvent,
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteEvent(req, res, next) {
    try {
      const id = req.params.id;
      const deletedEvent = await Event.findByIdAndDelete(id);
      if (!deletedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json({
        message: "Event deleted successfully",
        event: deletedEvent,
      });
    } catch (error) {
      next(error);
    }
  },
  async getSingleStudent(req, res, next){
    try {
      const student = await Student.findById(req.params.id);
      console.log(student);
      res.status(200).json(student);
    } catch (error) {
      next(error);
    }
  }
};

export default adminController;
