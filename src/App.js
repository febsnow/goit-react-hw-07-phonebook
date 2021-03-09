import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import Section from "./сomponents/Section/Section";
import AddContactForm from "./сomponents/AddContactForm/AddContactForm";
import ContactList from "./сomponents/ContactsList/ContactList";
import Filter from "./сomponents/Filter/Filter";
import Logo from "./сomponents/Logo/Logo";
import { Preloader } from "./сomponents/Loader/Loader";

import styles from "../src/сomponents/Section/Section.module.css";
import operations from "./redux/operations/operations";
import { getAllContacts, isContactsLoading } from "./redux/contacts-selectors";

import * as logo from "../src/сomponents/Logo/Logo.module.css";
import "./App.css";

class App extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    console.log(this.props);
    const { items, isLoading } = this.props;
    return (
      <>
        {isLoading && <Preloader />}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
