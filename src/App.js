import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import Section from "./сomponents/Section/Section";
import AddContactForm from "./сomponents/AddContactForm/AddContactForm";
import ContactList from "./сomponents/ContactsList/ContactList";
import Filter from "./сomponents/Filter/Filter";
import Logo from "./сomponents/Logo/Logo";
import ErrorPrompt from "./сomponents/ErrorPrompt/ErrorPrompt";
import { Preloader } from "./сomponents/Loader/Loader";

import operations from "./redux/contacts/operations";
import { getAllContacts, getError, isContactsLoading } from "./redux/contacts/contacts-selectors";

import styles from "./сomponents/Section/Section.module.css";
import * as logo from "./сomponents/Logo/Logo.module.css";
import "./App.css";

class App extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    const { items, isLoading, error } = this.props;

    return (
      <>
        {isLoading && <Preloader />}
        {error && <ErrorPrompt message={error} />}

        <CSSTransition in={true} appear={true} timeout={250} classNames={styles} unmountOnExit>
          {(stage) => {
            return (
              <div className="phoneBook">
                <CSSTransition in={stage === "entered"} timeout={500} classNames={logo} unmountOnExit>
                  <Logo title="Phonebook" />
                </CSSTransition>

                <Section>
                  <AddContactForm />
                </Section>

                <CSSTransition
                  appear={true}
                  in={items && items.length > 1}
                  timeout={300}
                  classNames={styles}
                  unmountOnExit>
                  <Section>
                    <Filter />
                  </Section>
                </CSSTransition>

                <CSSTransition appear={true} in={items.length > 0} timeout={300} classNames={styles} unmountOnExit>
                  <Section title="Contacts">
                    <CSSTransition
                      // appear={true}
                      in={true}
                      timeout={250}
                      classNames="contactsList"
                      unmountOnExit>
                      <ContactList />
                    </CSSTransition>
                  </Section>
                </CSSTransition>
              </div>
            );
          }}
        </CSSTransition>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchContacts: () => dispatch(operations.fetchContacts()),
});

const mapStateToProps = (state) => {
  return {
    items: getAllContacts(state),
    isLoading: isContactsLoading(state),
    error: getError(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
