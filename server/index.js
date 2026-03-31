"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const githubClient_1 = require("./api/githubClient");
const burnoutEngine_1 = require("./engine/burnoutEngine");
async function main() {
    const username = process.argv[2];
    if (!username) {
        console.error('Usage: npm start <github-username>');
        process.exit(1);
    }
    console.log(`\n🔥 GitBurn: Analyzing activity for ${username}...\n`);
    const client = new githubClient_1.GitHubClient();
    const engine = new burnoutEngine_1.BurnoutEngine();
    try {
        const activities = await client.fetchUserActivity(username);
        const result = engine.analyze(activities);
        console.log(`Burnout Risk: ${result.score}%`);
        console.log('\nSignals:');
        if (result.signals.length > 0) {
            result.signals.forEach(signal => console.log(`- ${signal}`));
        }
        else {
            console.log('- No significant burnout signals detected.');
        }
        console.log('\nSummary:');
        console.log(result.summary);
        console.log('\n------------------------------------------');
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=index.js.map