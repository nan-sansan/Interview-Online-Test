"use client";

import { useAuthStore } from "@/stores/userStore";

export default function WelcomePage() {
  const workRoute = [
    { routeName: "register", display: "註冊" },
    { routeName: "login", display: "登入" },
    { routeName: "list", display: "列表" },
  ];
  const { user } = useAuthStore();

  return (
    <div className="w-[70vw] p-[20px] mx-auto shadow-md flex flex-col items-center justify-center gap-5 rounded-md bg-indigo-50/50">
      <h1>HELLO！{user?.name}</h1>
      <div className="flex gap-6">
        {workRoute.map((route, index) => (
          <div
            key={index}
            className="w-30 h-20 shadow-md flex items-center justify-center text-xl bg-white rounded-md hover:bg-gray-50/50"
          >
            {route.display}
          </div>
        ))}
      </div>
    </div>
  );
}
