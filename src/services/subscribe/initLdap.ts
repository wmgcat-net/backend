import { Client } from "ldapts";
import dotenv from "dotenv";

dotenv.config();

const initLDAP = async () => {
    try {
        const client = new Client({
            url: `ldap://${process.env.LDAP_URL}:${process.env.LDAP_PORT}`,
            strictDN: false
        });

        try {
            await client.bind(`cn=${process.env.LDAP_LOGIN},dc=wmgcat,dc=net`, process.env.LDAP_PASS);
            await client.add("ou=contacts,dc=wmgcat,dc=net", {
                objectClass: ["organizationalUnit", "top"],
                ou: "contacts"
            });
        }
        finally { await client.unbind(); }
    }
    catch(err) {
        console.log(err);
    }
};

export default initLDAP;