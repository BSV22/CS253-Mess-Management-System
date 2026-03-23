import { useState, useEffect } from 'react';
import { Coffee, UtensilsCrossed, Moon } from 'lucide-react';

export function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Mock data
  const todayMenu = {
    breakfast: [
      'Poha',
      'Sambar',
      'Idli (4 pcs)',
      'Tea/Coffee',
      'Banana'
    ],
    lunch: [
      'Roti (5 pcs)',
      'Rice',
      'Dal Tadka',
      'Mix Veg Curry',
      'Raita',
      'Pickle',
      'Salad'
    ],
    dinner: [
      'Roti (5 pcs)',
      'Rice',
      'Rajma Masala',
      'Aloo Gobi',
      'Curd',
      'Papad',
      'Sweet (Gulab Jamun)'
    ]
  };

  const bdmrValue = 2100; // BDMR is a single price value

  const billInfo = {
    monthlyCharge: 4500,
    extrasPurchased: 450,
    totalDue: 4950
  };

  return (
    <div className="space-y-6">
      {/* Campus Image Banner Placeholder - Add your P.K. Kelkar Hall image here */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-sm font-semibold">CAMPUS IMAGE PLACEHOLDER</span>
        </div>
        <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50">
          <h3 className="text-lg font-bold text-gray-800">P.K. Kelkar Hall</h3>
          <p className="text-sm text-gray-600">Indian Institute of Technology, Kanpur</p>
        </div>
      </div>

      {/* Date and Time */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{formatDate(currentTime)}</h2>
          <p className="text-xl text-gray-600">{formatTime(currentTime)}</p>
        </div>
      </div>

      {/* Today's Menu */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6 text-center pb-3 border-b-2 border-gray-800 text-gray-800">
          Today's Mess Menu
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Breakfast */}
          <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-yellow-50">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
              <div className="bg-yellow-200 p-3 rounded-full">
                <Coffee className="w-8 h-8 text-yellow-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Breakfast</h3>
            </div>
            <ul className="space-y-2">
              {todayMenu.breakfast.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 bg-gray-700 rounded-full"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lunch */}
          <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-orange-50">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
              <div className="bg-orange-200 p-3 rounded-full">
                <UtensilsCrossed className="w-8 h-8 text-orange-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Lunch</h3>
            </div>
            <ul className="space-y-2">
              {todayMenu.lunch.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 bg-gray-700 rounded-full"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dinner */}
          <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-blue-50">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
              <div className="bg-blue-200 p-3 rounded-full">
                <Moon className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Dinner</h3>
            </div>
            <ul className="space-y-2">
              {todayMenu.dinner.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 bg-gray-700 rounded-full"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* BDMR Info and Bill */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BDMR Value */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800 pb-3 border-b border-gray-200">
            Today's BDMR
          </h3>
          <div className="text-center py-8">
            <p className="text-sm text-gray-600 mb-2">Base Daily Mess Rate</p>
            <p className="text-5xl font-bold text-gray-800">₹{bdmrValue}</p>
          </div>
        </div>

        {/* Mess Bill */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800 pb-3 border-b border-gray-200">
            Mess Month Bill (Till Now)
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border-b border-gray-200">
              <span className="text-gray-700">Monthly Charge:</span>
              <span className="font-semibold text-gray-800">₹{billInfo.monthlyCharge}</span>
            </div>
            <div className="flex justify-between items-center p-3 border-b border-gray-200">
              <span className="text-gray-700">Extras Purchased:</span>
              <span className="font-semibold text-orange-600">₹{billInfo.extrasPurchased}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg mt-4">
              <span className="font-bold text-lg text-gray-800">Total Due:</span>
              <span className="font-bold text-2xl text-gray-800">₹{billInfo.totalDue}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}