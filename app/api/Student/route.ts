import { PrismaClient } from '@prisma/client';
// import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  if (req.method === 'GET') {
    try {
      const students = await prisma.student.findMany({
        include: {
          courses: true, // Include the related courses for each student
        },
      });

      return NextResponse.json(students);
    } catch (error) {
      console.error("Error fetching students and courses:", error);
      return NextResponse.json({ error: 'Failed to fetch students and courses' }, { status: 500 });
    }
  }
}

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const { name, cohort, courses, status } = await req.json();
      if (!Array.isArray(courses)) {
        return NextResponse.json({ error: 'Courses must be an array' }, { status: 400 });
      }

      const newStudent = await prisma.student.create({
        data: {
          name,
          cohort,
          dateJoined: new Date(),       
          lastLogin: new Date(),        
          status: status ?? true,
          courses: {
            create: courses.map((courseName: string) => ({ name: courseName })),
          },
        },
        include: {
          courses: true, 
        },
      });

      return NextResponse.json(newStudent, { status: 200 });
    } catch (error) {
      console.error('Error creating student:', error);
      return NextResponse.json({ error: 'Error creating student' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
