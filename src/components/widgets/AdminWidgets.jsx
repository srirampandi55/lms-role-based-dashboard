import React from 'react';
import { Users, BookOpen, TrendingUp, Activity, Award, Clock } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import { getChartConfig } from '../../mock/charts.js';

const AdminWidgets = ({ data }) => {
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const userGrowthChart = getChartConfig('userGrowth');
  const courseCompletionChart = getChartConfig('courseCompletion');

  return (
    <div className="space-y-6 fade-in-up">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Admin Dashboard Overview</h2>
        <p className="text-blue-100">Monitor platform performance, user engagement, and course analytics</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200 course-card-hover">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Users</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {data.userStats?.totalUsers?.toLocaleString()}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                {data.userStats?.trend}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200 course-card-hover">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Active Courses</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {data.courseAnalytics?.length || 0}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Avg. {data.courseAnalytics ? 
                  Math.round(data.courseAnalytics.reduce((acc, course) => acc + course.rate, 0) / data.courseAnalytics.length) 
                  : 0}% completion
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200 course-card-hover">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">System Health</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {data.systemHealth?.serverUptime}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {data.systemHealth?.responseTime} response
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200 course-card-hover">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Active Users</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {data.userStats?.activeUsers?.toLocaleString()}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                {data.userStats?.retentionRate}% retention
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
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">User Growth Trend</h3>
          </div>
          <div className="h-64">
            {userGrowthChart && (
              <Line data={userGrowthChart.data} options={userGrowthChart.options} />
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Course Performance</h3>
          </div>
          <div className="h-64">
            {courseCompletionChart && (
              <Bar data={courseCompletionChart.data} options={courseCompletionChart.options} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWidgets;
