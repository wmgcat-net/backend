import db from "@/libs/db";
import redis from "@/libs/redis";
import validate from "@/utils/validate";
import Game, { GameValidate } from "@/validators/game";
import IdValidate from "@/validators/id";

/**
 * Get game data
 * 
 * @param id - ID Game
 * @returns 
*/
const getGame = async (id: number): Promise<Game | null> => {
    validate(IdValidate, id);

    // Read game data from cache:
    const cache_key = `game:${id}`;
    const cache = await redis.readWithLog(cache_key);
    if (cache) {
        try {
            const data = JSON.parse(cache);
            validate(GameValidate, data);
            
            return data;
        }
        catch(err) { await redis.delWithLog(cache_key); }
    }

    // Read game data from db:
    const result = await db.query(`
        SELECT *
        FROM "games"
        WHERE id = $1
    `, [ id ]);

    if (result.rowCount === 0)
        return null;

    const game = result.rows?.[0] as Game;
    redis.writeWithLog(cache_key, JSON.stringify(game));

    return game;
}

export default getGame;