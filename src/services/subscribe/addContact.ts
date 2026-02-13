import { Client } from "ldapts";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
    url: "ldap://localhost:389",
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
    await client.bind(`cn=admin,dc=${process.env.LDAP_LOGIN},dc=net`, process.env.LDAP_PASS);
   
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

// const ldap = require('ldapjs');

// const client = ldap.createClient({
//   url: 'ldap://localhost:389'
// });

// // Подключение
// client.bind('cn=admin,dc=example,dc=com', 'password', (err) => {
//   if (err) {
//     console.error('Bind error:', err);
//     return;
//   }

//   // Добавление контакта
//   const entry = {
//     cn: 'Ivan Ivanov',
//     sn: 'Ivanov',
//     mail: 'ivan@example.com',
//     objectClass: ['inetOrgPerson', 'top']
//   };

//   client.add('cn=Ivan Ivanov,ou=contacts,dc=example,dc=com', entry, (err) => {
//     if (err) {
//       console.error('Add error:', err);
//     } else {
//       console.log('Contact added!');
//     }
//     client.unbind();
//   });
// });