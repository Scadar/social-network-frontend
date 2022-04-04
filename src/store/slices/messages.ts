import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import {IChatMessage} from '../../models/chatMessage';
import {IUser} from '../../models/authModels';

export type GroupedMessage = {
  _id: string;
  senderDto: IUser;
  body: {
    _id: string;
    message: string;
    createdAt: Date;
  }[]
  chatRoomId: string;
}

export type MessagesState = {
  messages: IChatMessage[]
  groupedMessages: GroupedMessage[]
}

const initialState: MessagesState = {
  messages: [],
  groupedMessages: [],
};

const getGroupsFromArray = (messages: IChatMessage[]): GroupedMessage[] => {
  const result: GroupedMessage[] = [];
  let prevMsg = null;
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    if (i === 0) {
      result.push({
        chatRoomId: message.chatRoomId,
        senderDto: message.senderDto,
        _id: message._id,
        body: [{_id: message._id, message: message.message, createdAt: message.createdAt}],
      });
    } else {
      if (prevMsg?.senderDto._id === message.senderDto._id) {
        result[result.length - 1].body.unshift({_id: message._id, message: message.message, createdAt: message.createdAt});
      } else {
        result.push({
          chatRoomId: message.chatRoomId,
          senderDto: message.senderDto,
          _id: message._id,
          body: [{_id: message._id, message: message.message, createdAt: message.createdAt}],
        });
      }
    }
    prevMsg = message;
  }

  return result;
};

const mergeGroups = (group1: GroupedMessage[], group2: GroupedMessage[]): GroupedMessage[] => {
  const firstGroup = [...group1];
  const secondGroup = [...group2];
  const lastGroup1Item = firstGroup[firstGroup.length - 1];
  const firstGroup2Item = secondGroup[0];
  if (lastGroup1Item.senderDto._id === firstGroup2Item.senderDto._id) {
    const mergedItem: GroupedMessage = {
      _id: lastGroup1Item._id,
      senderDto: lastGroup1Item.senderDto,
      chatRoomId: lastGroup1Item.chatRoomId,
      body: [...firstGroup2Item.body, ...lastGroup1Item.body],
    };

    firstGroup.pop();
    secondGroup.shift();

    return [...firstGroup, mergedItem, ...secondGroup];
  } else {
    return [...firstGroup, ...secondGroup];
  }
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessagesToEnd(state, action: PayloadAction<IChatMessage[]>) {
      if (state.groupedMessages.length === 0) {
        state.groupedMessages = getGroupsFromArray(action.payload);
      } else {
        const newGroup = getGroupsFromArray(action.payload);
        state.groupedMessages = mergeGroups(current(state.groupedMessages), newGroup);
      }
      state.messages = [...state.messages, ...action.payload];
    },
    addMessagesToStart(state, action: PayloadAction<IChatMessage[]>) {
      if (state.groupedMessages.length === 0) {
        state.groupedMessages = getGroupsFromArray(action.payload);
      } else {
        const newGroup = getGroupsFromArray(action.payload);
        state.groupedMessages = mergeGroups(newGroup, current(state.groupedMessages));
      }
      state.messages = [...action.payload, ...state.messages];
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});

export const {addMessagesToEnd, clearMessages, addMessagesToStart} = messagesSlice.actions;

export default messagesSlice.reducer;
