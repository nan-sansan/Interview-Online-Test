import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/User";

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
          const lastId = Number(localStorage.getItem("lastId") || "0");
          const newId = (lastId + 1).toString();
          localStorage.setItem("lastId", newId);
          set({ users: [...users, { ...newUser, id: newId }] });
          return true;
        }
      },
    }),
    { name: "userPool-storage" },
  ),
);
