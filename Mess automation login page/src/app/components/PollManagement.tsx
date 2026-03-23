import { useState } from 'react';
import { Plus, Play, Square, Eye, EyeOff, BarChart3 } from 'lucide-react';

interface Poll {
  id: string;
  title: string;
  description: string;
  options: string[];
  startDate: string;
  endDate: string;
  status: 'active' | 'ended' | 'scheduled';
  resultsPublic: boolean;
  votes?: { [option: string]: number };
}

export function PollManagement() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: '1',
      title: 'Preferred Breakfast Time',
      description: 'Help us decide the best breakfast timing for students',
      options: ['7:00 AM - 8:00 AM', '8:00 AM - 9:00 AM', '9:00 AM - 10:00 AM'],
      startDate: '2026-01-15',
      endDate: '2026-01-25',
      status: 'active',
      resultsPublic: true,
      votes: { '7:00 AM - 8:00 AM': 89, '8:00 AM - 9:00 AM': 120, '9:00 AM - 10:00 AM': 36 },
    },
    {
      id: '2',
      title: 'Weekend Special Menu',
      description: 'Vote for your favorite cuisine for weekend specials',
      options: ['North Indian', 'South Indian', 'Continental', 'Chinese'],
      startDate: '2026-01-10',
      endDate: '2026-01-20',
      status: 'ended',
      resultsPublic: true,
      votes: { 'North Indian': 145, 'South Indian': 98, 'Continental': 69, 'Chinese': 0 },
    },
    {
      id: '3',
      title: 'New Extra Item',
      description: 'Should we add smoothies to the extra items menu?',
      options: ['Yes', 'No'],
      startDate: '2026-01-28',
      endDate: '2026-02-05',
      status: 'scheduled',
      resultsPublic: false,
    },
  ]);

  const toggleResultsVisibility = (pollId: string) => {
    setPolls((prev) =>
      prev.map((poll) =>
        poll.id === pollId ? { ...poll, resultsPublic: !poll.resultsPublic } : poll
      )
    );
  };

  const endPoll = (pollId: string) => {
    setPolls((prev) =>
      prev.map((poll) => (poll.id === pollId ? { ...poll, status: 'ended' as const } : poll))
    );
  };

  const getStatusColor = (status: Poll['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-600';
      case 'ended':
        return 'bg-gray-100 text-gray-800 border-gray-600';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-600';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Poll Management</h2>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800"
        >
          <Plus className="w-4 h-4" />
          Create New Poll
        </button>
      </div>

      {/* Create Poll Form */}
      {showCreateForm && (
        <div className="border-2 border-black p-6">
          <h3 className="text-lg font-bold mb-4">Create New Poll</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-2">Poll Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 border-2 border-black focus:outline-none"
                placeholder="Enter poll title"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Description</label>
              <textarea
                className="w-full px-3 py-2 border-2 border-black focus:outline-none"
                rows={3}
                placeholder="Enter poll description"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Options (one per line)</label>
              <textarea
                className="w-full px-3 py-2 border-2 border-black focus:outline-none"
                rows={4}
                placeholder="Option 1&#10;Option 2&#10;Option 3"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2">Start Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border-2 border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">End Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border-2 border-black focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="public-results" className="w-5 h-5" />
              <label htmlFor="public-results" className="text-sm">
                Make results public to students
              </label>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button className="px-6 py-2 bg-black text-white hover:bg-gray-800">
                Create Poll
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2 border-2 border-black hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Polls List */}
      <div className="space-y-4">
        <div className="flex gap-4 text-sm">
          <span className="px-3 py-1 bg-green-100 border border-green-600">
            Active: {polls.filter((p) => p.status === 'active').length}
          </span>
          <span className="px-3 py-1 bg-blue-100 border border-blue-600">
            Scheduled: {polls.filter((p) => p.status === 'scheduled').length}
          </span>
          <span className="px-3 py-1 bg-gray-100 border border-gray-600">
            Ended: {polls.filter((p) => p.status === 'ended').length}
          </span>
        </div>

        {polls.map((poll) => (
          <div key={poll.id} className="border-2 border-black p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold">{poll.title}</h3>
                  <span className={`text-xs px-2 py-1 border ${getStatusColor(poll.status)}`}>
                    {poll.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{poll.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>
                    Start: {new Date(poll.startDate).toLocaleDateString()}
                  </span>
                  <span>•</span>
                  <span>
                    End: {new Date(poll.endDate).toLocaleDateString()}
                  </span>
                  {poll.votes && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <BarChart3 className="w-4 h-4" />
                        {Object.values(poll.votes).reduce((a, b) => a + b, 0)} votes
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Poll Options */}
            {poll.votes && (
              <div className="space-y-2 mb-4">
                {poll.options.map((option) => {
                  const votes = poll.votes![option] || 0;
                  const total = Object.values(poll.votes!).reduce((a, b) => a + b, 0);
                  const percentage = total > 0 ? Math.round((votes / total) * 100) : 0;
                  
                  return (
                    <div key={option}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{option}</span>
                        <span className="text-sm text-gray-600">
                          {votes} votes ({percentage}%)
                        </span>
                      </div>
                      <div className="h-4 bg-gray-200 border border-black">
                        <div
                          className="h-full bg-black transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {!poll.votes && (
              <div className="mb-4 p-4 bg-gray-50 border border-gray-300">
                <p className="text-sm text-gray-600">
                  Options: {poll.options.join(', ')}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-200">
              {poll.status === 'active' && (
                <button
                  onClick={() => endPoll(poll.id)}
                  className="flex items-center gap-2 px-3 py-2 border-2 border-black hover:bg-gray-100 text-sm"
                >
                  <Square className="w-4 h-4" />
                  End Poll
                </button>
              )}
              
              <button
                onClick={() => toggleResultsVisibility(poll.id)}
                className="flex items-center gap-2 px-3 py-2 border-2 border-black hover:bg-gray-100 text-sm"
              >
                {poll.resultsPublic ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Hide Results
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Show Results
                  </>
                )}
              </button>

              {poll.status === 'scheduled' && (
                <button className="flex items-center gap-2 px-3 py-2 bg-black text-white text-sm">
                  <Play className="w-4 h-4" />
                  Start Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
