import z from "zod";

export enum Types {
    steam="steam",
    itch="itch",
    newgrounds="ng",
    poki="poki",
    webplatform="wp"
}

export const GameValidate = z.object({
    /** ID */
    id: z.number({ error: "errors.invalid.id" })
        .nonnegative({ error: "errors.invalid.id" })
        .int({ error: "errors.invalid.id" })
        .nonoptional({ error: "errors.required.id" }),
    /** Title */
    title: z.string({ error: "errors.invalid.string" })
        .trim()
        .nonempty({ error: "errors.required.title" }),
    /** Description */
    description: z.string({ error: "errors.invalid.description" })
        .optional(),
    /** Links */
    links: z.array(
        z.object({
            type: z.enum(Types, { error: "errors.invalid.type" })
                .nonoptional({ error: "errors.required.type" }),
            href: z.string({ error: "errors.invalid.href" })
                .trim()
                .nonoptional({ error: "errors.required.href" })
        })
    ).optional(),
    /** Date created  */
    date_created: z.date({ error: "errors.invalid.date_created" })
});

type Game = z.infer<typeof GameValidate>;
export default Game;