module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'react-native', 'flowtype', 'prettier', 'standard'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'standard',
        'prettier',
        'prettier/flowtype',
        'prettier/react',
        'prettier/standard',
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
            },
        ],
    },
};
