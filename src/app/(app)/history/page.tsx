import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Fetch receipt history from ADK server
const getReceiptHistory = async () => {
  // This is placeholder data
  return [
    { id: 1, date: '2024-07-20', vendor: 'Reliance Fresh', amount: 1250.50, category: 'Groceries' },
    { id: 2, date: '2024-07-20', vendor: 'Indian Oil', amount: 2000.00, category: 'Fuel' },
    { id: 3, date: '2024-07-19', vendor: 'Swiggy', amount: 450.00, category: 'Food' },
    { id: 4, date: '2024-07-18', vendor: 'Blinkit', amount: 800.75, category: 'Groceries' },
    { id: 5, date: '2024-07-17', vendor: 'Amazon', amount: 3500.00, category: 'Shopping' },
  ];
};

export default async function HistoryPage() {
  const history = await getReceiptHistory();

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
                  <p className="font-bold text-lg text-primary">₹{item.amount.toFixed(2)}</p>
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
