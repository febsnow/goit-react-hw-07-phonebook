export const getAllContacts = (state) => state.contacts.items;

export const isContactsLoading = (state) => state.contacts.loading;

export const getFilter = (state) => state.contacts.filter;

export const getFilteredContacts = (state) => {
  const contacts = getAllContacts(state);
  const filter = getFilter(state);

  const normalizedFilter = filter.toLowerCase();

  return contacts.filter(({ name }) => name.toLowerCase().includes(normalizedFilter));
};