import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import actions from "./actions";

const {
  fetchContactRequest,
  fetchContactSuccess,
  fetchContactError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  removeContactRequest,
  removeContactSuccess,
  removeContactError,
} = actions;

const filterReducer = createReducer("", {
  [actions.filterContacts]: (_, { payload }) => payload,
});

const itemsReducer = createReducer([], {
  [fetchContactSuccess]: (state, { payload }) => payload,
  [addContactSuccess]: (state, { payload }) => [...state, payload],
  [removeContactSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const loadingReducer = createReducer(false, {
  [addContactRequest]: () => true,
  [addContactSuccess]: () => false,
  [addContactError]: () => false,
  [removeContactRequest]: () => true,
  [removeContactSuccess]: () => false,
  [removeContactError]: () => false,
  [fetchContactRequest]: () => true,
  [fetchContactSuccess]: () => false,
  [fetchContactError]: () => false,
});

const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
  loading: loadingReducer,
});

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

export default rootReducer;
