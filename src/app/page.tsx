"use client";

import { useAuthStore } from "@/stores/userStore";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  const workRoute = [
    { path: "typeAccount", display: "帳號輸入" },
    { path: "/register", display: "註冊" },
    { path: "/login", display: "登入" },
    { path: "/userList", display: "用戶列表" },
  ];
  const { name, logout } = useAuthStore();
  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="w-[800px] p-[20px] mx-auto flex flex-col items-center justify-center gap-5 rounded-md">
        {name && (
          <div className="flex justify-center items-center gap-1">
            <h1 className="text-3xl font-bold">HI！{name} 歡迎回來</h1>
            <Button
              variant="ghost"
              onClick={() => {
                logout();
              }}
            >
              <LogOut></LogOut>
            </Button>
          </div>
        )}
        <div className="flex gap-6">
          {workRoute.map((route, index) => (
            <Link href={route.path} key={index}>
              <div className="card-image w-[150px] h-[150px] pb-3 pr-3 flex items-end justify-end text-xl  rounded-md hover:shadow-sm">
                <div className=" border-b border-green-950 pl-5">
                  {route.display}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
