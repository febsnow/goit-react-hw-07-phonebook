import React, { Component } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import actions from "../../redux/contacts/actions"
import styles from "./ErrorPrompt.module.css";

class ErrorPrompt extends Component {
  static propTypes = {
    message: PropTypes.string,
    clearError: PropTypes.func,
  }

  componentDidMount() {
    if (this.props.message) {
      setTimeout(() => {
        this.props.clearError();
      }, 3000);
    }
  }

    render() {
    return (
    <CSSTransition
      appear={true}
      in={true}
      timeout={250}
      classNames={styles}
      unmountOnExit
    >
      <div className={styles.errorPrompt}>
        <p>{this.props.message}</p>
      </div>
    </CSSTransition>
    );
  }
};


const mapDispatchToProps = dispatch => ({
  clearError: () => dispatch(actions.clearError())
});

export default connect(null, mapDispatchToProps)(ErrorPrompt);
