import { Router, Request, Response } from "express";
import { GitHubClient } from "../api/githubClient";
import { BurnoutEngine } from "../engine/burnoutEngine";

const router = Router();

router.post("/analyze", async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    if (!username || typeof username !== "string") {
      return res.status(400).json({ error: "Username is required" });
    }

    const client = new GitHubClient();
    const engine = new BurnoutEngine();

    const activities = await client.fetchUserActivity(username);
    const result = engine.analyze(activities);

    res.json(result);
  } catch (error: any) {
    console.error("Analysis error:", error);
    res.status(500).json({
      error: error.message || "Failed to analyze user activity",
    });
  }
});

export default router;
