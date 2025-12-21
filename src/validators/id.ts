import z from "zod";
import Err from "@/utils/errors";

const IdValidate = z.number({ error: Err.id_invalid })
    .nonnegative({ error: Err.id_invalid })
    .int({ error: Err.id_invalid })
    .nonoptional({ error: Err.id_required });

export default IdValidate;