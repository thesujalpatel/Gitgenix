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
    "# Clone or create repo",
    `git clone https://github.com/${username}/${repository}.git arcadia || {`,
    "  echo 'Repo not found. Creating new repo folder...';",
    '  mkdir arcadia && cd arcadia && git init && touch README.md && git add . && git commit -m "Initial commit"',
    "} && cd arcadia",
    "",
    "touch log.txt",
  ];

  const dateMap = new Map<number, number>();
  for (const graph of Object.values(graphs)) {
    for (const cell of graph.cells) {
      if (!cell.isOutOfRange && cell.intensity > 0) {
        dateMap.set(cell.date.getTime(), cell.intensity);
      }
    }
  }

  Array.from(dateMap.entries())
    .sort((a, b) => a[0] - b[0])
    .forEach(([time, intensity]) => {
      const dateStr = new Date(time).toISOString().slice(0, 10) + "T12:00:00 UTC";
      const count = commitMap[intensity] || 0;
      for (let i = 0; i < count; i++) {
        const msg = getRandomCommitMessage();
        lines.push(
          `export GIT_AUTHOR_DATE="${dateStr}"`,
          `export GIT_COMMITTER_DATE="${dateStr}"`,
          `echo "${msg}" >> log.txt`,
          `git add log.txt`,
          `git commit -m "${msg}"`,
        );
      }
    });

  lines.push(
    "",
    "# Set remote and push",
    `git remote remove origin 2>/dev/null || true`,
    `git remote add origin https://github.com/${username}/${repository}.git`,
    `git branch -M ${branch}`,
    `git push -u origin ${branch}`,
    "",
    "# Cleanup",
    "cd ..",
    "rm -rf arcadia",
    "echo 'Graph ready! Push complete.'"
  );

  return lines.join("\n");
}
