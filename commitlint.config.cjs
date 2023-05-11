module.exports = {
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'fix',
        'feature',
        'add',
        'refactor',
        'chore',
        'ci',
        'docs',
        'style',
        'test',
      ],
    ],
  },
  prompt: {
    questions: {
      type: {
        description: "Select the type of change that you're committing",
        enum: {
          fix: {
            description: 'A bug fix',
            title: 'Bug Fixes',
            emoji: '🔪',
          },
          feature: {
            description: 'A new feature',
            title: 'Features',
            emoji: '✨',
          },
          add: {
            description: "Additional code that's neither a fix nor a feature",
            title: 'Code Refactoring',
            emoji: '🐾',
          },
          refactor: {
            description:
              'A code change that neither fixes a bug nor adds a feature',
            title: 'Code Refactoring',
            emoji: '🍷',
          },
          chore: {
            description: "Other changes that don't modify src or test files",
            title: 'Chores',
            emoji: '🧰',
          },
          ci: {
            description:
              'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          test: {
            description: 'Adding missing tests or correcting existing tests',
            title: 'Tests',
            emoji: '💯',
          },
          docs: {
            description: 'Documentation only changes',
            title: 'Documentation',
            emoji: '📜',
          },
          style: {
            description:
              'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
            title: 'Styles',
            emoji: '🌠',
          },
        },
      },
      scope: {
        description:
          'What is the scope of this change (e.g. component or file name)',
      },
      subject: {
        description:
          'Write a short, imperative tense description of the change',
      },
      body: {
        description: 'Provide a longer description of the change',
      },
      isBreaking: {
        description: 'Are there any breaking changes?',
      },
      breakingBody: {
        description:
          'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
      },
      breaking: {
        description: 'Describe the breaking changes',
      },
      isIssueAffected: {
        description: 'Does this change affect any open issues?',
      },
      issuesBody: {
        description:
          'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123", "re #123".)',
      },
    },
  },
};
