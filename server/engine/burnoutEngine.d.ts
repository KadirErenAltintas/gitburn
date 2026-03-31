import { ActivityData } from '../types/github';
export interface BurnoutResult {
    score: number;
    signals: string[];
    summary: string;
}
export declare class BurnoutEngine {
    analyze(activities: ActivityData[]): BurnoutResult;
    private generateSummary;
}
//# sourceMappingURL=burnoutEngine.d.ts.map