import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./contacts/reducers";

const store = configureStore({ reducer: rootReducer });

export default store;
