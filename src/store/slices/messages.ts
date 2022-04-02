import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IChatMessage} from '../../models/chatMessage';

export type MessagesState = {
  messages: IChatMessage[]
}

const initialState: MessagesState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages(state, action: PayloadAction<IChatMessage[]>) {
      state.messages = [...state.messages, ...action.payload];
    },
    addMessagesToStart(state, action: PayloadAction<IChatMessage[]>) {
      state.messages = [...action.payload, ...state.messages];
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});

export const {addMessages, clearMessages, addMessagesToStart} = messagesSlice.actions;

export default messagesSlice.reducer;
