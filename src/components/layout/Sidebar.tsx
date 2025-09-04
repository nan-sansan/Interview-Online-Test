"use client";
import { usePathname, useRouter } from "next/navigation";
import { workRoute } from "@/config/config";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <ul className="w-[150px] h-full bg-yellow-50/50 flex flex-col border-r">
      {workRoute.map((route, index) => {
        const Icon = route.icon;
        return (
          <li
            className={cn(
              "border-b cursor-pointer p-3  hover:bg-green-100/20 flex gap-3",
              currentPath === route.path && "font-bold text-green-700",
            )}
            key={index}
            onClick={() => {
              router.push(route.path);
            }}
          >
            <Icon />
            {route.display}
          </li>
        );
      })}
    </ul>
  );
}
