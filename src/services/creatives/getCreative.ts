import db from "@/libs/db";
import redis from "@/libs/redis";
import validate from "@/utils/validate";
import Creative, { CreativeValidate } from "@/validators/creative";
import IdValidate from "@/validators/id";

/**
 * Get Creative from id
 * 
 * @param id - Creative ID
 * @returns
*/
const getCreative = async (id: number): Promise<Creative> => {
    validate(IdValidate, id);

    const cache_key = `creative:${id}`;
    const cache = await redis.readWithLog(cache_key);
    if (cache) {
        try {
            const data = JSON.parse(cache);
            validate(CreativeValidate, data);

            return data;
        }
        catch(err) { await redis.delWithLog(cache_key); }
    }

    const result = await db.query(`
        SELECT * FROM "creatives"
        WHERE id = $1
    `, [ id ]);

    if (result.rowCount === 0)
        return null;

    const creative: Creative = result.rows?.[0];
    redis.writeWithLog(cache_key, JSON.stringify(creative));

    return creative;
}

export default getCreative;