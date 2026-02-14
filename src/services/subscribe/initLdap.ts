import { Client } from "ldapts";
import dotenv from "dotenv";

dotenv.config();

const initLDAP = async () => {
    const client = new Client({
        url: "ldap://ldap:389",
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
};

export default initLDAP;