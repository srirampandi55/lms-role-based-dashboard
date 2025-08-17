import React from 'react';
import { BarChart3, TrendingUp, Users, BookOpen } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import { getChartConfig } from '../../mock/charts.js';

const Analytics = () => {
  const userGrowthChart = getChartConfig('userGrowth');
  const courseCompletionChart = getChartConfig('courseCompletion');

  return (
    <div className="space-y-6 fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Analytics Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Comprehensive platform analytics and insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">User Growth Trend</h3>
          <div className="h-64">
            {userGrowthChart && (
              <Line data={userGrowthChart.data} options={userGrowthChart.options} />
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Course Performance</h3>
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

export default Analytics;