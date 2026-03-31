"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BurnoutEngine = void 0;
const github_1 = require("../types/github");
class BurnoutEngine {
    analyze(activities) {
        if (activities.length === 0) {
            return {
                score: 0,
                signals: ['No recent activity found.'],
                summary: 'We couldn\'t find any recent activity for this user. Rest is good, but we need data to analyze!'
            };
        }
        let score = 0;
        const signals = [];
        // 1. Late Night Commits (23:00 - 05:00)
        const lateNightActivities = activities.filter(a => {
            const hour = a.timestamp.getHours();
            return hour >= 23 || hour < 5;
        });
        const lateNightRatio = lateNightActivities.length / activities.length;
        if (lateNightRatio > 0.3) {
            score += 30;
            signals.push('High late-night coding frequency');
        }
        else if (lateNightRatio > 0.1) {
            score += 15;
            signals.push('Occasional late-night activity');
        }
        // 2. Weekend Activity
        const weekendActivities = activities.filter(a => {
            const day = a.timestamp.getDay();
            return day === 0 || day === 6; // Sunday or Saturday
        });
        const weekendRatio = weekendActivities.length / activities.length;
        if (weekendRatio > 0.4) {
            score += 25;
            signals.push('Significant weekend activity spike');
        }
        else if (weekendRatio > 0.2) {
            score += 10;
            signals.push('Regular weekend work detected');
        }
        // 3. Daily Frequency & Intensity
        const activityByDate = new Map();
        activities.forEach(a => {
            const dateStr = a.timestamp.toISOString().split('T')[0];
            activityByDate.set(dateStr, (activityByDate.get(dateStr) || 0) + 1);
        });
        const avgDailyActivity = activities.length / activityByDate.size;
        if (avgDailyActivity > 10) {
            score += 20;
            signals.push('High daily commit volume');
        }
        // 4. Rest Days (Gaps)
        // Sort activities by date
        const sortedDates = Array.from(activityByDate.keys()).sort();
        const firstDate = new Date(sortedDates[0]);
        const lastDate = new Date(sortedDates[sortedDates.length - 1]);
        const totalDaysInRange = Math.ceil((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const activeDaysCount = activityByDate.size;
        const restDaysCount = totalDaysInRange - activeDaysCount;
        const restRatio = restDaysCount / totalDaysInRange;
        if (restRatio < 0.1 && totalDaysInRange > 7) {
            score += 25;
            signals.push('Very few rest days detected');
        }
        else if (restRatio < 0.2 && totalDaysInRange > 7) {
            score += 15;
            signals.push('Limited recovery time between active days');
        }
        // Normalize score to 0-100
        score = Math.min(Math.max(score, 0), 100);
        return {
            score,
            signals,
            summary: this.generateSummary(score, signals)
        };
    }
    generateSummary(score, signals) {
        if (score >= 80) {
            return 'Critical burnout risk. You are pushing yourself way too hard. Please take a break immediately.';
        }
        else if (score >= 60) {
            return 'High burnout risk. Your coding patterns suggest you are overworking, especially during late hours or weekends.';
        }
        else if (score >= 40) {
            return 'Moderate risk. You have some intense periods. Make sure to balance your work-life schedule.';
        }
        else if (score >= 20) {
            return 'Low risk. Your activity seems mostly balanced, though there are some minor signals to watch out for.';
        }
        else {
            return 'Healthy activity levels. You seem to have a great balance between work and rest. Keep it up!';
        }
    }
}
exports.BurnoutEngine = BurnoutEngine;
//# sourceMappingURL=burnoutEngine.js.map