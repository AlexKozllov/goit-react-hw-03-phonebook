import React from "react";

const ContactList = ({ listContacts, hendleBtnDelete }) => {
  return (
    <ul>
      {listContacts.map((item) => (
        <li key={item.id}>
          <span>{item.name}</span>: <span>{item.number}</span>
          <button
            type="button"
            onClick={() => {
              hendleBtnDelete(item.id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
