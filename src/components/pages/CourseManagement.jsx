import React from 'react';
import { BookOpen, Plus, Users, Clock, TrendingUp } from 'lucide-react';

const CourseManagement = () => {
  const courses = [
    { id: 1, title: 'JavaScript Fundamentals', instructor: 'Dr. Alex Thompson', enrolled: 456, completion: 85, status: 'Active' },
    { id: 2, title: 'React Development', instructor: 'Prof. Maria Garcia', enrolled: 342, completion: 78, status: 'Active' },
    { id: 3, title: 'Node.js Backend', instructor: 'John Smith', enrolled: 289, completion: 81, status: 'Active' },
    { id: 4, title: 'Database Design', instructor: 'Dr. Sarah Lee', enrolled: 198, completion: 84, status: 'Draft' }
  ];

  return (
    <div className="space-y-6 fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Course Management</h1>
          <p className="text-slate-600 dark:text-slate-400">Create and manage courses for your students</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 hover:scale-105">
          <Plus className="w-4 h-4" />
          Create Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200 course-card-hover">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{course.title}</h3>
                <span className={'px-2 py-1 text-xs font-medium rounded-full ' + 
                  (course.status === 'Active' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300')
                }>
                  {course.status}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">by {course.instructor}</p>
              <div className="flex gap-2 mt-6">
                <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                  Edit Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseManagement;