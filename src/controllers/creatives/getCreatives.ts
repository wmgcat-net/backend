import {
    getCreatives as getCreativesService,
    getCreative as getCreativeService
} from "@/services/creatives";
import getStorageFiles from "@/utils/getStorageFiles";
import Creative from "@/validators/creative";
import { Request, Response } from "express";

/**
 * Get all creatives with pagination (default: 3 games)
 * 
 * @param req - Request
 * @param res - Limit
*/
const getCreatives = async (req: Request, res: Response): Promise<void> => {
    const offset = req.query?.offset ? Number(req.query?.offset) : 0;
    const limit = req.query?.limit ? Number(req.query?.limit) : 3;

    const content = await getCreativesService(offset, limit);
    const items: Creative[] = [];

    for (const id of content.items) {
        const creative = await getCreativeService(id);
        const files = await getStorageFiles(id, "creatives");
        items.push({
            ...creative,
            files
        });
    }

    res.status(200).json({
        items,
        total: content.total,
        offset,
        limit
    });
}

export default getCreatives;