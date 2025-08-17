import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { getChartConfig } from '../mock/charts.js';
import { BarChart3 } from 'lucide-react';

const ChartMessageBubble = ({ chartType, title }) => {
  const chartConfig = getChartConfig(chartType);

  if (!chartConfig) {
    return (
      <div className="bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-4 mt-2">
        <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
          <BarChart3 className="w-5 h-5" />
          <span>Chart not available</span>
        </div>
      </div>
    );
  }

  const renderChart = () => {
    const commonOptions = {
      ...chartConfig.options,
      maintainAspectRatio: false
    };

    switch (chartConfig.type) {
      case 'line':
        return <Line data={chartConfig.data} options={commonOptions} height={180} />;
      case 'bar':
        return <Bar data={chartConfig.data} options={commonOptions} height={180} />;
      case 'doughnut':
        return <Doughnut data={chartConfig.data} options={commonOptions} height={180} />;
      default:
        return <div className="flex items-center justify-center h-32">Unsupported chart</div>;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg mt-2 overflow-hidden">
      <div className="h-48 p-4">
        {renderChart()}
      </div>
      <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border-t text-xs text-slate-600 dark:text-slate-400 text-center">
        📊 Interactive chart
      </div>
    </div>
  );
};

export default ChartMessageBubble;
