"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/stores/userStore";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Header() {
  const { name, logout } = useAuthStore();
  return (
    <div className="shadow-xs sticky w-full h-[50px] bg-yellow-50/40 flex justify-end items-center">
      {name && (
        <>
          <div>{name}</div>
          <Button
            variant="ghost"
            onClick={() => {
              logout();
            }}
          >
            <LogOut></LogOut>
          </Button>
        </>
      )}
      <div className="flex justify-end  gap-2 p-5 ">
        <Label htmlFor="data-switch">線上</Label>
        <Switch id="date-switch" />
      </div>
    </div>
  );
}
