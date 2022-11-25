module.exports = {
    'env': {
        'commonjs': true,
        'es2021': true,
        'node': true,
        'jest/globals': true,
        'cypress/globals': true
    },
    'plugins': ['jest', 'cypress'],
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 13
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ]
    }
}
