import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { GitHubAPIError, GitHubClient } from "./api/githubClient";
import { BurnoutEngine } from "./engine/burnoutEngine";
import testRouter from "./routes/test.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());

  // Test route
  app.use("/api", testRouter);

  // API route
  app.post("/api/analyze", async (req, res) => {
    try {
      const { username } = req.body;

      if (!username || typeof username !== "string" || !username.trim()) {
        return res.status(400).json({ error: "Username is required" });
      }

      const client = new GitHubClient();
      const engine = new BurnoutEngine();

      const activities = await client.fetchUserActivity(username.trim());
      const result = engine.analyze(activities);

      res.json(result);
    } catch (error: any) {
      console.error("Analysis error:", error);
      if (error instanceof GitHubAPIError) {
        return res.status(error.statusCode).json({
          error: error.message,
          code: error.code,
        });
      }

      res.status(500).json({
        error: "Failed to analyze user activity",
      });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
