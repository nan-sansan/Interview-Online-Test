"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/userStore";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User } from "@/types/User";
import { useUserRepo } from "@/hooks/useUserRepo";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { name, login } = useAuthStore();
  const form = useForm<User>({
    defaultValues: { name: "", email: "" },
    mode: "onChange",
  });
  const userRepo = useUserRepo();

  useEffect(() => {
    if (name) {
      router.push("/");
    }
  }, [name, router]);

  const onSubmit = async (values: User) => {
    console.log(values);
    const { total } = await userRepo.query({
      equal: { name: values.name, email: values.email },
      page: 0,
      pageSize: 10,
    });

    if (total > 0) {
      login(values.name);
      toast.success("登入成功");
    } else {
      toast.error("登入失敗");
    }
  };
  return (
    <div className="flex w-full h-full items-center justify-center ">
      <div className="w-[500px] h-[300px] bg-white/60 mx-auto flex flex-col gap-3 p-[20px] rounded-md shadow-xs ">
        <h1 className="text-2xl font-bold">登入</h1>
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                rules={{
                  required: "請輸入名稱",
                  pattern: {
                    value: /^[A-Za-z0-9_]+$/,
                    message: "只能輸入英文、數字或底線",
                  },
                }}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>帳號名稱</FormLabel>
                    <FormControl>
                      <Input placeholder="exampleAccount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                rules={{
                  required: "請輸入名稱",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "請輸入有效的電子郵件地址",
                  },
                }}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>電子郵件</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button className="w-20" type="submit">
                  送出
                </Button>
              </div>
            </form>
          </Form>
        </>
      </div>
    </div>
  );
}
