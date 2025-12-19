import {
    ZodError,
    ZodType
} from "zod";

/**
 * Validate data
 * 
 * @param schema - Zod schema
 * @param data - Data for validate
*/
const validate = (schema: ZodType, data: unknown) => {
    try { schema.parse(data); }
    catch(err) {
        if (err instanceof ZodError)
            throw new Error(err.issues[0].message);
        throw err;
    }
}

export default validate;