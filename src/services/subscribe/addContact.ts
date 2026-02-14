import { Client } from "ldapts";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
    url: "ldap://${process.env.LDAP_URL}:389",
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
    await client.bind(`cn=${process.env.LDAP_LOGIN},dc=wmgcat,dc=net`, process.env.LDAP_PASS);
   
    const entry = {
        cn: username,
        sn: username,
        mail: email,
        objectClass: [ "inetOrgPerson", "top" ]
    }
    const safeCN = username.replace(/[,+="<>#;\\]/g, '\\$&');

    await client.add(`cn=${safeCN},ou=contacts,dc=wmgcat,dc=net`, entry);
    await client.unbind();
    return true;
}

export default addContact;