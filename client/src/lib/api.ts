/**
 * API utilities with error handling and validation
 */

import { getCachedResult, setCachedResult } from "./cache";

export interface AnalyzeResponse {
  score: number;
  signals: string[];
  personality: string;
  insight: string;
  summary: string;
  roast: string;
}

export class APIError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "APIError";
  }
}

export async function analyzeGitHubUser(
  username: string,
  useCache = true
): Promise<AnalyzeResponse> {
  // Validate username
  if (!username || typeof username !== "string") {
    throw new APIError("INVALID_USERNAME", "Username is required");
  }

  const trimmedUsername = username.trim();

  // Check cache first
  if (useCache) {
    const cached = getCachedResult(trimmedUsername);
    if (cached) {
      return cached;
    }
  }

  if (trimmedUsername.length < 2) {
    throw new APIError(
      "USERNAME_TOO_SHORT",
      "Username must be at least 2 characters"
    );
  }

  if (trimmedUsername.length > 39) {
    throw new APIError(
      "USERNAME_TOO_LONG",
      "Username must be less than 39 characters"
    );
  }

  // GitHub username can only contain alphanumeric characters and hyphens
  if (!/^[a-zA-Z0-9-]+$/.test(trimmedUsername)) {
    throw new APIError(
      "INVALID_USERNAME_FORMAT",
      "Username can only contain letters, numbers, and hyphens"
    );
  }

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: trimmedUsername }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error || `Server error (${response.status})`;

      if (response.status === 404) {
        throw new APIError(
          "USER_NOT_FOUND",
          `GitHub user "${trimmedUsername}" not found. Please check the username and try again.`,
          404
        );
      }

      if (response.status === 429) {
        throw new APIError(
          "RATE_LIMIT",
          "Too many requests. Please wait a moment and try again.",
          429
        );
      }

      if (response.status === 500 && !errorData.error) {
        throw new APIError(
          "BACKEND_UNAVAILABLE",
          "Backend API is unavailable. Make sure the API server is running on port 3000.",
          500
        );
      }

      throw new APIError(
        "API_ERROR",
        errorMessage,
        response.status
      );
    }

    const data = await response.json();

    // Cache the result
    setCachedResult(trimmedUsername, data);

    // Validate response structure
    if (
      typeof data.score !== "number" ||
      !Array.isArray(data.signals) ||
      typeof data.personality !== "string" ||
      typeof data.insight !== "string" ||
      typeof data.summary !== "string" ||
      typeof data.roast !== "string"
    ) {
      throw new APIError(
        "INVALID_RESPONSE",
        "Invalid response from server"
      );
    }

    // Validate score range
    if (typeof data.score !== "number" || data.score < 0 || data.score > 100) {
      throw new APIError(
        "INVALID_SCORE",
        "Invalid burnout score received"
      );
    }

    return data as AnalyzeResponse;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }

    if (error instanceof TypeError) {
      throw new APIError(
        "NETWORK_ERROR",
        "Network error. Please check your connection and try again."
      );
    }

    throw new APIError(
      "UNKNOWN_ERROR",
      "An unexpected error occurred. Please try again."
    );
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof APIError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
}

export function getErrorSuggestion(error: unknown): string | null {
  if (error instanceof APIError) {
    switch (error.code) {
      case "USER_NOT_FOUND":
        return "Make sure the username is spelled correctly.";
      case "RATE_LIMIT":
        return "Try again in a few seconds.";
      case "NETWORK_ERROR":
        return "Check your internet connection.";
      case "BACKEND_UNAVAILABLE":
        return "Run `pnpm run dev` from the project root.";
      case "USERNAME_TOO_SHORT":
        return "GitHub usernames must be at least 2 characters.";
      case "INVALID_USERNAME_FORMAT":
        return "Use only letters, numbers, and hyphens.";
      default:
        return null;
    }
  }

  return null;
}
