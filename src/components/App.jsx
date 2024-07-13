import React, { Component } from 'react';
import PhonebookForm from './PhonebookForm/phonebookForm';
import Contacts from './Contacts/contacts';
import FilterContacts from './FilterContacts/filterContacts';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = data => {
    this.repeatControl(data);
  };

  repeatControl = data => {
    let nameArray = [];
    nameArray = this.state.contacts.map(cnt => cnt.name);
    if (!nameArray.includes(data.name)) {
      let arrayContacts = [];
      arrayContacts = [
        ...this.state.contacts,
        { name: data.name, number: data.number },
      ];
      return this.setState({ ...this.state, contacts: arrayContacts });
    } else {
      alert('The contact is already in the phonebook');
    }
  };

  elementDelete = (arr, idContact) => {
    let newArr = arr.filter(elem => elem.id !== idContact);
    return newArr;
  };

  deleteContactFromContactList = idContact => {
    let newArrAfterDel = this.elementDelete(this.state.contacts, idContact);
    this.setState({
      ...this.state,
      contacts: [...newArrAfterDel],
    });
  };

  setFilterToState = filterData => {
    this.setState({ ...this.state, filter: `${filterData}` });
  };

  filterArr = fArr => {
    let newArr = fArr.filter(current =>
      current.name.toUpperCase().includes(this.state.filter)
    );
    return newArr;
  };

  render() {
    return (
      <div className="flex">
        <PhonebookForm onSubmit={this.formSubmitHandler} />
        <FilterContacts setFilterToState={this.setFilterToState} />
        <Contacts
          contacts={this.filterArr(this.state.contacts)}
          del={this.deleteContactFromContactList}
        />
      </div>
    );
  }
}
