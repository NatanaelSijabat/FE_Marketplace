'use client'
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/input-password";
import { authSchema } from "@/schema/login.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { notifError, notifSucces } from "@/lib/toast";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  const onSubmit = async (value: z.infer<typeof authSchema>) => {
    await signIn("credentials", {
      username: value.username,
      password: value.password,
      redirect: false,
    }).then((res) => {
      if (res?.status === 200) {
        router.push("/dashboard");
        notifSucces("Login successful",`Welcome back, ${value.username}!`)
      } else {
        notifError(res?.error ?? "Login failed. Please try again.")
      }
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 items-center justify-center p-6",
        className
      )}
      {...props}
    >
      <Card className="w-full max-w-md shadow-md">
        <CardContent className="">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="text-center">
                <h1 className="text-2xl font-bold">Sign in</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Enter your credentials to access the e-commerce dashboard
                </p>
              </div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter username"
                        {...field}
                        className="py-2 px-3 border rounded-md focus:ring-2 focus:ring-primary"
                        autoComplete="off"
                        value="emilys"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Enter password"
                        {...field}
                        autoComplete="off"
                        value="emilyspass"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Sign in
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className=" bg-blue-50 border border-blue-200 text-sm text-gray-700 rounded-md p-4 w-full">
            <p className="font-semibold text-blue-700">Demo Credentials:</p>
            <p className="text-blue-600">Username: <span className="font-mono ">emilys</span></p>
            <p className="text-blue-600">Password: <span className="font-mono">emilyspass</span></p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
