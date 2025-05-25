import { commitMap, creativeCommitMessages } from "./constants";
import type { Cell } from "../types/cell";

function getRandomCommitMessage(): string {
  const idx = Math.floor(Math.random() * creativeCommitMessages.length);
  return creativeCommitMessages[idx];
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
}) {
  const lines = [
    "#!/bin/bash",
    "set -e",
    "",
    "# Arcadia GitHub Contribution Art Generator",
    "# Optimized for performance and reliability",
    "",
    "echo '🎨 Starting Arcadia contribution art generation...'",
    "echo 'Repository: ${username}/${repository}'",
    "echo 'Branch: ${branch}'",
    "",
    "# Performance optimizations",
    "export GIT_TERMINAL_PROMPT=0",
    "export GIT_SSH_COMMAND='ssh -o BatchMode=yes -o StrictHostKeyChecking=no'",
    "",
    "# Clone or create repo with progress feedback",
    `echo 'Cloning repository...'`,
    `git clone --quiet https://github.com/${username}/${repository}.git arcadia 2>/dev/null || {`,
    "  echo 'Repository not found. Creating new repository structure...';",
    "  mkdir arcadia && cd arcadia",
    "  git init --quiet",
    "  echo '# Arcadia Contribution Art' > README.md",
    "  echo 'This repository contains contribution art created with Arcadia.' >> README.md",
    "  echo 'Visit https://arcadia-contrib.netlify.app to create your own!' >> README.md",
    "  git add README.md",
    "  git commit --quiet -m 'Initial commit: Arcadia contribution art setup'",
    "  cd ..",
    "}",
    "cd arcadia",
    "",
    "# Prepare log file",
    "echo 'Preparing contribution log...'",
    "touch arcadia-log.txt",
    "echo '# Arcadia Contribution Art Log' > arcadia-log.txt",
    "echo '# Generated on: '$(date) >> arcadia-log.txt",
    "echo '' >> arcadia-log.txt",
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
  }

  lines.push(
    `echo 'Creating ${totalCommits} commits across ${dateMap.size} days...'`,
    "echo 'This may take a few moments...'",
    "",
    "# Disable Git hooks for faster processing",
    "mkdir -p .git/hooks",
    "echo '#!/bin/sh' > .git/hooks/pre-commit",
    "echo 'exit 0' >> .git/hooks/pre-commit",
    "chmod +x .git/hooks/pre-commit",
    "",
    "# Batch commit generation for better performance",
    "commit_count=0",
    "total_commits=" + totalCommits,
    ""
  );

  // Generate commits with progress tracking
  const sortedDates = Array.from(dateMap.entries()).sort((a, b) => a[0] - b[0]);
  
  sortedDates.forEach(([time, intensity], index) => {
    const dateStr = new Date(time).toISOString().slice(0, 10) + "T12:00:00 UTC";
    const count = commitMap[intensity] || 0;
    
    lines.push(`# Date: ${new Date(time).toISOString().slice(0, 10)} (Intensity: ${intensity})`);
    
    for (let i = 0; i < count; i++) {
      const msg = getRandomCommitMessage();
      const escapedMsg = msg.replace(/'/g, "'\"'\"'"); // Escape single quotes for shell
      
      lines.push(
        `export GIT_AUTHOR_DATE="${dateStr}"`,
        `export GIT_COMMITTER_DATE="${dateStr}"`,
        `echo "${escapedMsg}" >> arcadia-log.txt`,
        `git add arcadia-log.txt`,
        `git commit --quiet -m "${escapedMsg}"`,
        `commit_count=$((commit_count + 1))`,
        `if [ $((commit_count % 50)) -eq 0 ]; then`,
        `  echo "Progress: $commit_count/$total_commits commits created"`,
        `fi`,
      );
    }
    
    // Add checkpoint every 10 days for large patterns
    if (index > 0 && index % 10 === 0) {
      lines.push(
        `echo "Checkpoint: Processed ${index + 1}/${sortedDates.length} days"`,
      );
    }
  });

  lines.push(
    "",
    "echo 'All commits created successfully!'",
    "echo 'Final commit count: '$commit_count",
    "",
    "# Configure remote and push with progress",
    "echo 'Configuring remote repository...'",
    `git remote remove origin 2>/dev/null || true`,
    `git remote add origin https://github.com/${username}/${repository}.git`,
    `git branch -M ${branch}`,
    "",
    "echo 'Pushing to GitHub... This may take a while for large patterns.'",
    `git push --progress -u origin ${branch}`,
    "",
    "# Success message and cleanup",
    "echo ''",
    "echo '🎉 Arcadia contribution art created successfully!'",
    "echo 'Check your GitHub profile to see your new contribution graph!'",
    "echo 'Profile: https://github.com/${username}'",
    "echo 'Repository: https://github.com/${username}/${repository}'",
    "",
    "# Optional cleanup (uncomment if desired)",
    "# cd ..",
    "# rm -rf arcadia",
    "# echo 'Temporary files cleaned up.'",
    "",
    "echo 'Thank you for using Arcadia! 🎨'"
  );

  return lines.join("\n");
}
