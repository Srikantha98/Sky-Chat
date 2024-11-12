// src/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Actions
const SET_USER = 'SET_USER';
const SET_MESSAGES = 'SET_MESSAGES';
const ADD_MESSAGE = 'ADD_MESSAGE';

// Action creators
export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setMessages = (messages) => ({ type: SET_MESSAGES, payload: messages });
export const addMessage = (message) => ({ type: ADD_MESSAGE, payload: message });

// Reducers
const userReducer = (state = null, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
};

const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return action.payload;
    case ADD_MESSAGE:
      return [...state, action.payload];
    default:
      return state;
  }
};

// Root reducer
const rootReducer = combineReducers({
  user: userReducer,
  messages: messagesReducer,
});

// Create store with thunk middleware for async actions
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
