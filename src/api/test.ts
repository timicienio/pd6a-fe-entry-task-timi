function processFunction(fn: () => void): void;
function processFunction<T>(fn: (arg: T) => void, arg: T): void;
function processFunction<T>(fn: (arg?: T) => void, arg?: T): void {
  if (arg !== undefined) {
    fn(arg);
  } else {
    fn();
  }
}
