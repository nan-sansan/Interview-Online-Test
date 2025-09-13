"use client";

import { useAuthStore } from "@/stores/userStore";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { workRoute } from "@/config/config";
import { useDebounce } from "@/hooks/useDebounce";
import { isShouldShow } from "@/utils/routeHelper";

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { name } = useAuthStore();
  const pathname = usePathname();
  const [isShow, setIsShow] = useState(false);

  useDebounce(
    () => {
      const find = workRoute.find((route) => route.path === pathname);
      if (!find) {
        setIsShow(true);
        return;
      }
      setIsShow(isShouldShow(find, !!name));
    },
    200,
    [pathname, name],
  );

  if (isShow) {
    return <>{children}</>;
  } else {
    return <>{name ? "使用者已登入" : "使用者未登入"}</>;
  }
}
