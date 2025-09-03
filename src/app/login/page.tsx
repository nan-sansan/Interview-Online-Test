"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/userStore";
import { loginApi } from "@/apis/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { login } = useAuthStore();
  const router = useRouter();
  const { name } = useAuthStore();

  useEffect(() => {
    if (name) {
      router.push("/");
    }
  }, [name, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[A-Za-z0-9]*$/; // 正則表達，只允許英文&數字
    if (regex.test(e.target.value)) {
      setUsername(e.target.value);
    }
  };
  const handleSubmit = async () => {
    if (!username || !email) {
      toast.error("請輸入帳號與電子郵件");
    }
    if (await loginApi(username, email)) {
      toast.success("登入成功");
      login(username.trim());
      router.push("/");
    } else {
      toast.error("請輸入有效帳號或電子郵件");
    }
  };

  return (
    <div className="flex w-full h-full items-center justify-center ">
      <div className="w-[500px] h-[300px] bg-white/60 mx-auto flex flex-col gap-5 p-[20px] rounded-md shadow-xs ">
        <h1 className="text-2xl font-bold">登入</h1>
        <>
          <Label htmlFor="acc">請輸入帳號名稱</Label>
          <Input
            id="acc"
            type="text"
            placeholder="註冊的帳號名稱，僅限英文數字"
            value={username}
            onChange={handleInputChange}
          ></Input>
          <Label htmlFor="acc">請輸入電子郵件</Label>
          <Input
            id="acc"
            type="text"
            placeholder="註冊的電子郵件"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Input>
          <div className="flex justify-end">
            <Button
              className="w-20"
              onClick={() => {
                handleSubmit();
              }}
            >
              送出
            </Button>
          </div>
        </>
      </div>
    </div>
  );
}
