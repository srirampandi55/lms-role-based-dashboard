import React from 'react';
import { Award, Trophy, Star, Target, Zap, Calendar, TrendingUp } from 'lucide-react';
import { getDashboardData } from '../../mock/dashboardData.js';
import { getCurrentUser } from '../../mock/users.js';

const Achievements = () => {
  const user = getCurrentUser();
  const data = getDashboardData(user?.role);
  const achievements = data.achievements || [];
  const stats = data.achievementStats || {};

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 bg-gray-50 dark:bg-gray-900/20';
      case 'uncommon': return 'border-green-400 bg-green-50 dark:bg-green-900/20';
      case 'rare': return 'border-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case 'epic': return 'border-purple-400 bg-purple-50 dark:bg-purple-900/20';
      case 'legendary': return 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      default: return 'border-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getRarityBadgeColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500 text-white';
      case 'uncommon': return 'bg-green-500 text-white';
      case 'rare': return 'bg-blue-500 text-white';
      case 'epic': return 'bg-purple-500 text-white';
      case 'legendary': return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const earnedAchievements = achievements.filter(a => a.earned);
  const lockedAchievements = achievements.filter(a => !a.earned);

  return (
    <div className="space-y-6 fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Achievements</h1>
        <p className="text-slate-600 dark:text-slate-400">Track your learning milestones and unlock badges</p>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Earned</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stats.totalEarned || 0}/{stats.totalAvailable || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Star className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Points Earned</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stats.totalPoints?.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Current Level</p>
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {stats.currentLevel || 'Beginner'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Next Level</p>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {stats.nextMilestone - stats.totalPoints} pts to go
              </p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1 mt-2">
                <div 
                  className="bg-purple-600 h-1 rounded-full transition-all duration-300"
                  style={{ width: ((stats.totalPoints / stats.nextMilestone) * 100) + '%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Earned Achievements */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Earned Achievements</h2>
          <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full font-medium">
            {earnedAchievements.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {earnedAchievements.map((achievement) => (
            <div key={achievement.id} className={'p-4 rounded-xl border-2 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 ' + getRarityColor(achievement.rarity)}>
              <div className="flex items-start gap-3">
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">{achievement.title}</h3>
                    <span className={'px-2 py-0.5 text-xs rounded-full font-medium capitalize ' + getRarityBadgeColor(achievement.rarity)}>
                      {achievement.rarity}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{achievement.description}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(achievement.earnedDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {achievement.points} pts
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Locked Achievements */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-6 h-6 text-slate-500" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Locked Achievements</h2>
          <span className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full font-medium">
            {lockedAchievements.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lockedAchievements.map((achievement) => (
            <div key={achievement.id} className="p-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 hover:shadow-lg transition-all duration-200 opacity-75">
              <div className="flex items-start gap-3">
                <div className="text-3xl grayscale">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-700 dark:text-slate-300">{achievement.title}</h3>
                    <span className={'px-2 py-0.5 text-xs rounded-full font-medium capitalize ' + getRarityBadgeColor(achievement.rarity)}>
                      {achievement.rarity}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mb-2">{achievement.description}</p>

                  {achievement.progress && (
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-500 mb-1">
                        <span>Progress</span>
                        <span>{achievement.progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: achievement.progress + '%' }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {achievement.requirement && (
                    <p className="text-xs text-slate-500 dark:text-slate-500 italic mb-2">{achievement.requirement}</p>
                  )}

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
                    <span>{achievement.category}</span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {achievement.points} pts
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Categories */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {['Course Completion', 'Study Habits', 'Punctuality', 'Excellence', 'Programming', 'Learning', 'Time Management', 'Specialization'].map((category) => {
            const categoryCount = achievements.filter(a => a.category === category && a.earned).length;
            const totalInCategory = achievements.filter(a => a.category === category).length;
            return (
              <div key={category} className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center hover:shadow-md transition-all duration-200">
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{category}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {categoryCount}/{totalInCategory}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
