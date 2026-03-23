import { Calendar, IndianRupee, ShoppingBag } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'charge' | 'extra' | 'payment';
}

export function ViewDues() {
  // Mock transaction data
  const transactions: Transaction[] = [
    { id: '1', date: '2026-01-01', description: 'Monthly Mess Charge - January', amount: 4500, type: 'charge' },
    { id: '2', date: '2026-01-05', description: 'Extra: Paneer Curry', amount: 50, type: 'extra' },
    { id: '3', date: '2026-01-07', description: 'Extra: Chicken Curry', amount: 80, type: 'extra' },
    { id: '4', date: '2026-01-10', description: 'Payment Received', amount: -4500, type: 'payment' },
    { id: '5', date: '2026-01-12', description: 'Extra: Ice Cream x2', amount: 50, type: 'extra' },
    { id: '6', date: '2026-01-15', description: 'Extra: Cold Drink x3', amount: 60, type: 'extra' },
    { id: '7', date: '2026-01-18', description: 'Extra: Paneer Curry x2', amount: 100, type: 'extra' },
    { id: '8', date: '2026-01-20', description: 'Extra: Juice', amount: 30, type: 'extra' },
    { id: '9', date: '2026-01-21', description: 'Extra: Egg Curry', amount: 30, type: 'extra' },
  ];

  const summary = {
    monthlyCharge: 4500,
    totalExtras: 450,
    totalAmount: 4950,
    paidAmount: 4500
  };

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
        <h2 className="text-2xl font-bold text-gray-800">View Dues & Transactions</h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-600">Monthly Charge</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">₹{summary.monthlyCharge}</p>
        </div>

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
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                transaction.type === 'payment'
                  ? 'bg-green-50 border-green-200'
                  : transaction.type === 'charge'
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-orange-50 border-orange-200'
              }`}
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{transaction.description}</p>
                <p className="text-sm text-gray-600">{formatDate(transaction.date)}</p>
              </div>
              <div className="text-right">
                <p
                  className={`text-lg font-bold ${
                    transaction.type === 'payment'
                      ? 'text-green-600'
                      : transaction.type === 'charge'
                      ? 'text-blue-600'
                      : 'text-orange-600'
                  }`}
                >
                  {transaction.type === 'payment' ? '' : '+'}₹{Math.abs(transaction.amount)}
                </p>
                <p className="text-xs text-gray-500">
                  {transaction.type === 'payment' ? 'Paid' : transaction.type === 'charge' ? 'Charge' : 'Extra'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Payment Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 border-b border-gray-200">
            <span className="text-gray-700">Total Amount Due:</span>
            <span className="font-bold text-lg text-gray-800">₹{summary.totalAmount}</span>
          </div>
          <div className="flex justify-between items-center p-3 border-b border-gray-200">
            <span className="text-gray-700">Amount Paid:</span>
            <span className="font-bold text-lg text-green-600">₹{summary.paidAmount}</span>
          </div>
        </div>
        <button className="w-full mt-6 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
          Pay Now
        </button>
      </div>
    </div>
  );
}