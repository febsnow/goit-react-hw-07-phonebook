import React, { Component } from "react";
import { connect } from "react-redux";
import ErrorPrompt from "../ErrorPrompt/ErrorPrompt";
import styles from "./AddContactForm.module.css";
import operations from "../../redux/operations/operations";
import { CSSTransition } from "react-transition-group";
import { getAllContacts } from "../../redux/contacts-selectors";
import * as errorMsg from "../ErrorPrompt/ErrorPrompt.module.css";

class AddContactForm extends Component {
  state = {
    name: "",
    number: "",
    message: null,
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (evt) => {
    evt.preventDefault();

    const { name, number } = this.state;

    if (
      this.props.items.find(
        (contact) =>
          contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      this.setState({ message: `${name} already exist` });
      this.setState({ name: "", number: "" });

      return setTimeout(() => {
        this.setState({ message: null });
      }, 3000);
    }

    this.props.onSubmit(name, number);

    this.setState({ name: "", number: "" });
  };

  render() {
    const { name, number, message } = this.state;
    return (
      <>
        <CSSTransition
          appear={true}
          in={message !== null}
          timeout={300}
          classNames={errorMsg}
          unmountOnExit
        >
          <ErrorPrompt message={message} />
        </CSSTransition>

        <form className={styles.contactsForm} onSubmit={this.submitHandler}>
          <label htmlFor="contactName" className={styles.label}>
            Name
          </label>
          <input
            className={styles.formInput}
            type="text"
            value={name}
            name="name"
            id="contactName"
            placeholder="Enter name"
            required
            onChange={this.changeHandler}
          />
          <label htmlFor="contactNumber" className={styles.label}>
            Number
          </label>
          <input
            className={styles.formInput}
            type="tel"
            value={number}
            name="number"
            id="contactNumber"
            placeholder="Enter phone number"
            required
            onChange={this.changeHandler}
          />
          <button className={styles.addButton} type="submit">
            Add contacts
          </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: getAllContacts(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (name, number) => {
    dispatch(operations.addContact(name, number));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddContactForm);
