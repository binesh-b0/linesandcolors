module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    settings: {
      tailwindcss: {
        config: 'tailwind.config.js', // Ensure the path is correct
      },
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'airbnb',
      'prettier',
      'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
      'prettier/prettier': 'error',
      'tailwindcss/no-custom-classname': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'import/prefer-default-export': 'off',
    },
  };
  