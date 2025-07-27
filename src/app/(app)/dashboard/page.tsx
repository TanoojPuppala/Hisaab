import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IndianRupee, Lightbulb, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Fetch dashboard data from ADK /summary endpoint
const getDashboardData = async () => {
    // This is placeholder data.
    return {
      budget: {
        spent: 1250.75,
        total: 5000,
      },
      recentActivity: [
        { id: 1, vendor: 'Starbucks', amount: 350.00, type: 'Food', date: 'Today' },
        { id: 2, vendor: 'Uber', amount: 150.50, type: 'Travel', date: 'Today' },
        { id: 3, vendor: 'Zomato', amount: 550.00, type: 'Food', date: 'Yesterday' },
      ],
      quickTip: "Link your bank account to automatically track recurring expenses and save time!",
    };
};

export default async function DashboardPage() {
    const data = await getDashboardData();
    const budgetProgress = (data.budget.spent / data.budget.total) * 100;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-accent" />
            Budget Summary
          </CardTitle>
          <CardDescription>Your spending overview for this month.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
             <div className="text-center">
              <p className="text-sm text-muted-foreground">Amount Spent</p>
              <p className="font-headline text-4xl font-bold">
                ₹{data.budget.spent.toLocaleString('en-IN')}
              </p>
              <p className="text-sm text-muted-foreground">
                out of ₹{data.budget.total.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary">
                <div className="absolute h-full bg-primary transition-all" style={{width: `${budgetProgress}%`}}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {data.recentActivity.map(activity => (
              <li key={activity.id} className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>{activity.vendor.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{activity.vendor}</p>
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                </div>
                 <div className="text-right">
                    <p className="font-bold">₹{activity.amount.toFixed(2)}</p>
                    <Badge variant="outline">{activity.type}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-primary/10 border-primary/20">
        <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-primary"/>
                Quick Tip
            </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{data.quickTip}</p>
        </CardContent>
      </Card>
    </div>
  );
}
