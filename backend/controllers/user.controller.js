import Joi from "joi";
import { Student, Teacher } from "../models/index.js";
import bcrypt from 'bcrypt'
import CustomErrorHandler from "../utils/CustomErrorHandler.js";
import JwtService from "../utils/JwtService.js";
const userController = {
    async registerStudent(req, res, next){
        const registerSchema = Joi.object(
            {
                username: Joi.string().min(7).required(),
                name: Joi.string().max(20).required(),
                password: Joi.string().required(),
                rollNo: Joi.string().min(7).max(10).required(),
                branch: Joi.string().required(),
            }
        );

        const {error} = registerSchema.validate(req.body)
        if(error){
            return next(error);
        }
        const {name, username, password, branch, rollNo} = req.body;
        // If user already exist
        const alreadyExist = await Student.findOne({username: username})
        if(alreadyExist){
            return next(CustomErrorHandler.notValid('User already Exist!'))
        }
        try{
            const newuser = new Student({
                name,
                username,
                rollNo,
                branch,
                password
            })
            newuser.password = await bcrypt.hash(newuser.password, 10);

            const document = await newuser.save()
            res.json(document);

        } catch(error){
            return next(error)
        }
    },
    async registerTeacher(req, res, next){
        //validate
        const teacherSchema = Joi.object({
            name: Joi.string().required(),
            mCode: Joi.string().required(),
            password: Joi.string().required(),
            username: Joi.string().min(7).max(10).required(),
        })
        const {error} = teacherSchema.validate(req.body);
        if(error){
            return next(error);
        }
        const {name, mCode, username, password} = req.body;
        // If user already exist
        const alreadyExist = await Teacher.findOne({username: username})
        if(alreadyExist){
            return next(CustomErrorHandler.notValid('User already Exist!'))
        }
        try{
            const newTeacher = new Teacher({
                name,
                mCode,
                username,
                password
            });
            newTeacher.password = await bcrypt.hash(password, 10);
            const savedTeacher = await newTeacher.save();
            res.json(savedTeacher);
        } catch(error){
            return next(error);
        }
    },
    async getAllParticipation(req, res, next){
        const {id} = req.params;
        if(!id){
            return next(CustomErrorHandler.notValid('Id is not Valid'))
        }
        try{
            const document = await Student.findById(id).populate({
                path: 'participatedIn',
                select: '-participants -createdAt -updatedAt -__v -winners',
                populate: { path: 'author', select: 'name' }
            });
            
            if(!document){
                return next(CustomErrorHandler.notValid('Student Not Found!'))
            }
            res.json({events: document.participatedIn})
        } catch(error){
            return next(error)
        }
    },
    async studentLogin(req, res, next){
         // Get username and password
         const loginSchema = Joi.object({
            username: Joi.string().required().min(7),
            password: Joi.string().required()
        })
        const {error} = loginSchema.validate(req.body)
        if(error){
            return next(error);
        }
        const {username, password} = req.body
        //Now check for existence
        try{
            const isUser = await Student.findOne({username: username})
            if(!isUser){
                return next(CustomErrorHandler.notValid('Username not found!'))
            }
            const isPasswordTrue = await bcrypt.compare(password, isUser.password)
            if(!isPasswordTrue){
                return next(CustomErrorHandler.notValid('Wrong Password!'))
            }
            const trueStudent = await Student.findOne({username: username}).select('-__v -password -participatedIn -badge -attendence ')
            const access_token = JwtService.sign({username: username})
            res.json({trueStudent, access_token})
        } catch(error){
            return next(error)
        }
    },
    async teacherLogin(req, res, next){
         const loginSchema = Joi.object({
            username: Joi.string().required().min(7),
            password: Joi.string().required()
        })
        const {error} = loginSchema.validate(req.body)
        if(error){
            return next(error);
        }
        const {username, password} = req.body
        //Now check for existence
        try{
            const isUser = await Teacher.findOne({username: username})
            if(!isUser){
                return next(CustomErrorHandler.notValid('Username not found!'))
            }
            const isPasswordTrue = await bcrypt.compare(password, isUser.password)
            if(!isPasswordTrue){
                return next(CustomErrorHandler.notValid('Wrong Password!'))
            }
            const trueTeacher = await Teacher.findOne({username: username}).select('-__v -password  ')
            const access_token = JwtService.sign({username: username})
            res.json({trueTeacher, access_token})
        } catch(error){
            return next(error)
        }
    }

}

export default userController;