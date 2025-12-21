import z from "zod";
import Err from "@/utils/errors";

export const ContentValidate = z.object({
    /** IDs */
    items: z.array(
        z.number({ error: Err.items_invalid })
            .nonnegative({ error: Err.items_invalid })
            .int({ error: Err.items_invalid })
            .nonoptional({ error: Err.items_required })
    ).optional(),
    /** Total counter */
    total: z.number({ error: Err.total_invalid })
            .nonnegative({ error: Err.total_invalid })
            .int({ error: Err.total_invalid })
            .nonoptional({ error: Err.total_required })
});

export const PaginationValidate = z.object({
    /** Offset */
    offset: z.number({ error: Err.offset_invalid })
            .nonnegative({ error: Err.offset_invalid })
            .int({ error: Err.offset_invalid })
            .optional(),
    /** Limit */
    limit: z.number({ error: Err.limit_invalid })
            .nonnegative({ error: Err.limit_invalid })
            .int({ error: Err.limit_invalid })
            .max(25, { error: Err.limit_invalid })
            .min(1, { error: Err.limit_invalid })
            .optional()

});

type Content = z.infer<typeof ContentValidate>;
export default Content;