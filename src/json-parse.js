/**
 * Basic Version
 * ✅ Array
 * ❌ Object
 */
JSON._parse = function (string) {
    const parser = new Parser();
    return parser.parse(string);
};

// -----Parser-----

class Parser {
    constructor() {
        this._string = '';
        this._tokenizer = new Tokenizer();
    }

    parse(string) {
        this._string = string;
        this._tokenizer.init(string);
        this._currentToken = this._tokenizer.getNextToken();

        return this.Program();
    }

    Program() {
        const type = this._currentToken.type;
        switch (type) {
            case '[':
                return this.ArrayExpression();
            case 'NUMBER':
                return this.NumericLiteral();
            case ']':
            case ',':
                this._eat(type);
                return null;
            default:
                throw new Error(`Unsupported token type: ${type}`);
        }
    }

    ArrayExpression() {
        const res = [];
        this._eat('[');

        while (this._currentToken !== null) {
            const value = this.Program();
            if (value !== null) res.push(value);
        }

        return res;
    }

    NumericLiteral() {
        const token = this._currentToken;
        this._eat(token.type);
        return Number(token.value);
    }

    _eat(tokenType) {
        const token = this._currentToken;

        if (token === null) {
            throw new SyntaxError(
                `Unexpected end of input, expected: "${tokenType}"`
            );
        }

        if (token.type !== tokenType) {
            throw new SyntaxError(
                `Unexpected token: "${token.value}", expected: "${tokenType}"`
            );
        }

        this._currentToken = this._tokenizer.getNextToken();
        return token;
    }
}

// -----Tokenizer-----

const SPEC = [
    [/^\[/, '['],
    [/^\]/, ']'],
    [/^,/, ','],
    [/^\d+/, 'NUMBER'],
];

class Tokenizer {
    init(string) {
        this._string = string;
        this._cursor = 0;
    }

    getNextToken() {
        if (!this._hasMoreToken()) return null;

        const string = this._string.slice(this._cursor);
        for (const [regex, type] of SPEC) {
            const value = this._match(regex, string);
            if (value === null) continue;
            return {
                type,
                value,
            };
        }
    }

    _hasMoreToken() {
        return this._cursor < this._string.length;
    }

    _match(regex, string) {
        const matched = regex.exec(string);
        if (matched === null) return null;
        this._cursor += matched[0].length;
        return matched[0];
    }
}

/**
 * TODO: Advanced Version
 */

// --------------Test--------------
console.log(JSON._parse('[123,2,3,[4,5]]'));
