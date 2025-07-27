"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Globe, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="text-center">
        <h2 className="font-headline text-xl font-bold">Settings</h2>
        <p className="text-muted-foreground">Manage your app preferences.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Control how you receive alerts.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications" className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <span>Push Notifications</span>
            </Label>
            <Switch id="push-notifications" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Language</CardTitle>
          <CardDescription>Choose your preferred language.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-between">
                 <Label htmlFor="language-select" className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    <span>Language</span>
                </Label>
                <p className="text-muted-foreground">English</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
