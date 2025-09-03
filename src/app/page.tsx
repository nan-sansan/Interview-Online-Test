"use client";

import { useAuthStore } from "@/stores/userStore";
import Link from "next/link";
import { LogOut, Send, UserPlus, LogIn, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function WelcomePage() {
  const workRoute = [
    { path: "typeAccount", display: "帳號輸入", icon: <Send size={75} /> },
    { path: "/register", display: "註冊", icon: <UserPlus size={75} /> },
    { path: "/login", display: "登入", icon: <LogIn size={75} /> },
    { path: "/userList", display: "用戶列表", icon: <List size={75} /> },
  ];
  const { name, logout } = useAuthStore();
  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="w-[800px] p-[20px] mx-auto flex flex-col items-center justify-center gap-8 rounded-md">
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
              <div
                className={cn(
                  "bg-white/60 hover:bg-white/80 hover:shadow-md transition-all duration-75 w-[150px] h-[150px]",
                  "pb-3 pr-3 text-xl rounded-md shadow-xs border-1 border-green-50",
                  "flex flex-col gap-1 items-end justify-end",
                  "hover:shadow-sm hover:border-gray-50 hover:translate-y-[-4px] hover:scale-105",
                )}
              >
                <div className="w-full flex justify-center text-green-800 opacity-70">
                  {route.icon}
                </div>
                <div className=" border-b  text-green-800 border-green-800 pl-5 font-bold opacity-90">
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
