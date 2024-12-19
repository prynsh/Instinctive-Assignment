import React from 'react';

interface CourseBadgeProps {
  course: string;
}

export function CourseBadge({ course }: CourseBadgeProps) {
  return (
    <span className="bg-gray-100 px-2 py-1 rounded text-sm">
      {course}
    </span>
  );
}