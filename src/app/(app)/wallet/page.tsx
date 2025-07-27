"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, PlusCircle, Trash2 } from "lucide-react";
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { useToast } from '@/hooks/use-toast';


type Voucher = {
  id: number;
  name: string;
  amount: number;
};

type Budget = {
  id: number;
  category: string;
  limit: number;
  dateRange: DateRange;
};

const initialVouchers: Voucher[] = [
    { id: 1, name: 'Amazon Pay Gift Card', amount: 500 },
    { id: 2, name: 'Flipkart Voucher', amount: 1000 },
];

const initialBudgets: Budget[] = [
    { id: 1, category: 'Groceries', limit: 8000, dateRange: { from: new Date(2024, 6, 1), to: new Date(2024, 6, 31) } },
    { id: 2, category: 'Entertainment', limit: 3000, dateRange: { from: new Date(2024, 6, 1), to: new Date(2024, 6, 31) } },
];

export default function WalletPage() {
    const { toast } = useToast();
    const [vouchers, setVouchers] = useState(initialVouchers);
    const [budgets, setBudgets] = useState(initialBudgets);
    
    // State for new voucher
    const [newVoucherName, setNewVoucherName] = useState('');
    const [newVoucherAmount, setNewVoucherAmount] = useState('');

    // State for new budget
    const [newBudgetCategory, setNewBudgetCategory] = useState('');
    const [newBudgetLimit, setNewBudgetLimit] = useState('');
    const [newBudgetDateRange, setNewBudgetDateRange] = useState<DateRange | undefined>({ from: new Date(), to: undefined });

    const handleAddVoucher = () => {
        if (!newVoucherName || !newVoucherAmount) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please fill in all voucher fields.' });
            return;
        }
        const newVoucher: Voucher = {
            id: Date.now(),
            name: newVoucherName,
            amount: parseFloat(newVoucherAmount)
        };
        setVouchers([...vouchers, newVoucher]);
        setNewVoucherName('');
        setNewVoucherAmount('');
    };
    
    const handleDeleteVoucher = (id: number) => {
        setVouchers(vouchers.filter(v => v.id !== id));
    };

    const handleAddBudget = () => {
        if (!newBudgetCategory || !newBudgetLimit || !newBudgetDateRange?.from) {
             toast({ variant: 'destructive', title: 'Error', description: 'Please fill in all budget fields.' });
            return;
        }
        const newBudget: Budget = {
            id: Date.now(),
            category: newBudgetCategory,
            limit: parseFloat(newBudgetLimit),
            dateRange: newBudgetDateRange,
        };
        setBudgets([...budgets, newBudget]);
        setNewBudgetCategory('');
        setNewBudgetLimit('');
        setNewBudgetDateRange({ from: new Date(), to: undefined });
    };

    const handleDeleteBudget = (id: number) => {
        setBudgets(budgets.filter(b => b.id !== id));
    };

    return (
        <div className="p-4 md:p-6">
            <div className="text-center mb-4">
                <h2 className="font-headline text-xl font-bold">Your Budget Space</h2>
                <p className="text-muted-foreground">Manage your funds and budgets.</p>
            </div>
            <Tabs defaultValue="budgets" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="budgets">Budget Categories</TabsTrigger>
                    <TabsTrigger value="wallet">Add to Wallet</TabsTrigger>
                </TabsList>
                
                <TabsContent value="budgets" className="mt-4 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Add New Category</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="category">Category Name</Label>
                                <Input id="category" placeholder="e.g., Shopping" value={newBudgetCategory} onChange={e => setNewBudgetCategory(e.target.value)} />
                            </div>
                             <div>
                                <Label htmlFor="limit">Budget Limit (₹)</Label>
                                <Input id="limit" type="number" placeholder="e.g., 5000" value={newBudgetLimit} onChange={e => setNewBudgetLimit(e.target.value)} />
                            </div>
                            <div>
                                <Label>Duration</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {newBudgetDateRange?.from ? (
                                        newBudgetDateRange.to ? (
                                            <>
                                            {format(newBudgetDateRange.from, "LLL dd, y")} - {format(newBudgetDateRange.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(newBudgetDateRange.from, "LLL dd, y")
                                        )
                                        ) : (
                                        <span>Pick a date range</span>
                                        )}
                                    </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={newBudgetDateRange?.from}
                                            selected={newBudgetDateRange}
                                            onSelect={setNewBudgetDateRange}
                                            numberOfMonths={1}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <Button className="w-full" onClick={handleAddBudget}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Budget
                            </Button>
                        </CardContent>
                    </Card>

                    {budgets.map(budget => (
                        <Card key={budget.id}>
                            <CardContent className="p-4 flex items-center">
                                <div className="flex-1">
                                    <p className="font-bold">{budget.category}</p>
                                    <p className="text-sm text-muted-foreground">Limit: ₹{budget.limit.toLocaleString()}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {budget.dateRange.from && format(budget.dateRange.from, "dd MMM")} - {budget.dateRange.to && format(budget.dateRange.to, "dd MMM, yyyy")}
                                    </p>
                                </div>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteBudget(budget.id)}>
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="wallet" className="mt-4 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Add New Voucher</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="voucherName">Voucher Name</Label>
                                <Input id="voucherName" placeholder="e.g., Amazon Pay" value={newVoucherName} onChange={e => setNewVoucherName(e.target.value)} />
                            </div>
                             <div>
                                <Label htmlFor="voucherAmount">Amount (₹)</Label>
                                <Input id="voucherAmount" type="number" placeholder="e.g., 500" value={newVoucherAmount} onChange={e => setNewVoucherAmount(e.target.value)} />
                            </div>
                            <Button className="w-full" onClick={handleAddVoucher}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Voucher
                            </Button>
                        </CardContent>
                    </Card>
                    {vouchers.map(voucher => (
                        <Card key={voucher.id} className="bg-gradient-to-tr from-yellow-300 to-amber-400">
                             <CardContent className="p-4 flex items-center text-yellow-900">
                                <div className="flex-1">
                                    <p className="font-bold">{voucher.name}</p>
                                    <p className="text-2xl font-headline font-bold">₹{voucher.amount.toLocaleString()}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="text-yellow-900/70 hover:text-yellow-900" onClick={() => handleDeleteVoucher(voucher.id)}>
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}
