import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        rollNo: {
            type: String,
            required: true,
            unique: true
        },
        branch: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        badge: {
            type: String,
            default: 'Beginner'
        },
        participatedIn: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Event'
            }
        ],
        attendence: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Event'
            }
        ]

    }, {timestamps: false}
)

export default mongoose.model('Student', studentSchema)