import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: string;
  email: string;
}

interface UserPoolStore {
  users: User[];
  register: (user: User) => boolean;
}

export const useUserPoolStore = create<UserPoolStore>()(
  persist(
    (set, get) => ({
      users: [],
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
    { name: "userPool-storage" },
  ),
);
