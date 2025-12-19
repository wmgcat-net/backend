import {
    getGames as getGamesService,
    getGame as getGameService
} from "@/services/games";
import Game from "@/validators/game";
import { Request, Response } from "express";

/**
 * Get all games with pagination (default: 5 games)
 * 
 * @param req - Request
 * @param res - Limit
*/
const getGames = async (req: Request, res: Response): Promise<void> => {
    const offset = req.query?.offset ? Number(req.query?.offset) : 0;
    const limit = req.query?.limit ? Number(req.query?.limit) : 5;

    const content = await getGamesService(offset, limit);
    const items: Game[] = [];

    for (const id of content.items) {
        const game = await getGameService(id);
        items.push(game);
    }

    res.status(200).json({
        items,
        total: content.total,
        offset,
        limit
    });
}

export default getGames;