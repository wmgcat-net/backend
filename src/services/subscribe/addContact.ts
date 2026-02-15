import { Client } from "ldapts";
import dotenv from "dotenv";
import db from "@/libs/db";

dotenv.config();

const client = new Client({
    url: `ldap://${process.env.LDAP_URL}:${process.env.LDAP_PORT}`,
    strictDN: false,
    timeout: 5000,
    connectTimeout: 10000
});

/**
 * Added contact to ldap
 * @example
 * return addContact()
*/
const addContact = async (username: string, email: string): Promise<any> => {
    const result = await db.query(`
        INSERT INTO "emails"
        SET username=$1, email=$2
    `, [ username, email ]);

    return true;
}

export default addContact;