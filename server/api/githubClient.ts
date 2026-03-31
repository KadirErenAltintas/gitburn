import axios from "axios";
import dotenv from "dotenv";
import { ActivityData, GitHubEvent } from "../types/github";

dotenv.config();

export class GitHubAPIError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string
  ) {
    super(message);
    this.name = "GitHubAPIError";
  }
}

export class GitHubClient {
  private readonly baseUrl = "https://api.github.com";
  private readonly token: string | undefined;

  constructor() {
    this.token = process.env.GITHUB_TOKEN;
  }

  async fetchUserActivity(username: string): Promise<ActivityData[]> {
    try {
      const headers: Record<string, string> = {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "GitBurn-App",
      };

      if (this.token) {
        headers.Authorization = `token ${this.token}`;
      }

      const response = await axios.get<GitHubEvent[]>(
        `${this.baseUrl}/users/${username}/events`,
        { headers, timeout: 10000 }
      );

      return response.data.map((event) => ({
        timestamp: new Date(event.created_at),
        type: event.type,
        repo: event.repo.name,
      }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 404) {
          throw new GitHubAPIError(
            404,
            "USER_NOT_FOUND",
            `GitHub user '${username}' not found.`
          );
        }

        const remaining = error.response?.headers?.["x-ratelimit-remaining"];
        if (status === 403 && remaining === "0") {
          throw new GitHubAPIError(
            429,
            "RATE_LIMIT_EXCEEDED",
            "GitHub API rate limit exceeded. Please try again later."
          );
        }

        if (status && status >= 500) {
          throw new GitHubAPIError(
            502,
            "UPSTREAM_FAILURE",
            "GitHub API is temporarily unavailable. Please try again."
          );
        }

        if (status) {
          throw new GitHubAPIError(
            status,
            "GITHUB_API_ERROR",
            "Failed to fetch activity from GitHub API."
          );
        }
      }

      throw new GitHubAPIError(
        502,
        "NETWORK_FAILURE",
        "Unable to reach GitHub API. Please try again."
      );
    }
  }
}
