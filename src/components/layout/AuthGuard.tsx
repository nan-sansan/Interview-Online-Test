"use client";

import { useAuthStore } from "@/stores/userStore";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { workRoute } from "@/config/config";

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { name } = useAuthStore();
  const pathname = usePathname();
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const find = workRoute.find((route) => route.path === pathname);
    if (!find) {
      setIsShow(true);
      return;
    }
    const loginDisable = find.loginDisable;
    const isLogin = !!name;
    if (loginDisable && isLogin) {
      setIsShow(false);
    } else if (!loginDisable && isLogin) {
      setIsShow(true);
    } else if (!loginDisable && !isLogin) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  }, [pathname, name]);

  if (isShow) {
    return <>{children}</>;
  } else {
    return <>使用者已登入</>;
  }
}
