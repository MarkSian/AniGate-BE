import express, { Request, Response } from 'express';
import AniGate from '../models/aniGate';


const router = express.Router();


/**
 * @route GET /api/aniGate/favorite
 * @desc Get all favorited anime for the logged-in user
 * @access Private (requires JWT)
 */
router.get('/favorite', async (req: Request, res: Response) => {
    try {
        const user = req.userId;
        const favorites = await AniGate.find({ user });
        res.status(200).json(favorites);
    } catch (err) {
        res.status(500).json({ error: 'Server Error While Fetching Favorites' });
    }
});


/**
 * @route POST /api/aniGate/favorite
 * @desc Add an anime to the user's favorites
 * @access Private (requires JWT)
 */
router.post('/favorite', async (req: Request, res: Response) => {
    try {
        console.log('POST /favorite', req.body, 'userId:', req.userId);
        const { title, genres, rating, imageUrl, synopsis, mal_id } = req.body;

        const user = req.userId;

        const duplicateCheck = await AniGate.findOne({ user, mal_id });
        if (duplicateCheck) {
            return res.status(409).json({ error: 'Anime already favorited' });
        }

        const anime = new AniGate({
            user,
            title,
            genres,
            rating,
            imageUrl,
            synopsis,
            mal_id
        });

        await anime.save();
        res.status(201).json(anime);
    } catch (err) {
        res.status(500).json({ error: 'Server Error While Favoriting Anime' });

    }
});

/**
 * @route DELETE /api/aniGate/favorite/:mal_id
 * @desc Remove an anime from the user's favorites
 * @access Private (requires JWT)
 */
router.delete('/favorite/:mal_id', async (req: Request, res: Response) => {
    try {
        const user = req.userId;
        const mal_id = Number(req.params.mal_id);

        const deletedAnime = await AniGate.findOneAndDelete({ user, mal_id });
        if (!deletedAnime) {
            return res.status(404).json({ error: 'Anime not found' });
        }

        res.status(200).json({ message: 'Anime removed from favorites' });
    } catch (err) {
        res.status(500).json({ error: 'Server Error While Deleting Favorite Anime' });
    }
});

export default router;