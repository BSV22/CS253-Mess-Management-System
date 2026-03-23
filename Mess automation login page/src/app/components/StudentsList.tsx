import { useState } from 'react';
import { Search, Download } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  room: string;
  email: string;
  phone: string;
  messStatus: 'active' | 'inactive' | 'rebate';
  joinDate: string;
}

export function StudentsList() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'Rahul Kumar',
      rollNumber: 'ST2301',
      room: 'A-101',
      email: 'rahul@iitk.ac.in',
      phone: '+91 9876543210',
      messStatus: 'active',
      joinDate: '2023-07-15',
    },
    {
      id: '2',
      name: 'Priya Singh',
      rollNumber: 'ST2145',
      room: 'B-205',
      email: 'priya@iitk.ac.in',
      phone: '+91 9876543211',
      messStatus: 'rebate',
      joinDate: '2023-07-15',
    },
    {
      id: '3',
      name: 'Amit Sharma',
      rollNumber: 'ST2089',
      room: 'C-301',
      email: 'amit@iitk.ac.in',
      phone: '+91 9876543212',
      messStatus: 'active',
      joinDate: '2023-07-15',
    },
    {
      id: '4',
      name: 'Sneha Patel',
      rollNumber: 'ST2234',
      room: 'A-203',
      email: 'sneha@iitk.ac.in',
      phone: '+91 9876543213',
      messStatus: 'active',
      joinDate: '2023-07-15',
    },
    {
      id: '5',
      name: 'Vikram Reddy',
      rollNumber: 'ST2156',
      room: 'B-108',
      email: 'vikram@iitk.ac.in',
      phone: '+91 9876543214',
      messStatus: 'inactive',
      joinDate: '2023-07-15',
    },
  ]);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Student['messStatus']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-600';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-600';
      case 'rebate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-600';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">All Students</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800">
          <Download className="w-4 h-4" />
          Export List
        </button>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, roll number, or room..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        
        <div className="flex gap-2 text-sm">
          <span className="px-3 py-2 bg-green-100 border border-green-600">
            Active: {students.filter((s) => s.messStatus === 'active').length}
          </span>
          <span className="px-3 py-2 bg-yellow-100 border border-yellow-600">
            Rebate: {students.filter((s) => s.messStatus === 'rebate').length}
          </span>
          <span className="px-3 py-2 bg-red-100 border border-red-600">
            Inactive: {students.filter((s) => s.messStatus === 'inactive').length}
          </span>
        </div>
      </div>

      {/* Students Table */}
      <div className="border-2 border-black overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-3 text-left">Roll Number</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Room</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Join Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, idx) => (
                <tr
                  key={student.id}
                  className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className="px-4 py-3 font-medium">{student.rollNumber}</td>
                  <td className="px-4 py-3">{student.name}</td>
                  <td className="px-4 py-3">{student.room}</td>
                  <td className="px-4 py-3 text-sm">{student.email}</td>
                  <td className="px-4 py-3 text-sm">{student.phone}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 border ${getStatusColor(
                        student.messStatus
                      )}`}
                    >
                      {student.messStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(student.joinDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No students found matching your search.
          </div>
        )}
      </div>

      <div className="text-sm text-gray-600">
        Showing {filteredStudents.length} of {students.length} students
      </div>
    </div>
  );
}
