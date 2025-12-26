import db from "@/libs/db";
import redis from "@/libs/redis";
import validate from "@/utils/validate";
import Content, { ContentValidate, PaginationValidate } from "@/validators/content";

/**
 * Get all creatives with pagination
 * 
 * @param offset - Offset
 * @param limit - Limit
 * @returns 
*/
const getCreatives = async (offset?: number, limit?: number): Promise<Content> => {
    validate(PaginationValidate, {
        offset,
        limit
    });

    const cache_key = `creatives:${offset}:${limit}`;
    const cache = await redis.readWithLog(cache_key);
    if (cache) {
        try {
            const data = JSON.parse(cache);
            validate(ContentValidate, data);

            return data as Content;
        }
        catch(err) { await redis.delWithLog(cache_key); }
    }

    const result = await db.query(`
        SELECT
            id,
            COUNT(*) OVER()::INTEGER as total
        FROM "creatives"
        ORDER BY date_created DESC
        OFFSET $1 LIMIT $2
    `, [ offset, limit ]);

    const items = result?.rows?.map((row: { id: number, total: number }) => row.id);;
    const total = result?.rows?.[0]?.total || 0;

    const content: Content = {
        items,
        total
    };
    redis.writeWithLog(cache_key, JSON.stringify(content));

    return content;
}

export default getCreatives;