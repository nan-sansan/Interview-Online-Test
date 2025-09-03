"use client";
import { useUserPoolStore } from "@/stores/userPoolStore";
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

export default function ListPage() {
  const { getAllUser, updateUser, deleteUser } = useUserPoolStore();
  const users = getAllUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleDelete(userId: string, username: string) {
    const isConfirm = confirm(`確定要刪除 ${username} 用戶？`);
    if (isConfirm) {
      deleteUser(userId);
    }
  }

  if (!mounted) return null;
  return (
    <Table className="w-[1000px] mx-auto p-[20px]">
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
                  onValueChange={(value: "active" | "inactive") =>
                    updateUser(user.id, value)
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
  );
}
