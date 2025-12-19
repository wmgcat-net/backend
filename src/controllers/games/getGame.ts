import { getGame as getGameService } from "@/services/games";
import { Request, Response } from "express";

/**
 * Get game data
 * 
 * @param req - Request
 * @param res - Response
*/
const getGame = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req?.params?.id);
    const data = await getGameService(id);

    if (!data)
        throw new Error("errors.exists");

    res.status(200).json(data);
}

export default getGame;