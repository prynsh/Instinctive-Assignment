// import { useState, useEffect } from 'react';
// import { Student } from '../types/student';
// // import { fetchStudents } from '../lib/mockService';

// export function useStudents(cohort?: string, course?: string) {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function getStudents() {
//       try {
//         setLoading(true);
//         const data = await fetchStudents(cohort, course);
//         setStudents(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     }

//     getStudents();
//   }, [cohort, course]);

//   return { students, loading, error };
// }