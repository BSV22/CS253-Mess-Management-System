import { useState } from 'react';
import { Plus, Edit, Save, X } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
}

interface DayMenu {
  day: string;
  date: string;
  breakfast: string[];
  lunch: string[];
  dinner: string[];
}

export function MenuManagement() {
  const [activeTab, setActiveTab] = useState<'daily' | 'prebooking' | 'extras' | 'bdmr'>('daily');
  const [editingDay, setEditingDay] = useState<string | null>(null);

  const [weekMenu, setWeekMenu] = useState<DayMenu[]>([
    {
      day: 'Monday',
      date: '2026-01-26',
      breakfast: ['Poha', 'Bread & Butter', 'Tea/Coffee'],
      lunch: ['Dal', 'Rice', 'Roti', 'Mixed Veg', 'Salad'],
      dinner: ['Rajma', 'Rice', 'Roti', 'Raita', 'Pickle'],
    },
    {
      day: 'Tuesday',
      date: '2026-01-27',
      breakfast: ['Upma', 'Banana', 'Tea/Coffee'],
      lunch: ['Chole', 'Rice', 'Roti', 'Aloo Sabzi', 'Salad'],
      dinner: ['Dal Makhani', 'Rice', 'Roti', 'Paneer', 'Raita'],
    },
    {
      day: 'Wednesday',
      date: '2026-01-28',
      breakfast: ['Aloo Paratha', 'Curd', 'Tea/Coffee'],
      lunch: ['Sambar', 'Rice', 'Roti', 'Cabbage', 'Salad'],
      dinner: ['Kadhi', 'Rice', 'Roti', 'Bhindi', 'Pickle'],
    },
  ]);

  const [extraItems, setExtraItems] = useState([
    { id: '1', name: 'Ice Cream', price: 50, available: true },
    { id: '2', name: 'Cold Drink', price: 30, available: true },
    { id: '3', name: 'Fresh Juice', price: 60, available: true },
    { id: '4', name: 'Chips', price: 20, available: false },
  ]);

  const renderDailyMenu = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Weekly Menu</h3>
        <button className="flex items-center gap-2 px-4 py-2 border-2 border-black hover:bg-gray-100">
          <Plus className="w-4 h-4" />
          Add New Day
        </button>
      </div>

      {weekMenu.map((menu) => (
        <div key={menu.day} className="border-2 border-black p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold">{menu.day}</h4>
              <p className="text-sm text-gray-600">
                {new Date(menu.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              {editingDay === menu.day ? (
                <>
                  <button
                    onClick={() => setEditingDay(null)}
                    className="flex items-center gap-2 px-3 py-2 bg-black text-white"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={() => setEditingDay(null)}
                    className="flex items-center gap-2 px-3 py-2 border-2 border-black"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditingDay(menu.day)}
                  className="flex items-center gap-2 px-3 py-2 border-2 border-black hover:bg-gray-100"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['breakfast', 'lunch', 'dinner'] as const).map((meal) => (
              <div key={meal} className="border border-black p-4">
                <h5 className="font-bold mb-2 capitalize">{meal}</h5>
                {editingDay === menu.day ? (
                  <textarea
                    className="w-full p-2 border border-gray-300 text-sm"
                    rows={4}
                    defaultValue={menu[meal].join('\n')}
                  />
                ) : (
                  <ul className="space-y-1 text-sm">
                    {menu[meal].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-black rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderExtrasManagement = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Manage Extra Items</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white">
          <Plus className="w-4 h-4" />
          Add New Item
        </button>
      </div>

      <div className="border-2 border-black">
        <table className="w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-4 py-3 text-left">Item Name</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {extraItems.map((item, idx) => (
              <tr key={item.id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-3 font-medium">{item.name}</td>
                <td className="px-4 py-3">₹{item.price}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 border ${
                      item.available
                        ? 'bg-green-100 text-green-800 border-green-600'
                        : 'bg-red-100 text-red-800 border-red-600'
                    }`}
                  >
                    {item.available ? 'AVAILABLE' : 'OUT OF STOCK'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="text-sm hover:underline">Edit</button>
                    <button
                      onClick={() => {
                        setExtraItems((prev) =>
                          prev.map((i) =>
                            i.id === item.id ? { ...i, available: !i.available } : i
                          )
                        );
                      }}
                      className="text-sm hover:underline"
                    >
                      Toggle Status
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPreBooking = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Pre-booking Management</h3>
      <div className="border-2 border-black p-6">
        <p className="text-sm text-gray-600 mb-4">
          Enable/disable pre-booking for special items
        </p>
        
        <div className="space-y-3">
          {['Weekend Special', 'Festival Menu', 'Birthday Cake'].map((item) => (
            <div key={item} className="flex items-center justify-between p-4 border border-gray-300">
              <span className="font-medium">{item}</span>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-sm">Enable Pre-booking</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBDMR = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">BDMR (Breakfast, Dinner, Meal Records)</h3>
      <div className="border-2 border-black p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2">Breakfast Timing</label>
            <div className="flex gap-2">
              <input type="time" className="flex-1 px-3 py-2 border-2 border-black" defaultValue="07:00" />
              <span className="px-3 py-2">to</span>
              <input type="time" className="flex-1 px-3 py-2 border-2 border-black" defaultValue="09:00" />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Lunch Timing</label>
            <div className="flex gap-2">
              <input type="time" className="flex-1 px-3 py-2 border-2 border-black" defaultValue="12:00" />
              <span className="px-3 py-2">to</span>
              <input type="time" className="flex-1 px-3 py-2 border-2 border-black" defaultValue="14:00" />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Dinner Timing</label>
            <div className="flex gap-2">
              <input type="time" className="flex-1 px-3 py-2 border-2 border-black" defaultValue="19:00" />
              <span className="px-3 py-2">to</span>
              <input type="time" className="flex-1 px-3 py-2 border-2 border-black" defaultValue="21:00" />
            </div>
          </div>
        </div>

        <button className="mt-6 px-6 py-2 bg-black text-white hover:bg-gray-800">
          Update Timings
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Menu Management</h2>

      {/* Tabs */}
      <div className="flex gap-2 border-b-2 border-black">
        {[
          { id: 'daily', label: 'Daily Menu' },
          { id: 'prebooking', label: 'Pre-booking' },
          { id: 'extras', label: 'Extra Items' },
          { id: 'bdmr', label: 'BDMR Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-black text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'daily' && renderDailyMenu()}
        {activeTab === 'extras' && renderExtrasManagement()}
        {activeTab === 'prebooking' && renderPreBooking()}
        {activeTab === 'bdmr' && renderBDMR()}
      </div>
    </div>
  );
}
