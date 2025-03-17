import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    type: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, default: 'Experience luxury and comfort in our beautifully designed accommodation.' },
    capacity: { type: Number, default: 2 },
    size: { type: Number, default: 300 }, // in sq ft
    amenities: [String],
    images: {
        type: [String],
        default: ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg']
    },
    availability: { type: Boolean, default: true },
    featured: { type: Boolean, default: false }, // Featured rooms appear on landing page
    createdAt: { type: Date, default: Date.now }
});

// Ensure the model returns placeholder image if no images provided
roomSchema.pre('save', function(next) {
    if (!this.images || this.images.length === 0) {
        this.images = ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'];
    }
    next();
});

const Room = mongoose.model('Room', roomSchema);

export default Room;