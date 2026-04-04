import mongoose, { Schema } from 'mongoose';

const statsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    ganadas: {
        type: Number,
        default: 0,
    },
    perdidas: {
        type: Number,
        default: 0,
    },
    empatadas: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export const StatsModel = mongoose.model('Stats', statsSchema);
