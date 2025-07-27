"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Mail, Phone } from "lucide-react";

// Placeholder user data
const user = {
  name: "Alex Doe",
  email: "alex.doe@example.com",
  phone: "+1 234 567 890",
  initials: "AD",
};

export default function ProfilePage() {
  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="text-center">
        <h2 className="font-headline text-xl font-bold">User Profile</h2>
        <p className="text-muted-foreground">Your personal information.</p>
      </div>

      <Card>
        <CardHeader className="items-center text-center">
          <Avatar className="w-24 h-24 mb-4" data-ai-hint="person portrait">
            <AvatarImage src="https://placehold.co/100x100.png" alt={user.name} />
            <AvatarFallback className="text-3xl">{user.initials}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center gap-4 p-3 rounded-md bg-secondary">
            <User className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold">{user.name}</span>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-md bg-secondary">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-md bg-secondary">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <span>{user.phone}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
