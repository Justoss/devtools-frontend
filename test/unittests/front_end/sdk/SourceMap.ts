// Copyright 2019 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const {assert} = chai;

import {SourceMapEntry,TextSourceMap} from '/front_end/sdk/SourceMap.js';

describe('SourceMapEntry', () => {
  it('can be instantiated correctly', () => {
    const sourceMapEntry = new SourceMapEntry(1, 1, 'http://www.example.com/', 1, 1, 'example');
    assert.equal(sourceMapEntry.lineNumber, 1,'line number was not set correctly');
    assert.equal(sourceMapEntry.columnNumber, 1,'column number was not set correctly');
    assert.equal(sourceMapEntry.sourceURL, 'http://www.example.com/','source URL was not set correctly');
    assert.equal(sourceMapEntry.sourceLineNumber, 1,'source line number was not set correctly');
    assert.equal(sourceMapEntry.sourceColumnNumber, 1,'source column number was not set correctly');
    assert.equal(sourceMapEntry.name, 'example','name was not set correctly');
  });

  describe('comparison', () => {
    it('checks line numbers first', () => {
      const sourceMapEntry1 = new SourceMapEntry(1, 5, '<foo>', 1, 5, 'foo');
      const sourceMapEntry2 = new SourceMapEntry(2, 5, '<foo>', 2, 5, 'foo');
      assert.isBelow(SourceMapEntry.compare(sourceMapEntry1, sourceMapEntry2), 0,
          'first entry is not smaller');
    });

    it('checks column numbers second when line numbers are equal', () => {
      const sourceMapEntry1 = new SourceMapEntry(2, 5, '<foo>', 1, 5, 'foo');
      const sourceMapEntry2 = new SourceMapEntry(2, 25, '<foo>', 2, 5, 'foo');
      assert.isBelow(SourceMapEntry.compare(sourceMapEntry1, sourceMapEntry2), 0,
          'first entry is not smaller');
    });

    it('works for equal SourceMapEntries', () => {
      const sourceMapEntry1 = new SourceMapEntry(2, 5, '<foo>', 1, 5, 'foo');
      const sourceMapEntry2 = new SourceMapEntry(2, 5, '<foo>', 1, 5, 'foo');
      assert.equal(SourceMapEntry.compare(sourceMapEntry1, sourceMapEntry2), 0);
    });
  });
});

describe('TextSourceMap', () => {
  describe('StringCharIterator', () => {
    it('detects when it has reached the end', () => {
      const empty_iterator = new TextSourceMap.StringCharIterator('');
      assert.isFalse(empty_iterator.hasNext());

      const iterator = new TextSourceMap.StringCharIterator('foo');
      assert.isTrue(iterator.hasNext());
    });

    it('peeks the next character', () => {
      const empty_iterator = new TextSourceMap.StringCharIterator('');
      assert.equal(empty_iterator.peek(), '');

      const iterator = new TextSourceMap.StringCharIterator('foo');
      assert.equal(iterator.peek(), 'f');
    });

    it('advances when {next} is called', () => {
      const iterator = new TextSourceMap.StringCharIterator('bar');
      assert.equal(iterator.next(), 'b');
      assert.equal(iterator.next(), 'a');
      assert.equal(iterator.next(), 'r');
      assert.isFalse(iterator.hasNext());
    });
  });
});
