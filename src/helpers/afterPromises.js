// shamelessly borrowed from https://github.com/facebook/jest/issues/2136#issuecomment-266817172

export default function afterPromises(done, fn) {
  setTimeout(function() {
    try {
      fn();
      done();
    } catch (e) {
      done.fail(e);
    }
  }, 0);
}
