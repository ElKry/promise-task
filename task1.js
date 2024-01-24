// Реализовать функцию которая должена падать,
// с ошибкой new Error("timeout")
// если promise не выполняется за timeout
function timeoutedPromise(promise, timeout) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => reject(new Error('timeout')), timeout);
    promise
      .then(v => resolve(v))
      .catch(reject)
      .finally(() => clearTimeout(timeoutId));
  });
}

//реализовать значение с задержкой
const delayed = (v, timeout) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(v);
    }, timeout);
  });

// тесты функции
(async () => {
  try {
    await timeoutedPromise(delayed(1, 3000), 1500);
    throw new Error('SHOULD THROW');
  } catch (e) {
    console.log(e.message);
  }
})();

timeoutedPromise(Promise.resolve('Promise resolved'), 1000).then(v => console.log(v));

timeoutedPromise(Promise.reject('Promise rejected'), 1000).catch(v => console.log(v));
