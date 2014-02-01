var test        = require('tape');
var fs          = require('fs');
var tokenizer   = require('sexp-tokenizer');
var testSeq     = require('tape-readable-seq');
var deepEqual   = require('deep-equal');
var parser      = require('../');

test("parser", function(assert) {

    var stream = fs.createReadStream(__dirname + '/input.sexp', {encoding: 'utf8'})
                    .pipe(tokenizer())
                    .pipe(parser());

    testSeq(stream, [
        [1, 2, 3],
        4,
        [5, 6, 7],
        8,
        [9, 10, 11]
    ], deepEqual)(assert);

});
