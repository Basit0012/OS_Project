import { create } from 'zustand';
import type { ChatState, Message } from '../types';
import { useAuthStore } from './authStore';

// Create a BroadcastChannel for cross-tab communication
const chatChannel = new BroadcastChannel('secure-chat');

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  sendMessage: async (content: string) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      content,
      sender_uid: user.uid,
      created_at: new Date().toISOString()
    };

    // Broadcast the message to other tabs
    chatChannel.postMessage(newMessage);

    // Update local state
    set(state => ({
      messages: [...state.messages, newMessage]
    }));
  },
  setMessages: (messages: Message[]) => set({ messages })
}));

// Listen for messages from other tabs
chatChannel.onmessage = (event) => {
  const message: Message = event.data;
  useChatStore.setState(state => ({
    messages: [...state.messages, message]
  }));
};