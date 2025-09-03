"use client";

import { useAuthStore } from "@/stores/userStore";
import Link from "next/link";

export default function WelcomePage() {
  const workRoute = [
    { path: "typeAccount", display: "帳號輸入" },
    { path: "/register", display: "註冊" },
    { path: "/login", display: "登入" },
    { path: "/userList", display: "用戶列表" },
  ];
  const { name } = useAuthStore();
  return (
    <div className="w-[70vw] p-[20px] mx-auto shadow-md flex flex-col items-center justify-center gap-5 rounded-md bg-indigo-50/50">
      {name && name ? <h1 className="text-xl">HI！{name}</h1> : ""}
      <div className="flex gap-6">
        {workRoute.map((route, index) => (
          <Link href={route.path} key={index}>
            <div className="w-30 h-20 shadow-md flex items-center justify-center text-xl bg-white rounded-md hover:bg-gray-50/50">
              {route.display}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
