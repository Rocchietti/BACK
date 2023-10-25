import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    chat:[{
        user: {
            type:String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    }]
})


export const chatModel = mongoose.model('messages', chatSchema)