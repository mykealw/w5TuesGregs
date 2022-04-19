import mongoose from 'mongoose'
const Schema = mongoose.Schema


export const CarSchema = new Schema({
    make: { type: String, required: true}
    model
})
