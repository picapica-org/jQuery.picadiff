(function() {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */


  module('diff_extended', {
    // This will run before each test in this module.
    setup: function() {
      /* global DiffHandler */
      this.diffHandler = new DiffHandler();
    }
  });

  test('split_text', function(){
    //check empty text
    var textArray = this.diffHandler.split_text('');
    strictEqual(textArray.length, 0);

    // simple word
    textArray = this.diffHandler.split_text('test');
    strictEqual(textArray.length, 1);

    //trailing whitespace
    textArray = this.diffHandler.split_text('test ');
    strictEqual(textArray.length, 1);
    strictEqual(textArray[0], 'test');

    // whitespace before text
    textArray = this.diffHandler.split_text(' test');
    strictEqual(textArray.length, 1);
    strictEqual(textArray[0], 'test');

    // both
    textArray = this.diffHandler.split_text(' test ');
    strictEqual(textArray.length, 1);
    strictEqual(textArray[0], 'test');

    //two words
    textArray = this.diffHandler.split_text('test1 test2');
    strictEqual(textArray.length, 2);
    strictEqual(textArray[0], 'test1');
    strictEqual(textArray[1], 'test2');

    //three words
    textArray = this.diffHandler.split_text('test1 test2 test3');
    strictEqual(textArray.length, 3);
    strictEqual(textArray[0], 'test1');
    strictEqual(textArray[1], 'test2');
    strictEqual(textArray[2], 'test3');

    // multiple words with multiple whitespaces
    textArray = this.diffHandler.split_text('   Käsekuchen  ist ein  schmauß. \nNicht \tnur für   den Klaus!! ');
    strictEqual(textArray.length, 9);
    strictEqual(textArray[3], 'schmauß.');

  });

  test('normalize_word', function(){
    var normalizedWord = this.diffHandler.normalize_word('test');
    strictEqual(normalizedWord, 'test');

    normalizedWord = this.diffHandler.normalize_word('test123');
    strictEqual(normalizedWord, 'test123');

    normalizedWord = this.diffHandler.normalize_word('123');
    strictEqual(normalizedWord, '123');

    // non-alphanumerics
    normalizedWord = this.diffHandler.normalize_word('test.');
    strictEqual(normalizedWord, 'test');

    normalizedWord = this.diffHandler.normalize_word('"test"');
    strictEqual(normalizedWord, 'test');

    // wikipedia citations
    normalizedWord = this.diffHandler.normalize_word('test[123]');
    strictEqual(normalizedWord, 'test');

    normalizedWord = this.diffHandler.normalize_word('test[123]test');
    strictEqual(normalizedWord, 'test123test');
  });

  //test diff wordbased
  //-1: DIFF_DELETE, 1: DIFF_INSERT, 0:DIFF_EQUAL
  test('diff_wordbased', function(){
    //expect(5);

    //check empty texts
    var diffArray = this.diffHandler.diff_wordbased('', '', false);
    strictEqual(diffArray.length, 0, 'should be empty');

    //test for simple inequality
    diffArray = this.diffHandler.diff_wordbased('test', 'test', false);
    strictEqual(diffArray.length, 1);
    strictEqual(diffArray[0][0], 0, "should be 0 if equal");

    //test for simple unequality
    diffArray = this.diffHandler.diff_wordbased('test1', 'test2', false);
    strictEqual(diffArray.length, 2);
    strictEqual(diffArray[0][0], -1, 'shouldbe the deletion');
    strictEqual(diffArray[1][0], 1, 'should be the addition');

    //test word seperation
    diffArray = this.diffHandler.diff_wordbased('test test1', 'test test2', false);
    strictEqual(diffArray.length, 3, 'should be 3. One equal and two diff parts');
    strictEqual(diffArray[0][0], 0, 'should be the equal part');
    strictEqual(diffArray[1][0], -1, 'should be the deletion');
    strictEqual(diffArray[2][0], 1, 'should be the addition');

    // two spaces
    diffArray = this.diffHandler.diff_wordbased('test  test1', 'test  test2', false);
    strictEqual(diffArray.length, 3, 'should be 3. One equal and two diff parts');
    strictEqual(diffArray[0][0], 0, 'should be the equal part');
    strictEqual(diffArray[1][0], -1, 'should be the deletion');
    strictEqual(diffArray[2][0], 1, 'should be the addition');

    // three spaces
    diffArray = this.diffHandler.diff_wordbased('test   test1', 'test   test2', false);
    strictEqual(diffArray.length, 3, 'should be 3. One equal and two diff parts');
    strictEqual(diffArray[0][0], 0, 'should be the equal part');
    strictEqual(diffArray[1][0], -1, 'should be the deletion');
    strictEqual(diffArray[2][0], 1, 'should be the addition');

    // tab
    diffArray = this.diffHandler.diff_wordbased('test\ttest1', 'test\ttest2', false);
    strictEqual(diffArray.length, 3, 'should be 3. One equal and two diff parts');
    strictEqual(diffArray[0][0], 0, 'should be the equal part');
    strictEqual(diffArray[1][0], -1, 'should be the deletion');
    strictEqual(diffArray[2][0], 1, 'should be the addition');

    // tab and space
    diffArray = this.diffHandler.diff_wordbased('test\t test1', 'test\t test2', false);
    strictEqual(diffArray.length, 3, 'should be 3. One equal and two diff parts');
    strictEqual(diffArray[0][0], 0, 'should be the equal part');
    strictEqual(diffArray[1][0], -1, 'should be the deletion');
    strictEqual(diffArray[2][0], 1, 'should be the addition');

    // space and tab
    diffArray = this.diffHandler.diff_wordbased('test\t test1', 'test\t test2', false);
    strictEqual(diffArray.length, 3, 'should be 3. One equal and two diff parts');
    strictEqual(diffArray[0][0], 0, 'should be the equal part');
    strictEqual(diffArray[1][0], -1, 'should be the deletion');
    strictEqual(diffArray[2][0], 1, 'should be the addition');

    // two tabs
    diffArray = this.diffHandler.diff_wordbased('test\t\ttest1', 'test\t\ttest2', false);
    strictEqual(diffArray.length, 3, 'should be 3. One equal and two diff parts');
    strictEqual(diffArray[0][0], 0, 'should be the equal part');
    strictEqual(diffArray[1][0], -1, 'should be the deletion');
    strictEqual(diffArray[2][0], 1, 'should be the addition');

    // new line
    diffArray = this.diffHandler.diff_wordbased('test\ntest1', 'test\ntest2', false);
    strictEqual(diffArray.length, 3, 'should be 3. One equal and two diff parts');
    strictEqual(diffArray[0][0], 0, 'should be the equal part');
    strictEqual(diffArray[1][0], -1, 'should be the deletion');
    strictEqual(diffArray[2][0], 1, 'should be the addition');

    // return
    diffArray = this.diffHandler.diff_wordbased('test\rtest1', 'test\rtest2', false);
    strictEqual(diffArray.length, 3, 'should be 3. One equal and two diff parts');
    strictEqual(diffArray[0][0], 0, 'should be the equal part');
    strictEqual(diffArray[1][0], -1, 'should be the deletion');
    strictEqual(diffArray[2][0], 1, 'should be the addition');

    // wikipedia-like citation brackets
    diffArray = this.diffHandler.diff_wordbased('test[3]', 'test', false);
    strictEqual(diffArray.length, 1);
    strictEqual(diffArray[0][0], 0, 'should be the equal part');

    // wikipedia-like citation brackets with subsequent word
    diffArray = this.diffHandler.diff_wordbased('test[3] test2', 'test test2', false);
    strictEqual(diffArray.length, 1);
    strictEqual(diffArray[0][0], 0, 'should be the equal part');



  });
}(jQuery));
