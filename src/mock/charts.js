export const chartConfigs = {
  userGrowth: {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [
        {
          label: 'Total Users',
          data: [1820, 1950, 2100, 2280, 2450, 2580, 2720, 2847],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'User Growth Over Time'
        },
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          grid: { display: false }
        },
        y: {
          grid: { color: 'rgba(0, 0, 0, 0.1)' }
        }
      }
    }
  },

  courseCompletion: {
    type: 'bar',
    data: {
      labels: ['JavaScript', 'React', 'Node.js', 'Database', 'Python'],
      datasets: [
        {
          label: 'Enrolled',
          data: [456, 342, 289, 198, 378],
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderRadius: 4
        },
        {
          label: 'Completed', 
          data: [389, 267, 234, 167, 289],
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Course Performance'
        }
      }
    }
  },

  studentProgress: {
    type: 'doughnut',
    data: {
      labels: ['JavaScript', 'React', 'Node.js'],
      datasets: [
        {
          data: [100, 75, 60],
          backgroundColor: [
            'rgb(16, 185, 129)',
            'rgb(59, 130, 246)', 
            'rgb(245, 158, 11)'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Course Progress (%)'
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  },

  studyTime: {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Study Hours',
          data: [3.5, 2.8, 4.2, 2.1, 3.8, 1.5, 2.2],
          backgroundColor: 'rgba(139, 92, 246, 0.8)',
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Weekly Study Time'
        },
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 5
        }
      }
    }
  }
};

export const getChartConfig = (chartType) => {
  return chartConfigs[chartType] || null;
};
