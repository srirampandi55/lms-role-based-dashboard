import React from 'react';
import { TrendingUp, Target, Award, Clock } from 'lucide-react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { getChartConfig } from '../../mock/charts.js';

const Progress = () => {
  const progressChart = getChartConfig('studentProgress');
  const studyTimeChart = getChartConfig('studyTime');

  return (
    <div className="space-y-6 fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">My Progress</h1>
        <p className="text-slate-600 dark:text-slate-400">Track your learning journey and achievements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Course Progress</h3>
          <div className="h-64">
            {progressChart && (
              <Doughnut data={progressChart.data} options={progressChart.options} />
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Weekly Study Time</h3>
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

export default Progress;