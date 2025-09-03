"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { deleteUsersApi, getUsersApi, updateUsersApi } from "@/apis/users";
import { User } from "@/types/User";

export default function ListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const { users, total } = await getUsersApi({ page, size });
      setUsers(users);
      setTotal(total);
    };
    void loadData();
  }, [page, size]);

  async function handleDelete(userId: string, username: string) {
    const loadData = async () => {
      const { users, total } = await getUsersApi({ page, size });
      setUsers(users);
      setTotal(total);
    };
    const isConfirm = confirm(`確定要刪除 ${username} 用戶？`);
    if (isConfirm) {
      await deleteUsersApi(userId);
      await loadData();
    }
  }
  return (
    <div className="flex flex-col w-full h-full items-center justify-between gap-5 py-10">
      <Table className="w-[1000px] mx-auto p-[20px] ">
        <TableHeader>
          <TableRow>
            <TableHead>帳號</TableHead>
            <TableHead>電子郵件</TableHead>
            <TableHead>性別</TableHead>
            <TableHead>狀態</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users &&
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>
                  <Select
                    defaultValue={user.status}
                    onValueChange={async (value: "active" | "inactive") =>
                      await updateUsersApi({ ...user, status: value })
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="選擇狀態" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>狀態</SelectLabel>
                        <SelectItem value="active">活躍帳戶</SelectItem>
                        <SelectItem value="inactive">非活躍帳戶</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleDelete(user.id, user.name);
                    }}
                  >
                    刪除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex gap-2">
        <Select onValueChange={(value) => setSize(Number(value))}>
          <SelectTrigger>{size}</SelectTrigger>
          <SelectContent>
            {["1", "10", "15", "20", "50"].map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          上一頁
        </Button>
        <Button
          variant="outline"
          disabled={page === Math.floor(total / size)}
          onClick={() => setPage(page + 1)}
        >
          下一頁
        </Button>
      </div>
    </div>
  );
}
