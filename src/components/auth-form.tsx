"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IndianRupee, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthFormProps = {
  mode: "login" | "register";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isLogin = mode === "login";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Connect this form with ADK server login/register endpoint
    console.log("Form submitted. Implement ADK server connection here.");
    // On successful authentication, navigate to dashboard
    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <div className="relative w-full max-w-sm overflow-hidden rounded-[2.5rem] border-[10px] border-gray-800 bg-background shadow-2xl">
      <div className="absolute left-1/2 top-2 h-4 w-28 -translate-x-1/2 rounded-full bg-gray-800"></div>
        <div className="flex h-[80vh] flex-col">
            <header className="p-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/">
                        <ArrowLeft />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
            </header>
            <div className="flex flex-grow flex-col items-center justify-center p-6">
                <Card className="w-full border-none shadow-none">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/20 p-4 w-fit">
                            <IndianRupee className="h-10 w-10 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-3xl">{isLogin ? "Welcome Back!" : "Create Account"}</CardTitle>
                        <CardDescription>{isLogin ? "Log in to manage your finances." : "Sign up to start tracking your expenses."}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Your Name" required />
                                </div>
                            )}
                             <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="you@example.com" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full font-bold mt-4">
                                {isLogin ? "Login" : "Register"}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                         <p className="text-sm text-muted-foreground">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                            <Link href={isLogin ? "/register" : "/login"} className="font-semibold text-primary hover:underline">
                                {isLogin ? "Register" : "Login"}
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
      </div>
    </main>
  );
}
