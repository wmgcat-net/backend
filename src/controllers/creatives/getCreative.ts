import { getCreative as getCreativeService } from "@/services/creatives";
import getStorageFiles from "@/utils/getStorageFiles";
import { Request, Response } from "express";

/**
 * Get creative data
 * 
 * @param req - Request
 * @param res - Response
*/
const getCreative = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req?.params?.id);
    const data = await getCreativeService(id);

    if (!data)
        throw new Error("Creative isn't exists");

    const files = await getStorageFiles(id, "creatives");

    res.status(200).json({
        data,
        files
    });
}

export default getCreative;