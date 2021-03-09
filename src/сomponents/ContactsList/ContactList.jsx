import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import operations from "../../redux/operations/operations";
import { getAllContacts, getFilteredContacts } from "../../redux/contacts-selectors";
import "./ContactList.css";

class ContactList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    handleRemove: PropTypes.func.isRequired,
  };

  render() {
    const { items, handleRemove } = this.props;

    return (
      <TransitionGroup component="ul" className="list">
        {items.map((contact) => {
          return (
            <CSSTransition
              appear={true}
              key={contact.id}
              timeout={650}
              classNames="item"
              unmountOnExit
            >
              <li className="listItem">
                <span className="info">{contact.name}:</span>
                <span className="info">{contact.number}</span>
                <button
                  className="button"
                  type="button"
                  onClick={() => {
                    handleRemove(contact.id);
                  }}
                >
                  Удалить
                </button>
              </li>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    );
  }
}

const mapStateToProps = (state) => {
  const allContacts = getAllContacts(state)
  const filteredContacts = getFilteredContacts(state);

  return {
    items: filteredContacts.length > 0 ? filteredContacts : allContacts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleRemove: (id) => dispatch(operations.removeContact(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

// const mapStateToProps = ({ contacts: { items, filter } }) => ({
//   items: getFiltredContacts(items, filter),
// });
