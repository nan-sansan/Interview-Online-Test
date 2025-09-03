import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  users: User[];
  login: (user: User) => void;
  logout: () => void;
  register: (user: User) => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      register: (newUser: User) => {
        const { users } = get();
        const user =
          users.find((user) => user.name === newUser.name) ||
          users.find((user) => user.email === newUser.email);
        if (user) {
          return false;
        } else {
          set({ users: [...users, newUser] });
          return true;
        }
      },
    }),
    { name: "auth-storage" },
  ),
);
