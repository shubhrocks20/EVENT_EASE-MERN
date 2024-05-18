import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        mCode: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true
        }


    }, {timestamps: false}
)

export default mongoose.model('Teacher', teacherSchema);