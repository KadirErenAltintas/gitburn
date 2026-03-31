import { ActivityData } from '../types/github';

export interface BurnoutResult {
  score: number;
  signals: string[];
  summary: string;
  personality: string;
  insight: string;
  roast: string;
}

export class BurnoutEngine {
  analyze(activities: ActivityData[]): BurnoutResult {
    if (!activities || activities.length === 0) {
      return {
        score: 0,
        signals: ['No recent activity found.'],
        summary: 'We couldn\'t find any recent activity for this user. Rest is good, but we need data to analyze!',
        personality: 'The Invisible Coder',
        insight: 'Your GitHub profile is as quiet as a library at 3 AM. Either you are on a long vacation or you are working in a secret underground bunker without internet.',
        roast: 'Are you even a developer or did you just create this account to star your own empty repos?'
      };
    }

    let score = 0;
    const signals: string[] = [];
    
    // 1. Late Night Commits (23:00 - 05:00)
    const lateNightActivities = activities.filter(a => {
      const hour = a.timestamp.getHours();
      return hour >= 23 || hour < 5;
    });
    const lateNightRatio = lateNightActivities.length / activities.length;
    
    if (lateNightRatio > 0.3) {
      score += 30;
      signals.push('High late-night coding frequency');
    } else if (lateNightRatio > 0.1) {
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
    } else if (weekendRatio > 0.2) {
      score += 10;
      signals.push('Regular weekend work detected');
    }

    // 3. Daily Frequency & Intensity
    const activityByDate = new Map<string, number>();
    activities.forEach(a => {
      const dateStr = a.timestamp.toISOString().split('T')[0];
      if (dateStr) {
        activityByDate.set(dateStr, (activityByDate.get(dateStr) || 0) + 1);
      }
    });

    const avgDailyActivity = activities.length / (activityByDate.size || 1);
    if (avgDailyActivity > 10) {
      score += 20;
      signals.push('High daily commit volume');
    }

    // 4. Rest Days (Gaps)
    const sortedDates = Array.from(activityByDate.keys()).sort();
    let restRatio = 0.5;
    if (sortedDates.length > 0) {
      const firstDate = new Date(sortedDates[0]!);
      const lastDate = new Date(sortedDates[sortedDates.length - 1]!);
      const totalDaysInRange = Math.ceil((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      
      const activeDaysCount = activityByDate.size;
      const restDaysCount = totalDaysInRange - activeDaysCount;
      restRatio = restDaysCount / (totalDaysInRange || 1);

      if (restRatio < 0.1 && totalDaysInRange > 7) {
        score += 25;
        signals.push('Very few rest days detected');
      } else if (restRatio < 0.2 && totalDaysInRange > 7) {
        score += 15;
        signals.push('Limited recovery time between active days');
      }
    }

    score = Math.min(Math.max(score, 0), 100);

    // Explicitly call methods and ensure they return strings
    const personality = this.determinePersonality(score, lateNightRatio, weekendRatio, restRatio);
    const insight = this.generateInsight(score, signals, lateNightRatio, weekendRatio);
    const roast = this.generateRoast(score, lateNightRatio, weekendRatio, avgDailyActivity);
    const summary = this.generateSummary(score, signals);

    return {
      score,
      signals,
      summary,
      personality,
      insight,
      roast
    };
  }

  private determinePersonality(score: number, lateNight: number, weekend: number, rest: number): string {
    if (score > 80) return 'Burnout Risk Developer';
    if (lateNight > 0.4) return 'Night Owl Hustler';
    if (weekend > 0.4) return 'Weekend Warrior';
    if (score > 50 && rest < 0.1) return 'Hustle Mode Developer';
    if (score < 30 && rest > 0.4) return 'Balanced Builder';
    if (lateNight > 0.2 && weekend > 0.2) return 'Chaotic Coder';
    return 'Steady Contributor';
  }

  private generateInsight(score: number, signals: string[], lateNight: number, weekend: number): string {
    let insight = `Your burnout score is ${score}%. `;
    if (score > 70) {
      insight += "You are coding like your server is on fire and you're the only one with a bucket. ";
    } else if (score > 40) {
      insight += "You have a decent rhythm, but the cracks are starting to show. ";
    } else {
      insight += "You seem to have found the mythical 'work-life balance' that everyone talks about. ";
    }

    if (lateNight > 0.3) {
      insight += "The moon is your primary light source; your brain seems to peak when the rest of the world is dreaming. ";
    }
    if (weekend > 0.3) {
      insight += "Weekends are just 'Weekdays Part 2' for you. Your IDE is your Sunday brunch. ";
    }
    return insight;
  }

  private generateRoast(score: number, lateNight: number, weekend: number, avgDaily: number): string {
    if (score > 80) {
      return "Your commit history looks like a cry for help. Have you seen sunlight this month, or do you just photosynthesize from your monitor's blue light?";
    }
    if (lateNight > 0.5) {
      return "Coding at 3 AM? Unless you're fighting a cyber-war, go to sleep. Your bugs are probably just hallucinations at this point.";
    }
    if (weekend > 0.5) {
      return "You work on weekends because you have no hobbies, or because your code is so messy it takes 2 extra days to fix? Be honest.";
    }
    if (score < 20) {
      return "Your activity is so balanced it's boring. Are you a developer or a government employee? Where's the passion? Where's the chaos?";
    }
    return "You're doing okay, but don't get comfortable. One deadline and you'll be back to crying over merge conflicts at midnight.";
  }

  private generateSummary(score: number, signals: string[]): string {
    if (score >= 80) {
      return 'Critical burnout risk. You are pushing yourself way too hard. Please take a break immediately.';
    } else if (score >= 60) {
      return 'High burnout risk. Your coding patterns suggest you are overworking, especially during late hours or weekends.';
    } else if (score >= 40) {
      return 'Moderate risk. You have some intense periods. Make sure to balance your work-life schedule.';
    } else if (score >= 20) {
      return 'Low risk. Your activity seems mostly balanced, though there are some minor signals to watch out for.';
    } else {
      return 'Healthy activity levels. Keep it up!';
    }
  }
}
