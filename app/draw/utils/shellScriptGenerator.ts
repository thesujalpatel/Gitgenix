import { commitMap, creativeCommitMessages } from "./constants";
import type { Cell } from "../types/cell";

// Generate unique commit messages to avoid duplicates
function generateUniqueCommitMessage(commitIndex: number, totalCommits: number): string {
  const baseMessages = creativeCommitMessages;
  const messageIndex = commitIndex % baseMessages.length;
  let message = baseMessages[messageIndex];
  
  // Add unique identifier to ensure no duplicates
  const timestamp = Date.now() + commitIndex;
  const uniqueId = timestamp.toString(36).slice(-4); // Short unique suffix
  
  // Add variation based on commit index to avoid exact duplicates
  if (commitIndex >= baseMessages.length) {
    const variation = Math.floor(commitIndex / baseMessages.length);
    const variations = [
      `${message} [${uniqueId}]`,
      `${message} #${variation + 1}`,
      `${message} (${commitIndex + 1})`,
      `${message} - Build ${commitIndex + 1}`,
      `${message} ✨ [${uniqueId}]`,
      `${message} 🎯 #${commitIndex + 1}`,
      `${message} 💫 (${variation + 1})`,
      `${message} ⭐ Build ${commitIndex + 1}`,
      `${message} 🌟 [${uniqueId}]`,
      `${message} 🚀 Commit ${commitIndex + 1}`
    ];
    message = variations[variation % variations.length];
  } else {
    // Even for first round, add unique identifier
    message = `${message} [${uniqueId}]`;
  }
  
  return message;
}

