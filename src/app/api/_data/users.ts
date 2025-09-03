import { User } from "@/types/User";
import { DataPool } from "@/types/DataPool";

const deepCopy = (data: User[]) => {
  return JSON.parse(JSON.stringify(data));
};

const _data: User[] = [
  { id: "1", name: "NN", email: "123123", gender: "F", status: "active" },
  { id: "2", name: "WW", email: "aaaaaa", gender: "M", status: "active" },
];

export const dataPool: DataPool<User> = {
  getAll: () => {
    return deepCopy(_data);
  },
  add: (user) => {
    const index = _data.length - 1;
    const lastId = Number(_data[index]?.id) || 0;

    user.id = String(lastId + 1);

    _data.push(user);
  },
  update: (user) => {
    const index = _data.findIndex(({ id }) => {
      return id === user.id;
    });
    if (index === -1) {
      throw new Error("使用者不存在");
    } else {
      _data[index] = user;
    }
  },
  delete: ({ id: userId }) => {
    const index = _data.findIndex(({ id }) => {
      return id === userId;
    });
    if (index === -1) {
      return;
    }
    _data.splice(index, 1);
  },
};
