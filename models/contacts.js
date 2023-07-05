const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const getListContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  const result = JSON.parse(contacts);
  return result;
}

const getContactById = async (contactId) => {
  const id = String(contactId);
  const contacts = await getListContacts();
  const result = contacts.find(item => item.id === id);
  return result || null;
}

const removeContact = async (contactId) => {
  const id = String(contactId);
  const contacts = await getListContacts();
  const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result || null;
}

const addContact = async ({name, email, phone}) => {
  const contacts = await getListContacts();
  const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;    
}

const updateContact = async (contactId, {name, email, phone}) => {
  const id = String(contactId);
  const contacts = await getListContacts();
  const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
  contacts[index] = {
    id,
    name,
    email,
    phone,
  };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index] || null;
}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