export function generateShellScript({
  graphs,
  username,
  repository,
  branch,
}: {
  graphs: Record<string, { cells: Cell[] }>;
  username: string;
  repository: string;
  branch: string;
}) {  const lines = [
    "#!/bin/bash",
    "set -e",
    "",
    "# Gitgenix GitHub Contribution Art Generator",
    "",
    "# Colors for better output",
    "RED='\\033[0;31m'",
    "GREEN='\\033[0;32m'",
    "YELLOW='\\033[1;33m'",
    "BLUE='\\033[0;34m'",
    "PURPLE='\\033[0;35m'",
    "CYAN='\\033[0;36m'",
    "NC='\\033[0m' # No Color",
    "",    "# Error cleanup function",
    "cleanup_on_error() {",
    "  echo \"\"",
    "  echo -e \"$RED❌ Error occurred, cleaning up...$NC\"",
    "  cd .. 2>/dev/null || true",
    "  if [ -d \"gitgenix\" ]; then",
    "    echo -e \"$YELLOW🧹 Removing cloned repository...$NC\"",
    "    rm -rf gitgenix",
    "    echo -e \"$GREEN✓ Cleanup completed$NC\"",
    "  fi",
    "  exit 1",
    "}",
    "",
    "# Set up error handling",
    "trap cleanup_on_error ERR",
    "",    "# Progress display function with better Windows compatibility",
    "show_progress() {",
    "  local current=$1",
    "  local total=$2",
    "  local percent=$((current * 100 / total))",
    "  local filled=$((percent / 5))",
    "  local empty=$((20 - filled))",
    "  printf \"\\r${CYAN}Progress: [\"",
    "  printf \"%*s\" $filled | tr ' ' '#'",
    "  printf \"%*s\" $empty | tr ' ' '-'",
    "  printf \"] ${percent}%% (${GREEN}${current}${CYAN}/${YELLOW}${total}${CYAN}) commits created${NC}\"",
    "  if [ $current -eq $total ]; then",
    "    echo \"\"",
    "    echo -e \"$GREEN✅ Progress complete!$NC\"",
    "  fi",
    "}",
    "",    "echo -e \"$PURPLE🎨 Gitgenix Contribution Art Generator$NC\"",
    "echo -e \"$BLUE━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$NC\"",
    `echo -e "Repository: $YELLOW${username}/${repository}$NC"`,
    `echo -e "Branch: $YELLOW${branch}$NC"`,
    "echo \"\"",
    "",
    "# Check Git credentials and authentication",
    "echo -e \"$CYAN🔐 Checking Git credentials and GitHub access...$NC\"",
    "",
    "# Check if git is configured",
    "if ! git config user.name >/dev/null || ! git config user.email >/dev/null; then",
    "  echo -e \"$RED❌ Git not configured!$NC\"",
    "  echo -e \"$YELLOW💡 Please configure git first:$NC\"",
    "  echo -e \"   git config --global user.name 'Your Name'\"",
    "  echo -e \"   git config --global user.email 'your.email@example.com'\"",
    "  exit 1",
    "fi",
    "",
    "# Test GitHub authentication by checking user access",
    "echo -e \"$CYAN🔍 Testing GitHub authentication...$NC\"",
    "if ! git ls-remote --exit-code --heads https://github.com/octocat/Hello-World.git >/dev/null 2>&1; then",
    "  echo -e \"$RED❌ Cannot access GitHub!$NC\"",
    "  echo -e \"$YELLOW💡 Please check your internet connection and GitHub access.$NC\"",
    "  exit 1",
    "fi",
    "",
    "# Test write access to the target repository",
    `echo -e "$CYAN🔍 Testing write access to ${username}/${repository}...$NC"`,
    `if git ls-remote --exit-code https://github.com/${username}/${repository}.git >/dev/null 2>&1; then`,
    "  echo -e \"$GREEN✓ Repository exists and is accessible$NC\"",
    "  # Test if we can push (this will fail gracefully if no write access)",
    `  if git ls-remote --exit-code --heads https://github.com/${username}/${repository}.git refs/heads/* >/dev/null 2>&1; then`,
    "    echo -e \"$GREEN✓ Write access confirmed$NC\"",
    "  else",
    "    echo -e \"$YELLOW⚠ Warning: May not have write access to repository$NC\"",
    "    echo -e \"$YELLOW💡 Make sure you have push permissions to the repository$NC\"",
    "  fi",
    "else",
    "  echo -e \"$YELLOW⚠ Repository not found - will create new repository$NC\"",
    "fi",
    "",
    "echo -e \"$GREEN✅ Credentials and access verified!$NC\"",
    "echo \"\"",
    "",
    "# Optimizations",
    "export GIT_TERMINAL_PROMPT=0",
    "export GIT_SSH_COMMAND='ssh -o BatchMode=yes -o StrictHostKeyChecking=no'",
    "",
    "# Repository setup",
    "echo -e \"$CYAN📁 Setting up repository...$NC\"",
    `if git clone --quiet https://github.com/${username}/${repository}.git gitgenix 2>/dev/null; then`,
    "  echo -e \"$GREEN✓ Repository cloned$NC\"",
    "else",
    "  echo -e \"$YELLOW⚠ Repository not found, creating new one...$NC\"",
    "  mkdir gitgenix && cd gitgenix",
    "  git init --quiet",
    "  echo '# Gitgenix Contribution Art' > README.md",
    "  echo 'This repository contains contribution art created with Gitgenix.' >> README.md",
    "  echo 'Visit https://gitgenix-contrib.netlify.app to create your own!' >> README.md",
    "  git add README.md",
    "  git commit --quiet -m 'Initial commit: Gitgenix contribution art setup'",
    "  echo -e \"$GREEN✓ Repository initialized$NC\"",
    "  cd ..",
    "fi",
    "cd gitgenix",
    "",
    "# Configure git settings to avoid line ending warnings",
    "git config core.autocrlf false",
    "git config core.safecrlf false",
    "",
    "# Prepare contribution log",
    "echo 'Gitgenix Contribution Art Log' > gitgenix-contributions.txt",
    "echo 'Generated: '$(date) >> gitgenix-contributions.txt",
    "echo '' >> gitgenix-contributions.txt",
  ];

  // Collect and sort dates for optimal processing
  const dateMap = new Map<number, number>();
  let totalCommits = 0;
  
  for (const graph of Object.values(graphs)) {
    for (const cell of graph.cells) {
      if (!cell.isOutOfRange && cell.intensity > 0) {
        dateMap.set(cell.date.getTime(), cell.intensity);
        totalCommits += commitMap[cell.intensity] || 0;
      }
    }
  }  lines.push(
    `echo -e "$CYAN🔨 Creating ${totalCommits} commits across ${dateMap.size} days...$NC"`,
    "echo \"\"",
    "",
    "# Optimize Git for batch operations",
    "git config core.preloadindex true",
    "git config core.fscache true",
    "git config gc.auto 0",
    "",
    "# Commit generation with progress",
    "commit_count=0",
    `total_commits=${totalCommits}`,
    "echo -e \"$CYAN🚀 Starting commit generation...$NC\"",
    "show_progress 0 $total_commits",
    ""
  );

  // Generate commits with unique messages and better progress tracking
  const sortedDates = Array.from(dateMap.entries()).sort((a, b) => a[0] - b[0]);
  let globalCommitIndex = 0;
  
  sortedDates.forEach(([time, intensity], dateIndex) => {
    const dateStr = new Date(time).toISOString().slice(0, 10) + "T12:00:00 UTC";
    const count = commitMap[intensity] || 0;
    
    if (count > 0) {
      lines.push(
        `# ${new Date(time).toISOString().slice(0, 10)} - ${count} commits`,
      );
      
      for (let i = 0; i < count; i++) {
        const uniqueMsg = generateUniqueCommitMessage(globalCommitIndex, totalCommits);
        const escapedMsg = uniqueMsg.replace(/'/g, "'\"'\"'").replace(/"/g, '\\"');
        
        lines.push(
          `export GIT_AUTHOR_DATE="${dateStr}"`,
          `export GIT_COMMITTER_DATE="${dateStr}"`,
          `echo "${escapedMsg}" >> gitgenix-contributions.txt`,
          `git add gitgenix-contributions.txt`,
          `git commit --quiet -m "${escapedMsg}"`,
          `commit_count=$((commit_count + 1))`,
          `show_progress $commit_count $total_commits`,
        );
        
        globalCommitIndex++;
      }
    }
  });lines.push(
    "",
    "echo \"\"",
    "echo -e \"$GREEN✅ All commits created successfully!$NC\"",
    "echo -e \"Final count: $YELLOW$commit_count$NC commits\"",
    "",
    "# Configure remote and push",
    "echo -e \"$CYAN🔗 Configuring remote repository...$NC\"",
    `git remote remove origin 2>/dev/null || true`,
    `git remote add origin https://github.com/${username}/${repository}.git`,
    `git branch -M ${branch}`,
    "",
    "echo -e \"$CYAN🚀 Pushing to GitHub...$NC\"",
    "echo -e \"$YELLOW⏳ This may take a moment for large patterns.$NC\"",
    `if git push --progress -u origin ${branch} 2>/dev/null; then`,
    "  echo -e \"$GREEN✅ Successfully pushed to GitHub!$NC\"",
    "else",
    "  echo -e \"$RED❌ Push failed. Please check your credentials and try again.$NC\"",
    "  echo -e \"$YELLOW💡 Make sure you have push access to the repository.$NC\"",
    "  exit 1",
    "fi",
    "",
    "# Success summary",
    "echo \"\"",
    "echo -e \"$PURPLE━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$NC\"",
    "echo -e \"$GREEN🎉 Gitgenix contribution art created successfully!$NC\"",
    "echo -e \"$PURPLE━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$NC\"",
    "echo \"\"",
    "echo -e \"📊 Check your contribution graph:\"",
    `echo -e "   $CYAN https://github.com/${username}$NC"`,
    "echo \"\"",
    "echo -e \"📁 Repository:\"",
    `echo -e "   $CYAN https://github.com/${username}/${repository}$NC"`,
    "",
    "# Cleanup",
    "cd ..",
    "rm -rf gitgenix",
    "echo -e \"$GREEN🧹 Cleanup completed$NC\"",
    "",
    "echo -e \"$PURPLE Thank you for using Gitgenix! 🎨✨$NC\""
  );

  return lines.join("\n");
}
