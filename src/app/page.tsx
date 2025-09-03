"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      console.log(user);
      router.push("/Welcome");
    }
  }, [router, user]);

  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[A-Za-z0-9]*$/; // 正則表達，只允許英文&數字
    if (regex.test(e.target.value)) {
      setValue(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (!value.trim()) return;
    setSubmitted(value.trim());
    useAuthStore.getState().login({ name: value.trim() });
  };

  return (
    <div className="flex flex-col gap-2 mx-auto w-[50vw] ">
      {submitted ? (
        <div className="text-xl font-bold text-center">Hi, {submitted}!</div>
      ) : (
        <>
          <Label htmlFor="acc">請輸入名稱</Label>
          <Input
            id="acc"
            type="text"
            placeholder="帳號名稱，僅限英文數字"
            value={value}
            onChange={handleInputChange}
          ></Input>
          <div className="flex justify-end">
            <Button className="w-20" onClick={handleSubmit}>
              送出
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
