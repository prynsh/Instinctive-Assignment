import React from 'react';
import { Plus } from 'lucide-react';

const students = [
  {
    name: 'Anshuman Kashyap',
    cohort: 'AY 2024-25',
    courses: ['CBSE 9 Science', 'CBSE 9 Math'],
    dateJoined: '17, Nov, 2024',
    lastLogin: '17, Nov, 2024 4:16 PM',
    status: 'active'
  },

];

export default function StudentTable() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <select className="border rounded-lg px-4 py-2">
            <option>AY 2023-24</option>
            <option>AY 2024-25</option>
          </select>
          <select className="border rounded-lg px-4 py-2">
            <option>CBSE 9</option>
          </select>
        </div>
        
        <button onClick={()=>{
        }} className="flex items-center gap-2 bg-slate-500 text-white px-4 py-2 rounded-lg">
          <Plus className="h-5 w-5" />
          Add new Student
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Student Name</th>
              <th className="text-left p-4">Cohort</th>
              <th className="text-left p-4">Courses</th>
              <th className="text-left p-4">Date Joined</th>
              <th className="text-left p-4">Last Login</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-b">
                <td className="p-4">{student.name}</td>
                <td className="p-4">{student.cohort}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {student.courses.map((course, i) => (
                      <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {course}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">{student.dateJoined}</td>
                <td className="p-4">{student.lastLogin}</td>
                <td className="p-4">
                  <span className={`inline-block w-2 h-2 rounded-full ${
                    student.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}