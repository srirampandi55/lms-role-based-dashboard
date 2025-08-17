import React from 'react';
import { BookOpen, Play, Clock, Award } from 'lucide-react';
import { getDashboardData } from '../../mock/dashboardData.js';
import { getCurrentUser } from '../../mock/users.js';

const MyCourses = () => {
  const user = getCurrentUser();
  const data = getDashboardData(user?.role);
  const courses = data.myCourses || [];

  return (
    <div className="space-y-6 fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">My Courses</h1>
        <p className="text-slate-600 dark:text-slate-400">Continue your learning journey</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Enrolled Courses</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{data.myProgress?.coursesEnrolled || 5}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Completed</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{data.myProgress?.coursesCompleted || 3}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Study Hours</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{data.myProgress?.totalStudyHours || 147}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200 overflow-hidden group">
            <div className="relative">
              {/* Course Logo Background */}
              <div className={'h-40 flex items-center justify-center relative overflow-hidden ' + (course.color || 'bg-slate-100 dark:bg-slate-700')}>
                {/* Course Logo Container - Lower z-index */}
                <div className="relative z-10 flex items-center justify-center w-24 h-24 bg-white/90 dark:bg-slate-900/90 rounded-2xl shadow-lg backdrop-blur-sm">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-16 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="text-2xl font-bold text-slate-600 dark:text-slate-300">' + course.title.charAt(0) + '</div>';
                    }}
                  />
                </div>

                {/* Gradient Overlay - Lower z-index */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30 z-0"></div>

                {/* Hover Overlay with Higher z-index - This fixes the issue */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                  <button className="flex items-center gap-2 px-6 py-3 bg-white/95 backdrop-blur-sm rounded-xl text-slate-900 font-semibold hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg border border-white/20">
                    <Play className="w-5 h-5" />
                    {course.status === 'completed' ? 'Review Course' : 'Continue Learning'}
                  </button>
                </div>

                {/* Status Badge - Higher z-index */}
                <div className="absolute top-3 right-3 z-30">
                  <span className={'px-3 py-1 text-xs font-semibold rounded-full text-white backdrop-blur-sm ' + 
                    (course.status === 'completed' 
                      ? 'bg-green-600/90 border border-green-400/30' 
                      : 'bg-blue-600/90 border border-blue-400/30')
                  }>
                    {course.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">{course.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">by {course.instructor}</p>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Progress</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{course.progress}%</span>
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div 
                    className={'h-2 rounded-full transition-all duration-300 ' + 
                      (course.status === 'completed' ? 'bg-green-500' : 'bg-blue-600')
                    }
                    style={{ width: course.progress + '%' }}
                  ></div>
                </div>

                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>{course.completedLessons}/{course.lessons} lessons</span>
                  <span>{course.duration}</span>
                </div>

                {course.grade && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Current Grade</span>
                    <span className={'px-2 py-1 text-sm font-medium rounded ' + 
                      (course.grade.startsWith('A') ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                       course.grade.startsWith('B') ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                       'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300')
                    }>
                      {course.grade}
                    </span>
                  </div>
                )}

                {course.nextLesson && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Next:</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{course.nextLesson}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
