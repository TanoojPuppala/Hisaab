"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Lightbulb, TrendingUp, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Receipt = {
  id: number;
  date: string;
  vendor: string;
  amount: number;
  currency?: string;
  category: string;
};

type Expense = {
  id: number;
  description: string;
  amount: number;
};

type Budget = {
  id: number;
  category: string;
  limit: number;
};

const getDashboardData = () => {
    // This is placeholder data.
    return {
      recentActivity: [
        { id: 1, vendor: 'Starbucks', amount: 350.00, type: 'Food', date: 'Today' },
        { id: 2, vendor: 'Uber', amount: 150.50, type: 'Travel', date: 'Today' },
        { id: 3, vendor: 'Zomato', amount: 550.00, type: 'Food', date: 'Yesterday' },
      ],
      quickTip: "Link your bank account to automatically track recurring expenses and save time!",
    };
};

export default function DashboardPage() {
    const [spent, setSpent] = useState(0);
    const [totalBudget, setTotalBudget] = useState(0);
    const [balance, setBalance] = useState(0);
    const [budgetProgress, setBudgetProgress] = useState(0);

    const data = getDashboardData();

    useEffect(() => {
        const storedReceipts: Receipt[] = JSON.parse(localStorage.getItem('receiptHistory') || '[]');
        const storedExpenses: Expense[] = JSON.parse(localStorage.getItem('expenses') || '[]');
        const storedBudgets: Budget[] = JSON.parse(localStorage.getItem('budgets') || '[]');
        
        const initialBudgets: Budget[] = [
            { id: 1, category: 'Groceries', limit: 8000 },
            { id: 2, category: 'Entertainment', limit: 3000 },
        ];
        
        const allBudgets = storedBudgets.length > 0 ? storedBudgets : initialBudgets;

        const totalReceiptsAmount = storedReceipts.reduce((total, receipt) => total + receipt.amount, 0);
        const totalExpensesAmount = storedExpenses.reduce((total, expense) => total + expense.amount, 0);
        const totalSpent = totalReceiptsAmount + totalExpensesAmount;

        const budgetTotal = allBudgets.reduce((total, budget) => total + budget.limit, 0);

        setSpent(totalSpent);
        setTotalBudget(budgetTotal > 0 ? budgetTotal : 5000); // fallback to 5000 if no budget is set
        setBalance((budgetTotal > 0 ? budgetTotal : 5000) - totalSpent);
        setBudgetProgress(budgetTotal > 0 ? (totalSpent / budgetTotal) * 100 : (totalSpent / 5000) * 100);

    }, []);

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
                ₹{spent.toLocaleString('en-IN')}
              </p>
              <p className="text-sm text-muted-foreground">
                out of ₹{totalBudget.toLocaleString('en-IN')}
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
              <CardTitle className="font-headline flex items-center gap-2">
                  <Wallet className="h-6 w-6 text-primary" />
                  Remaining Budget
              </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
              <p className="font-headline text-4xl font-bold">₹{balance.toLocaleString('en-IN')}</p>
              <p className="text-sm text-muted-foreground">This is your available balance.</p>
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
