import IdValidate from "@/validators/id";
import validate from "./validate";
import z from "zod";
import minio from "@/libs/minio";
import redis from "@/libs/redis";
import dotenv from "dotenv";

dotenv.config();

enum eBucket {
    g = "games",
    c = "creatives"
}
type Bucket = `${eBucket}`;

/**
 * Get files for instance
 * 
 * @param id - Instance id
 * @param bucketName - Bucket name
 * @returns
*/
const getStorageFiles = async (id: number, bucketName: Bucket = "games"): Promise<{
    /** Content name */
    name: string;
    /** Href */
    href: string;
}[]> => {
    validate(IdValidate, id);
    validate(
        z.enum(eBucket, { error: "errors.invalid.bucketName" }),
        bucketName
    );

    const cache_key = `storage:${bucketName}:${id}`;
    const cache = await redis.readWithLog(cache_key);

    if (cache) {
        try {
            const data = JSON.parse(cache);
            return data;
        }
        catch(err) { await redis.delWithLog(cache_key); }
    }

    return new Promise((res, rej) => {
        const links: Promise<{
            name: string,
            href: string
        }>[] = [];
        const stream = minio.listObjectsV2(bucketName, `${id}/`, true);
        stream.on('data', (obj) => {
            if (obj.name) {
                links.push(new Promise(async (res, _) => {
                    const href = await minio.presignedGetObject(bucketName, obj.name, 60 * 60 * 8);
                    res({
                        name: obj.name.replace(`${id}/`, ""),
                        href: href.replace(
                            `${process.env.MINIO_URL}:${process.env.MINIO_PORT}`,
                            process.env.MINIO_PUBLIC_URL || `${process.env.MINIO_URL}:${process.env.MINIO_PORT}`
                        ).split("?")[0] as string
                    });
                }));
            }
        });

        stream.on("error", err => rej(err));
        stream.on("end", async () => {
            if (!links?.length) {
                res([]);
                return;
            }
            const files = await Promise.all(links);
            
            redis.writeWithLog(cache_key, JSON.stringify(files));
            res(files);
        });
    });
}

export default getStorageFiles;