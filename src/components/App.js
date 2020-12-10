import React, { Component } from "react";
import ContactForm from "./contactForm/ContactForm";
import ContactList from "./contactList/ContactList";
import Filter from "./filter/Filter";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    if (localStorage.getItem("contacts")) {
      this.setState({
        contacts: [...JSON.parse(localStorage.getItem("contacts"))],
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState !== this.state) {
      localStorage.setItem("contacts", JSON.stringify([...contacts]));
    }
  }

  addContacts = (stateForm) => {
    this.setState((prevState) => {
      return { contacts: [...prevState.contacts, stateForm] };
    });
  };

  hendleFilter = (e) => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  hendleBtnDelete = (itemId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter((item) => item.id !== itemId),
      };
    });
  };

  onCheckUnique = (name) => {
    const { contacts } = this.state;
    const isExistContact = !!contacts.find(
      (item) => item.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );
    isExistContact && alert("Contact is already exist");
    return !isExistContact;
  };

  render() {
    const { filter, contacts } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          handlerInput={this.handlerInput}
          addContacts={this.addContacts}
          onCheckUnique={this.onCheckUnique}
        />

        <h2>Contacts</h2>
        {contacts.length > 1 && (
          <Filter filterValue={filter} hendleFilter={this.hendleFilter} />
        )}

        {visibleContacts.length > 0 && (
          <ContactList
            listContacts={visibleContacts}
            hendleBtnDelete={this.hendleBtnDelete}
          />
        )}
      </div>
    );
  }
}

export default App;
