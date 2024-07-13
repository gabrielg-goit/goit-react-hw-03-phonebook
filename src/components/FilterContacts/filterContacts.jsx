import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './filterContacts.module.css';

class FilterContacts extends Component {
  setFilterValue = event => {
    let value = event.currentTarget.value.toUpperCase();
    this.props.setFilterToState(value);
  };

  render() {
    return (
      <>
        <h1 className={style.title}>Contacts</h1>
        <div>
          <h4 className={style.littleTitle}>Find contacts by name</h4>
          <input onChange={this.setFilterValue}></input>
        </div>
      </>
    );
  }
}

FilterContacts.propTypes = {
  setFilterToState: PropTypes.func.isRequired,
};
export default FilterContacts;
