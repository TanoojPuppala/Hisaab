"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Receipt = {
  id: number;
  date: string;
  vendor: string;
  amount: number;
  currency?: string;
  category: string;
};

const getReceiptHistory = (): Receipt[] => {
  // This is placeholder data
  return [
    { id: 1, date: '2024-07-20', vendor: 'Reliance Fresh', amount: 1250.50, category: 'Groceries', currency: 'INR' },
    { id: 2, date: '2024-07-20', vendor: 'Indian Oil', amount: 2000.00, category: 'Fuel', currency: 'INR' },
    { id: 3, date: '2024-07-19', vendor: 'Swiggy', amount: 450.00, category: 'Food', currency: 'INR' },
    { id: 4, date: '2024-07-18', vendor: 'Blinkit', amount: 800.75, category: 'Groceries', currency: 'INR' },
    { id: 5, date: '2024-07-17', vendor: 'Amazon', amount: 3500.00, category: 'Shopping', currency: 'INR' },
  ];
};

export default function HistoryPage() {
  const [history, setHistory] = useState<Receipt[]>([]);
  const [locale, setLocale] = useState('en-IN');
  const [currency, setCurrency] = useState('INR');
  
  useEffect(() => {
    const userLocale = navigator.language;
    setLocale(userLocale);
    if (userLocale === 'en-US') {
      setCurrency('USD');
    } else {
      setCurrency('INR');
    }

    const placeholderHistory = getReceiptHistory();
    const storedHistory = JSON.parse(localStorage.getItem('receiptHistory') || '[]');
    const combinedHistory = [...storedHistory, ...placeholderHistory];
    
    // Simple deduplication based on a composite key (vendor+date+amount)
    const uniqueHistory = Array.from(new Map(combinedHistory.map(item =>
      [`${item.vendor}-${item.date}-${item.amount}`, item]
    )).values());
    
    // Sort by date, most recent first
    uniqueHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setHistory(uniqueHistory);
  }, []);
  
  const formatCurrency = (amount: number, currencyCode?: string) => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode || currency }).format(amount);
  }

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="text-center">
        <h2 className="font-headline text-xl font-bold">Receipt History</h2>
        <p className="text-muted-foreground">A log of all your expenses.</p>
      </div>

      {history.length > 0 ? (
        <div className="space-y-4">
          {history.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex-1 space-y-1">
                  <p className="font-bold text-base">{item.vendor}</p>
                  <p className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-bold text-lg text-primary">{formatCurrency(item.amount, item.currency)}</p>
                  <Badge variant="secondary">{item.category}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
            <CardContent className="p-10 text-center">
                <p className="text-muted-foreground">No receipts found. Upload one to get started!</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
