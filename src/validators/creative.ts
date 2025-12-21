import z from "zod";
import IdValidate from "./id";
import Err from "@/utils/errors";

export const CreativeValidate = z.object({
    /** ID */
    id: IdValidate,
    /** Author */
    author: z.string({ error: Err.author_invalid })
        .trim()
        .nonempty({ error: Err.author_required }),
    /** Links */
    links: z.array(
        z.object({
            /** Resource type */
            type: z.string({ error: Err.type_invalid })
                .trim()
                .nonoptional({ error: Err.type_required }),
            /** Link href */
            href: z.string({ error: Err.href_invalid })
                .trim()
                .nonoptional({ error: Err.href_required })
        })
    ).optional(),
    /** Files  */
    files: z.array(
        z.object({
            /** Filename */
            name: z.string({ error: Err.name_invalid })
                .trim()
                .nonempty({ error: Err.name_required }),
            /** File link href */
            href: z.string({ error: Err.href_invalid })
                .trim()
                .nonoptional({ error: Err.href_required })
        })
    ).optional(),
    /** Date created  */
    date_created: z.date({ error: Err.date_invalid })
});

type Creative = z.infer<typeof CreativeValidate>;
export default Creative;