import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import styles from "./Filter.module.css";

function Filter({ value, onChange }) {
  return (
    <div className={styles.filter}>
      <label htmlFor="filter" className={styles.label}>
        Find contacts by name
      </label>
      <input
        className={styles.formInput}
        type="text"
        id="filter"
        name="filter"
        value={value}
        onChange={onChange}
        autoComplete="off"
      ></input>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => ({
  onChange: (e) => dispatch(actions.filterContacts(e.target.value)),
});

export default connect(null, mapDispatchToProps)(Filter);
