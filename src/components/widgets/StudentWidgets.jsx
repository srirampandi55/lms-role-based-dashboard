import React from 'react';
import { BookOpen, TrendingUp, Clock, Award, Target, Calendar } from 'lucide-react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { getChartConfig } from '../../mock/charts.js';

const StudentWidgets = ({ data }) => {
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const progressChart = getChartConfig('studentProgress');
  const studyTimeChart = getChartConfig('studyTime');

  return (
    <div className="space-y-6 fade-in-up">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Your Learning Journey</h2>
        <p className="text-purple-100">Track your progress, manage assignments, and celebrate achievements</p>
      </div>

      {/* Personal Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200 course-card-hover">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Enrolled Courses</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {data.myProgress?.coursesEnrolled}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {data.myProgress?.coursesCompleted} completed
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200 course-card-hover">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Overall Progress</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {data.myProgress?.overallProgress}%
              </p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1 mt-2">
                <div 
                  className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                  style={{ width: data.myProgress?.overallProgress + '%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200 course-card-hover">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Current GPA</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {data.myProgress?.currentGPA}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                Excellent Performance
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200 course-card-hover">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Target className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Study Streak</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {data.myProgress?.studyStreak}
              </p>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                🔥 Keep it going!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Course Progress</h3>
          </div>
          <div className="h-64">
            {progressChart && (
              <Doughnut data={progressChart.data} options={progressChart.options} />
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Weekly Study Time</h3>
          </div>
          <div className="h-64">
            {studyTimeChart && (
              <Bar data={studyTimeChart.data} options={studyTimeChart.options} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentWidgets;
