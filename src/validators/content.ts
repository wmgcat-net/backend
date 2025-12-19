import z from "zod";

export const ContentValidate = z.object({
    /** IDs */
    items: z.array(
        z.number({ error: "errors.invalid.items" })
            .nonnegative({ error: "errors.invalid.items" })
            .int({ error: "errors.invalid.items" })
            .nonoptional({ error: "errors.required.items "})
    ).optional(),
    /** Total counter */
    total: z.number({ error: "errors.invalid.total" })
            .nonnegative({ error: "errors.invalid.total" })
            .int({ error: "errors.invalid.total" })
            .nonoptional({ error: "errors.required.total "})
});

export const PaginationValidate = z.object({
    /** Offset */
    offset: z.number({ error: "errors.invalid.offset" })
            .nonnegative({ error: "errors.invalid.offset" })
            .int({ error: "errors.invalid.offset" })
            .optional(),
    /** Limit */
    limit: z.number({ error: "errors.invalid.limit" })
            .nonnegative({ error: "errors.invalid.limit" })
            .int({ error: "errors.invalid.limit" })
            .max(25, { error: "errors.invalid.limit" })
            .min(1, { error: "errors.invalid.limit" })
            .optional()

});

type Content = z.infer<typeof ContentValidate>;
export default Content;