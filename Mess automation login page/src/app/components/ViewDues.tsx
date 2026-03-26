import { useState, useEffect } from 'react';
import { Calendar, IndianRupee, ShoppingBag } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'charge' | 'extra' | 'payment';
}

export function ViewDues() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState({
    totalExtras: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    const fetchExtras = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await fetch('http://localhost:5000/api/extras/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const mapped: Transaction[] = (data.history || []).map((p: any) => ({
            id: String(p.id),
            date: p.createdAt,
            description: `${p.ExtraItem?.name || 'Extra Item'} × ${p.quantity}`,
            amount: parseFloat(p.totalPrice),
            type: 'extra' as const
          }));
          setTransactions(mapped);
          setSummary({
            totalExtras: data.totalAmount || 0,
            totalAmount: data.totalAmount || 0,
          });
        }
      } catch (err) {
        console.error('Failed to fetch dues', err);
      }
    };
    fetchExtras();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800">View Dues &amp; Transactions</h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-orange-100 p-3 rounded-full">
              <ShoppingBag className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-600">Extras Purchased</h3>
          </div>
          <p className="text-3xl font-bold text-orange-600">₹{summary.totalExtras}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gray-100 p-3 rounded-full">
              <IndianRupee className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="font-semibold text-gray-600">Total Amount</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">₹{summary.totalAmount}</p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold mb-4 pb-3 border-b border-gray-200 text-gray-800">Transaction History</h3>
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No transactions yet</p>
          ) : (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-orange-50 border-orange-200"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{transaction.description}</p>
                  <p className="text-sm text-gray-600">{formatDate(transaction.date)}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-orange-600">
                    +₹{Math.abs(transaction.amount)}
                  </p>
                  <p className="text-xs text-gray-500">Extra</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}