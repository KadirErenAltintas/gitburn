"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubClient = void 0;
const axios_1 = __importDefault(require("axios"));
const github_1 = require("../types/github");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class GitHubClient {
    baseUrl = 'https://api.github.com';
    token;
    constructor() {
        this.token = process.env.GITHUB_TOKEN;
    }
    async fetchUserActivity(username) {
        try {
            const headers = {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'GitBurn-App'
            };
            if (this.token) {
                headers['Authorization'] = `token ${this.token}`;
            }
            // GitHub Events API provides the last 90 days of activity (up to 300 events)
            const response = await axios_1.default.get(`${this.baseUrl}/users/${username}/events`, { headers });
            return response.data.map(event => ({
                timestamp: new Date(event.created_at),
                type: event.type,
                repo: event.repo.name
            }));
        }
        catch (error) {
            if (error.response && error.response.status === 404) {
                throw new Error(`User '${username}' not found.`);
            }
            if (error.response && error.response.status === 403) {
                throw new Error('GitHub API rate limit exceeded. Please provide a GITHUB_TOKEN in .env file.');
            }
            throw new Error(`Failed to fetch activity: ${error.message}`);
        }
    }
}
exports.GitHubClient = GitHubClient;
//# sourceMappingURL=githubClient.js.map