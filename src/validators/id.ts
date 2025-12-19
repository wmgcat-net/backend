import z from "zod";

const IdValidate = z.number({ error: "errors.invalid.id" })
    .nonnegative({ error: "errors.invalid.id" })
    .int({ error: "errors.invalid.id" })
    .nonoptional({ error: "errors.required.id" });

export default IdValidate;