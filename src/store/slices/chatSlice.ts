import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState, Conversation, Message } from '../../types';

const initialState: ChatState = {
  conversations: [],
  currentConversation: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.unshift(action.payload);
    },
    updateConversation: (state, action: PayloadAction<Conversation>) => {
      const index = state.conversations.findIndex(conv => conv.id === action.payload.id);
      if (index !== -1) {
        state.conversations[index] = action.payload;
      }
    },
    setCurrentConversation: (state, action: PayloadAction<Conversation | null>) => {
      state.currentConversation = action.payload;
    },
  },
});

export const {
  setConversations,
  addConversation,
  updateConversation,
  setCurrentConversation,
} = chatSlice.actions;
export default chatSlice.reducer;
