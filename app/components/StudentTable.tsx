// 'use client';
// import { useState } from 'react';
// import { Dialog } from '@headlessui/react';
// import { Plus } from 'lucide-react';

// interface StudentData {
//   name: string;
//   cohort: string;
//   courses: string;
//   status: boolean;
// }

// export default function StudentTable() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [studentData, setStudentData] = useState<StudentData>({
//     name: '',
//     cohort: '',
//     courses: '',
//     status: true,
//   });
//   const [formError, setFormError] = useState<string | null>(null);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => {
//     setFormError(null);
//     setIsOpen(false);
//     setStudentData({ name: '', cohort: '', courses: '', status: true });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormError(null);

//     const coursesArray = studentData.courses.split(',').map(course => course.trim());

//     try {
//       const res = await fetch('/api/Student', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...studentData,
//           courses: coursesArray,
//         }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         setFormError(errorData.error || 'Failed to add student');
//         return;
//       }

//       const responseData = await res.json();
//       console.log('Student added successfully:', responseData);

//       closeModal();
//     } catch (error) {
//       setFormError('An unexpected error occurred');
//       console.error('Error adding student:', error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex gap-4">
//           <select className="border rounded-lg px-4 py-2">
//             <option>AY 2024-25</option>
//           </select>
//           <select className="border rounded-lg px-4 py-2">
//             <option>CBSE 9</option>
//           </select>
//         </div>

//         <button
//           onClick={openModal}
//           className="flex items-center gap-2 bg-slate-200 text-black px-4 py-2 rounded-lg"
//         >
//           <Plus className="h-5 w-5" />
//           Add new Student
//         </button>
//       </div>
//       <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
//         <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
//             <Dialog.Title className="text-lg font-medium">Add New Student</Dialog.Title>

//             <form onSubmit={handleSubmit} className="space-y-4 mt-4">
//               <div>
//                 <label className="block">Name</label>
//                 <input
//                   type="text"
//                   className="border rounded-lg px-4 py-2 w-full"
//                   value={studentData.name}
//                   onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block">Cohort</label>
//                 <input
//                   type="text"
//                   className="border rounded-lg px-4 py-2 w-full"
//                   value={studentData.cohort}
//                   onChange={(e) => setStudentData({ ...studentData, cohort: e.target.value })}
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block">Courses (comma separated)</label>
//                 <input
//                   type="text"
//                   className="border rounded-lg px-4 py-2 w-full"
//                   value={studentData.courses}
//                   onChange={(e) => setStudentData({ ...studentData, courses: e.target.value })}
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block">Status</label>
//                 <select
//                   className="border rounded-lg px-4 py-2 w-full"
//                   value={studentData.status ? 'true' : 'false'}
//                   onChange={(e) =>
//                     setStudentData({ ...studentData, status: e.target.value === 'true' })
//                   }
//                 >
//                   <option value="true">Active</option>
//                   <option value="false">Inactive</option>
//                 </select>
//               </div>

//               {formError && (
//                 <div className="text-red-500 text-sm">
//                   {formError}
//                 </div>
//               )}

//               <div className="mt-6">
//                 <button
//                   type="submit"
//                   className="w-full bg-black text-white px-4 py-2 rounded-lg"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Plus } from 'lucide-react';

type Course = {
  id: number;
  name: string;
};

type Student = {
  id: number;
  name: string;
  cohort: string;
  courses: Course[];
  dateJoined: string;
  lastLogin: string;
  status: boolean;
};

export default function StudentDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [studentData, setStudentData] = useState({
    name: '',
    cohort: '',
    courses: '',
    status: true,
  });
  const [formError, setFormError] = useState<string | null>(null);

  // Fetch students initially
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/Student');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setFormError(null);
    setIsOpen(false);
    setStudentData({ name: '', cohort: '', courses: '', status: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const coursesArray = studentData.courses.split(',').map((course) => course.trim());

    try {
      const res = await fetch('/api/Student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...studentData,
          courses: coursesArray,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setFormError(errorData.error || 'Failed to add student');
        return;
      }

      const newStudent = await res.json();
      setStudents((prevStudents) => [...prevStudents, newStudent]); // Update students list
      closeModal();
    } catch (error) {
      setFormError('An unexpected error occurred');
      console.error('Error adding student:', error);
    }
  };

  return (
    <div className="p-6">
      {/* Add New Student Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <select className="border rounded-lg px-4 py-2">
            <option>AY 2024-25</option>
          </select>
          <select className="border rounded-lg px-4 py-2">
            <option>CBSE 9</option>
          </select>
        </div>

        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-slate-200 text-black px-4 py-2 rounded-lg"
        >
          <Plus className="h-5 w-5" />
          Add new Student
        </button>
      </div>

      {/* Modal for Adding Student */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <Dialog.Title className="text-lg font-medium">Add New Student</Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block">Name</label>
                <input
                  type="text"
                  className="border rounded-lg px-4 py-2 w-full"
                  value={studentData.name}
                  onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block">Cohort</label>
                <input
                  type="text"
                  className="border rounded-lg px-4 py-2 w-full"
                  value={studentData.cohort}
                  onChange={(e) => setStudentData({ ...studentData, cohort: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block">Courses (comma separated)</label>
                <input
                  type="text"
                  className="border rounded-lg px-4 py-2 w-full"
                  value={studentData.courses}
                  onChange={(e) => setStudentData({ ...studentData, courses: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block">Status</label>
                <select
                  className="border rounded-lg px-4 py-2 w-full"
                  value={studentData.status ? 'true' : 'false'}
                  onChange={(e) =>
                    setStudentData({ ...studentData, status: e.target.value === 'true' })
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              {formError && <div className="text-red-500 text-sm">{formError}</div>}

              <div className="mt-6">
                <button type="submit" className="w-full bg-black text-white px-4 py-2 rounded-lg">
                  Submit
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Student Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm uppercase leading-normal">
              <th className="py-3 px-6 text-left">Student Name</th>
              <th className="py-3 px-6 text-left">Cohort</th>
              <th className="py-3 px-6 text-left">Courses</th>
              <th className="py-3 px-6 text-left">Date Joined</th>
              <th className="py-3 px-6 text-left">Last Login</th>
              <th className="py-3 px-6 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {students.map((student) => (
              <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{student.name}</td>
                <td className="py-3 px-6 text-left">{student.cohort}</td>
                <td className="py-3 px-6 text-left">
                  <div className="flex flex-wrap gap-2">
                    {student.courses.map((course) => (
                      <span
                        key={course.id}
                        className="bg-blue-200 rounded-full px-2 py-1 text-xs"
                      >
                        {course.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(student.dateJoined).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(student.lastLogin).toLocaleString()}
                </td>
                <td className="py-3 px-6 text-center">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      student.status ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
