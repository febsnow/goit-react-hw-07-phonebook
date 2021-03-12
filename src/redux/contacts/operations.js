import axios from "axios";
import actions from "./actions";

axios.defaults.baseURL = "http://localhost:3001";

const fetchContacts = () => (dispatch) => {
  dispatch(actions.fetchContactRequest());

  axios
    .get("/contacts")
    .then(({ data }) => dispatch(actions.fetchContactSuccess(data)))
    .catch((error) => dispatch(actions.fetchContactError(error.message)));
};

const addContact = (contact) => (dispatch) => {
  dispatch(actions.addContactRequest());

  axios
    .post("/contacts", contact)
    .then(({ data }) => dispatch(actions.addContactSuccess(data)))
    .catch((error) => dispatch(actions.addContactError(error.message)));
};

const removeContact = (id) => (dispatch) => {
  dispatch(actions.removeContactRequest());

  axios
    .delete(`/contacts/${id}`)
    .then(() => dispatch(actions.removeContactSuccess(id)))
    .catch((error) => dispatch(actions.removeContactError(error.message)));
};

export default {
  fetchContacts,
  addContact,
  removeContact,
};
