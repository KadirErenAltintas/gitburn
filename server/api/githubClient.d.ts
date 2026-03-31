import { ActivityData } from '../types/github';
export declare class GitHubClient {
    private readonly baseUrl;
    private readonly token;
    constructor();
    fetchUserActivity(username: string): Promise<ActivityData[]>;
}
//# sourceMappingURL=githubClient.d.ts.map