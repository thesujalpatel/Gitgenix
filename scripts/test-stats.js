#!/usr/bin/env node

/**
 * Test script for Gitgenix stats system
 * This script helps test the stats functionality in development
 */

const https = require("https");

// Test GitHub API
function testGitHubAPI() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.github.com",
      path: "/repos/thesujalpatel/Gitgenix",
      method: "GET",
      headers: {
        "User-Agent": "Gitgenix-Stats-Test",
        Accept: "application/vnd.github.v3+json",
      },
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          console.log("✅ GitHub API Test Results:");
          console.log(`   Repository: ${parsed.full_name}`);
          console.log(`   Stars: ${parsed.stargazers_count}`);
          console.log(`   Forks: ${parsed.forks_count}`);
          console.log(`   Watchers: ${parsed.watchers_count}`);
          console.log(`   Open Issues: ${parsed.open_issues_count}`);
          resolve(parsed);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
}

// Run tests
async function runTests() {
  console.log("🧪 Testing Gitgenix Stats System\n");

  try {
    await testGitHubAPI();
    console.log("\n✅ All tests passed!");
  } catch (error) {
    console.error("\n❌ Test failed:", error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runTests();
}

module.exports = { testGitHubAPI };
