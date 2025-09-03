"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "@/types/User";
import { addUserApi } from "@/apis/users";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("O");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[A-Za-z0-9]*$/; // 正則表達，只允許英文&數字
    if (regex.test(e.target.value)) {
      setName(e.target.value);
    }
  };
  const HandleSubmit = async () => {
    if (!name) {
      toast.error("請輸入帳號名稱");
      return;
    }
    if (!email) {
      toast.error("請輸入電子郵件");
      return;
    }

    const newUser: User = {
      id: "",
      name: name,
      email: email,
      gender: gender,
      status: "active",
    };

    if (!(await addUserApi(newUser))) {
      toast.error("註冊失敗");
    } else {
      toast.success("註冊成功");
      //註冊完直接登入
      router.push("/login");
    }
  };
  return (
    <div className="flex w-full h-full items-center justify-center ">
      <div className="bg-white/60  w-[500px] mx-auto flex flex-col gap-5 p-[20px] rounded-md shadow-xs">
        <>
          <h1 className="text-2xl font-bold">註冊</h1>
        </>
        <div className="flex flex-col gap-3 ">
          <Label htmlFor="acc">請輸入註冊帳號</Label>
          <Input
            id="acc"
            className=""
            placeholder="僅限英文數字"
            value={name}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </div>
        <div className="flex flex-col gap-3 ">
          <Label htmlFor="email">請輸入註冊電子郵件</Label>
          <Input
            id="email"
            placeholder="電子郵件"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-3">
          請輸入性別
          <RadioGroup
            className="flex"
            value={gender}
            onValueChange={(val) => {
              setGender(val);
            }}
          >
            <div className="flex gap-3">
              <RadioGroupItem value="M" id="r1"></RadioGroupItem>
              <Label htmlFor="r1">男</Label>
            </div>
            <div className="flex gap-3">
              <RadioGroupItem value="F" id="r2"></RadioGroupItem>
              <Label htmlFor="r2">女</Label>
            </div>
            <div className="flex gap-3">
              <RadioGroupItem value="O" id="r3"></RadioGroupItem>
              <Label htmlFor="r3">其他</Label>
            </div>
          </RadioGroup>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                HandleSubmit();
              }}
            >
              送出
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
