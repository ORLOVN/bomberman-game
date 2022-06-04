const { ESLint } = require("eslint");

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint();
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file);
    })
  );
  const filteredFiles = files.filter((_, i) => !isIgnored[i]);
  return filteredFiles.join(" ");
};

module.exports = {
  "src/**/*.{ts,tsx,json}": async (files) => {
    const filesToLint = await removeIgnoredFiles(files);
    return [
      `npx eslint --fix --max-warnings=0 ${filesToLint}`,
      `prettier --write ${filesToLint}`,
    ];
  },
  "src/**/*.scss": ["npx stylelint --fix"],
};
