const getLastCommitID = (): string => {
  const commitHash = require('child_process')
    .execSync('git rev-parse HEAD')
    .toString()
    .trim();

  return commitHash;
};

export default getLastCommitID;
