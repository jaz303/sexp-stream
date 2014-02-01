# sexp-stream

Builds upon `sexp-tokenizer`, implementing a streaming parser that emits one event per atom/s-expression at depth 1. For example this s-expression:

	((1 2 3) foo (10 11 20) moose)

emits:

	[1, 2, 3]
	"foo"
	[10, 11, 20]
	"moose"

## Installation:

	$ npm install sexp-tokenizer
	$ npm install sexp-stream

## Example:

	var tokenizer 	= require('sexp-tokenizer'),
		parser		= require('sexp-tream');

	var stream = fs.createReadStream('example.sexp', {encoding: 'utf8'})
					.pipe(tokenizer())
					.pipe(parser());

	stream.on('data', function(sexp) {
		// one data event will be emitted for each atom or complete s-expression
		// at depth 1.
	});

## TODO

  * need a convenience method for creating tokenizer -> parser pipe

