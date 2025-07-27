"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, PlusCircle, Trash2 } from "lucide-react";
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';

// TODO: Use ADK wallet APIs to update voucher list or budgets

const initialVouchers = [
    { id: 1, name: 'Amazon Pay Gift Card', amount: 500 },
    { id: 2, name: 'Flipkart Voucher', amount: 1000 },
];

const initialBudgets = [
    { id: 1, category: 'Groceries', limit: 8000, dateRange: { from: new Date(2024, 6, 1), to: new Date(2024, 6, 31) } },
    { id: 2, category: 'Entertainment', limit: 3000, dateRange: { from: new Date(2024, 6, 1), to: new Date(2024, 6, 31) } },
];

export default function WalletPage() {
    const [vouchers, setVouchers] = useState(initialVouchers);
    const [budgets, setBudgets] = useState(initialBudgets);
    const [date, setDate] = useState<DateRange | undefined>({ from: new Date(), to: undefined, });

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
                                <Input id="category" placeholder="e.g., Shopping" />
                            </div>
                             <div>
                                <Label htmlFor="limit">Budget Limit (₹)</Label>
                                <Input id="limit" type="number" placeholder="e.g., 5000" />
                            </div>
                            <div>
                                <Label>Duration</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date?.from ? (
                                        date.to ? (
                                            <>
                                            {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(date.from, "LLL dd, y")
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
                                            defaultMonth={date?.from}
                                            selected={date}
                                            onSelect={setDate}
                                            numberOfMonths={1}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <Button className="w-full">
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
                                        {format(budget.dateRange.from, "dd MMM")} - {format(budget.dateRange.to, "dd MMM, yyyy")}
                                    </p>
                                </div>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
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
                                <Input id="voucherName" placeholder="e.g., Amazon Pay" />
                            </div>
                             <div>
                                <Label htmlFor="voucherAmount">Amount (₹)</Label>
                                <Input id="voucherAmount" type="number" placeholder="e.g., 500" />
                            </div>
                            <Button className="w-full">
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
                                <Button variant="ghost" size="icon" className="text-yellow-900/70 hover:text-yellow-900">
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
