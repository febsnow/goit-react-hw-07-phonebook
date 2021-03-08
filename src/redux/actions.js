import { createAction } from "@reduxjs/toolkit";

const fetchContactRequest = createAction("contacts/fetchContactRequest");
const fetchContactSuccess = createAction("contacts/fetchContactSuccess");
const fetchContactError = createAction("contacts/fetchContactError");

const addContactRequest = createAction("contacts/addContactRequest");
const addContactSuccess = createAction("contacts/addContactSuccess");
const addContactError = createAction("contacts/addContactError");

const removeContactRequest = createAction("contacts/removeContactRequest");
const removeContactSuccess = createAction("contacts/removeContactSuccess");
const removeContactError = createAction("contacts/removeContactError");

const filterContacts = createAction("contacts/filter");

export default {
  addContactRequest,
  addContactSuccess,
  addContactError,
  removeContactRequest,
  removeContactSuccess,
  removeContactError,
  fetchContactRequest,
  fetchContactSuccess,
  fetchContactError,

  filterContacts,
};
