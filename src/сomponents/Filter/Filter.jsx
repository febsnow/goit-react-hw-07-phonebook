import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import { getFilter } from "../../redux/contacts-selectors";
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

const mapStateToProps = state => ({
  value: getFilter(state),
})

const mapDispatchToProps = (dispatch) => ({
  onChange: (e) => dispatch(actions.filterContacts(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
