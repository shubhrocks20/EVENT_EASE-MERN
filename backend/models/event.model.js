import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher'
        },
        description: {
            type: String,
            required: true,
        },
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }
        ],
        image: {
            type: String,
        },
        eventDate: {
            type: Date,
            required: true
        },
        winners: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }
        ]

    },
    {timestamps: true}
)

export default mongoose.model('Event', eventSchema);