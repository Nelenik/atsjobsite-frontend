// export const throttle = (fn: () => unknown, throttleTime: number) => {
//   let time = Date.now();
//   return () => {
//     if (time + throttleTime - Date.now() <= 0) {
//       fn();
//       time = Date.now();
//     }
//   };
// };

export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  delay: number
): T {
  let lastExecTime = 0;

  return function (this: unknown, ...args: Parameters<T>) {
    const currentTime = Date.now();

    if (currentTime - lastExecTime >= delay) {
      lastExecTime = currentTime;
      return func.apply(this, args);
    }
  } as T;
}
