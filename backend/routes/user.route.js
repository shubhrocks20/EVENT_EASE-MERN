import { Router } from "express";
import {
  adminController,
  eventController,
  userController,
} from "../controllers/index.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

//register Student
router.post("/register/student", userController.registerStudent);
//register Teacher
router.post("/register/teacher", userController.registerTeacher);
// organize event
router.post(
  "/event",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  eventController.create
);
//get list of all events
router.get("/events", eventController.events);
// pariticipate in single event
router.post("/event/:eventId", eventController.register);

// Deregister for an event
router.delete("/event/:eventId/:studentId", eventController.deRegister);
// pariticipants in single event
router.get("/event/:eventId", eventController.participants);
//Student participation in Events list
router.get("/:id", userController.getAllParticipation);
// Admin Login
// router.post('/login', adminController.login);
// Various Counts
router.get("/count/all", adminController.getCount);
// List of all Students
router.get("/list/students", adminController.studentList);
// List of all Teachers
router.get("/list/teachers", adminController.teacherList);
// List of all Events
router.get("/list/events", adminController.eventList);
// Edit Student
router.put("/list/student/edit/:id", adminController.editStudent);
// Delete Student
router.delete("/list/student/delete/:id", adminController.deleteStudent);
// Edit Teacher
router.put("/list/teacher/edit/:id", adminController.editTeacher);
// Delete Teacher
router.delete("/list/teacher/delete/:id", adminController.deleteTeacher);
//Edit Event
router.put("/list/event/edit/:id", adminController.editEvent);
// get Single student
router.get('/student/singleStudent/:id', adminController.getSingleStudent);
//Delete Event
router.delete("/list/event/delete/:id", adminController.deleteEvent);
//Student Login
router.post("/login/student", userController.studentLogin);
// Teacher Login
router.post("/login/teacher", userController.teacherLogin);
// Events organized by a teacher
router.get("/event/teacher/:id", eventController.teacherEvents);
// Mark Attendence of a student in an Event
router.post("/event/:eventId/attendance", eventController.markAttendence);
// Remove Attendence of a student in an Event
router.delete(
  "/event/:eventId/attendance/:studentId",
  eventController.unmarkAttendance
);
// Get Attended Events of a student
router.get(
  "/student/event/attendance/:studentId",
  eventController.getEventAttended
);
// Mark Event Winner
router.post("/event/:eventId/markWinner", eventController.markWinner);
// Get Winners of a particulat event
router.get("/event/:eventId/getWinners", eventController.getWinners);

export default router;
