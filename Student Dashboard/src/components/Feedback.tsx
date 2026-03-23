import { useState } from 'react';
import { MessageSquare, Star, Send } from 'lucide-react';

interface FeedbackItem {
  id: string;
  date: string;
  category: string;
  rating: number;
  comment: string;
  status: 'pending' | 'reviewed' | 'resolved';
}

export function Feedback() {
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('food-quality');
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  // Mock previous feedback
  const previousFeedback: FeedbackItem[] = [
    {
      id: '1',
      date: '2026-01-18',
      category: 'Food Quality',
      rating: 4,
      comment: 'The paneer curry was excellent today!',
      status: 'reviewed'
    },
    {
      id: '2',
      date: '2026-01-15',
      category: 'Service',
      rating: 3,
      comment: 'Long waiting time during lunch hours.',
      status: 'resolved'
    },
    {
      id: '3',
      date: '2026-01-10',
      category: 'Cleanliness',
      rating: 5,
      comment: 'Dining hall is very clean and well-maintained.',
      status: 'reviewed'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please provide a rating');
      return;
    }
    if (!comment.trim()) {
      alert('Please write your feedback');
      return;
    }
    alert('Feedback submitted successfully! Thank you for your input.');
    setRating(0);
    setCategory('food-quality');
    setComment('');
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
        <h2 className="text-2xl font-bold text-gray-800">Feedback & Suggestions</h2>
        <p className="text-sm mt-2 text-gray-600">Help us improve your mess experience</p>
      </div>

      {/* Feedback Form */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
          <MessageSquare className="w-6 h-6" />
          Submit New Feedback
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            >
              <option value="food-quality">Food Quality</option>
              <option value="service">Service</option>
              <option value="cleanliness">Cleanliness</option>
              <option value="menu-variety">Menu Variety</option>
              <option value="staff-behavior">Staff Behavior</option>
              <option value="timing">Timing</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= (hoveredStar || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    } transition-colors`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-3 text-lg font-semibold text-gray-700">
                  {rating === 1 && '⭐ Poor'}
                  {rating === 2 && '⭐⭐ Fair'}
                  {rating === 3 && '⭐⭐⭐ Good'}
                  {rating === 4 && '⭐⭐⭐⭐ Very Good'}
                  {rating === 5 && '⭐⭐⭐⭐⭐ Excellent'}
                </span>
              )}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Your Feedback</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience, suggestions, or concerns..."
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Submit Feedback
          </button>
        </form>
      </div>

      {/* Previous Feedback */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Your Previous Feedback</h3>
        
        {previousFeedback.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No previous feedback</p>
        ) : (
          <div className="space-y-4">
            {previousFeedback.map((feedback) => (
              <div key={feedback.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold text-gray-800">{feedback.category}</h4>
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-semibold ${
                          feedback.status === 'resolved'
                            ? 'bg-green-100 text-green-800'
                            : feedback.status === 'reviewed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{formatDate(feedback.date)}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(feedback.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{feedback.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold mb-2 text-blue-900">How We Use Your Feedback</h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>All feedback is reviewed by the mess management team</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Your suggestions help us improve menu and services</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Critical issues are addressed within 24-48 hours</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Anonymous feedback option available for sensitive concerns</span>
          </li>
        </ul>
      </div>
    </div>
  );
}