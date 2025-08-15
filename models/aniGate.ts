import mongoose, { Schema }from 'mongoose';

export interface IAniGate extends Document {
    user: mongoose.Types.ObjectId; // Reference to the User who saved this anime
    title: string;
    genres: string[];
    rating: number;
    imageUrl?: string;
    synopsis?: string;
    mal_id?: number; // MyAnimeList or other external ID (optional)
    createdAt?: Date;
}

const aniGateSchema = new Schema<IAniGate>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    genres: [{ type: String, required: true }],
    rating: { type: Number, required: true },
    imageUrl: { type: String },
    synopsis: { type: String },
    mal_id: { type: Number }
}, { timestamps: true });

const AniGate = mongoose.model<IAniGate>('AniGate', aniGateSchema);

export default AniGate;