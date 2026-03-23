import { useState } from 'react';
import { Check, X, Calendar, User } from 'lucide-react';

interface RebateRequest {
  id: string;
  studentId: string;
  studentName: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
}

export function RebateRequests() {
  const [requests, setRequests] = useState<RebateRequest[]>([
    {
      id: '1',
      studentId: 'ST2301',
      studentName: 'Rahul Kumar',
      startDate: '2026-01-25',
      endDate: '2026-01-30',
      reason: 'Going home for family function',
      status: 'pending',
      requestDate: '2026-01-20',
    },
    {
      id: '2',
      studentId: 'ST2145',
      studentName: 'Priya Singh',
      startDate: '2026-01-22',
      endDate: '2026-01-24',
      reason: 'Medical checkup in hometown',
      status: 'pending',
      requestDate: '2026-01-19',
    },
    {
      id: '3',
      studentId: 'ST2089',
      studentName: 'Amit Sharma',
      startDate: '2026-02-01',
      endDate: '2026-02-05',
      reason: 'Conference attendance',
      status: 'pending',
      requestDate: '2026-01-18',
    },
  ]);

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: action } : req))
    );
  };

  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const processedRequests = requests.filter((r) => r.status !== 'pending');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Rebate Requests</h2>
        <div className="flex gap-4 text-sm">
          <span className="px-3 py-1 bg-yellow-100 border border-yellow-600">
            Pending: {pendingRequests.length}
          </span>
          <span className="px-3 py-1 bg-green-100 border border-green-600">
            Processed: {processedRequests.length}
          </span>
        </div>
      </div>

      {/* Pending Requests */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Pending Requests</h3>
        {pendingRequests.length === 0 ? (
          <div className="border-2 border-gray-300 p-8 text-center text-gray-500">
            No pending requests
          </div>
        ) : (
          pendingRequests.map((request) => (
            <div key={request.id} className="border-2 border-black p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-5 h-5" />
                    <h4 className="font-bold">{request.studentName}</h4>
                    <span className="text-sm text-gray-600">({request.studentId})</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(request.startDate).toLocaleDateString()} -{' '}
                      {new Date(request.endDate).toLocaleDateString()}
                    </span>
                    <span className="ml-2 text-xs">
                      ({Math.ceil((new Date(request.endDate).getTime() - new Date(request.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} days)
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-1">Reason:</p>
                    <p className="text-sm text-gray-700">{request.reason}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Requested on: {new Date(request.requestDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleAction(request.id, 'approved')}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Approve
                </button>
                <button
                  onClick={() => handleAction(request.id, 'rejected')}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-black hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Processed Requests */}
      {processedRequests.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Recently Processed</h3>
          {processedRequests.map((request) => (
            <div key={request.id} className="border border-gray-300 p-6 opacity-75">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold">{request.studentName}</h4>
                    <span className="text-sm text-gray-600">({request.studentId})</span>
                    <span
                      className={`text-xs px-2 py-1 ${
                        request.status === 'approved'
                          ? 'bg-green-100 text-green-800 border border-green-600'
                          : 'bg-red-100 text-red-800 border border-red-600'
                      }`}
                    >
                      {request.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(request.startDate).toLocaleDateString()} -{' '}
                    {new Date(request.endDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
