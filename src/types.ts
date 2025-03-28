export interface User {
  id: string;
  uid: string;
}

export interface Message {
  id: string;
  content: string;
  sender_uid: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  login: (uid: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface ChatState {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  setMessages: (messages: Message[]) => void;
}