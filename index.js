var tokenize = require('sexp-tokenizer');

var S_OUT       = 1,
    S_IN_MAIN   = 2,
    S_IN_EXP    = 3,
    S_END       = 4;

function Parser(options) {
    Transform.call(this, options);
    this._state = S_OUT;
}

var Transform   = require('stream').Transform,
    util        = require('util');

util.inherits(Parser, Transform);

Parser.prototype._transform = function(chunk, encoding, done) {

    if (this._state === S_OUT) {

        if (obj === tokenize.OPEN) {
            this._state = S_IN_MAIN;
        } else {
            this.emit('error', new Error('sexp stream must begin with open paren'));
            return;
        }

    } else if (this._state === S_IN_MAIN) {

        if (obj === tokenize.OPEN) {
            this._state = S_IN_EXP;
            this._curr = [];
            this._stack = [];
        } else if (obj === tokenize.CLOSE) {
            this._state = S_END;
        } else {
            this.push(obj);
        }

    } else if (this._state === S_IN_EXP) {

        if (obj === tokenize.OPEN) {
            var newSexp = [];
            this._curr.push(newSexp);
            this._stack.push(curr);
            this._curr = newSexp;
        } else if (obj === tokenize.CLOSE) {
            if (this._stack.length === 0) {
                this.push(this._curr);
                this._state = S_IN_MAIN;
            } else {
                this._curr = this._stack.pop();
            }
        } else {
            this._curr.push(obj);
        }

    }

    done();

}

Parser.prototype._flush = function(cb) {
    cb(this._state === S_END ? null : new Error("unexpected EOF"));
}
