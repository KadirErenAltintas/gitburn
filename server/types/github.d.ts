export interface GitHubEvent {
    id: string;
    type: string;
    actor: {
        id: number;
        login: string;
    };
    repo: {
        id: number;
        name: string;
        url: string;
    };
    payload: {
        action?: string;
        commits?: Array<{
            sha: string;
            author: {
                email: string;
                name: string;
            };
            message: string;
            distinct: boolean;
            url: string;
        }>;
    };
    public: boolean;
    created_at: string;
}
export interface ActivityData {
    timestamp: Date;
    type: string;
    repo: string;
}
//# sourceMappingURL=github.d.ts.map