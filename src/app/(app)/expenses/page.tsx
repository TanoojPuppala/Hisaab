"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

type Expense = {
  id: number;
  description: string;
  amount: number;
};

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const { toast } = useToast();
  const [locale, setLocale] = useState('en-IN');
  const [currency, setCurrency] = useState('INR');
  const [currencySymbol, setCurrencySymbol] = useState('₹');

  useEffect(() => {
    const userLocale = navigator.language;
    setLocale(userLocale);
    if (userLocale === 'en-US') {
      setCurrency('USD');
      setCurrencySymbol('$');
    } else {
      setCurrency('INR');
      setCurrencySymbol('₹');
    }

    const storedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    if (storedExpenses) {
      setExpenses(storedExpenses);
    }
  }, []);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency, minimumFractionDigits: 2 }).format(amount);
  }

  const saveExpenses = (updatedExpenses: Expense[]) => {
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    setExpenses(updatedExpenses);
  };

  const handleAddExpense = () => {
    if (description && amount) {
      const newExpense = { id: Date.now(), description, amount: parseFloat(amount) };
      const updatedExpenses = [...expenses, newExpense];
      saveExpenses(updatedExpenses);
      setDescription('');
      setAmount('');
      toast({
        title: "Expense Added",
        description: `${description} for ${formatCurrency(parseFloat(amount))} has been added.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields.",
      });
    }
  };

  const handleDeleteExpense = (id: number) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    saveExpenses(updatedExpenses);
    toast({
      title: "Expense Removed",
      description: "The selected expense has been removed.",
    });
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="text-center">
        <h2 className="font-headline text-xl font-bold">Expense Tracker</h2>
        <p className="text-muted-foreground">Keep a record of your spending.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
          <CardDescription>Enter the details of your expense below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="e.g., Coffee"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount ({currencySymbol})</Label>
            <Input
              id="amount"
              type="number"
              placeholder="e.g., 150"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleAddExpense}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Expense
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Expenses</CardTitle>
          <CardDescription>A list of your recent expenses.</CardDescription>
        </CardHeader>
        <CardContent>
          {expenses.length > 0 ? (
            <ul className="space-y-2">
              {expenses.map((expense) => (
                <li key={expense.id} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary">
                  <div>
                    <p className="font-semibold">{expense.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-bold">{formatCurrency(expense.amount)}</p>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteExpense(expense.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center">No expenses added yet.</p>
          )}
        </CardContent>
        {expenses.length > 0 && (
          <div className="border-t p-4 flex justify-between items-center font-bold">
            <p>Total Expenses</p>
            <p>{formatCurrency(totalExpenses)}</p>
          </div>
        )}
      </Card>
    </div>
  );
}
