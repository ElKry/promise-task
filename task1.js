// Реализовать функцию которая должна падать,
// с ошибкой new Error("timeout")
// если promise не выполняется за timeout
function timeoutedPromise(promise, timeout) {
  let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('timeout')), timeout);
    promise.then((v) => resolve(v));
  });
}

//реализовать значение с задержкой
const delayed = (v, timeout) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(v);
    }, timeout);
  });

// тесты функции
(async () => {
  try {
    await timeoutedPromise(delayed(1, 1000), 10000);
    throw new Error('SHOULD THROW');
  } catch (e) {
    console.log(e.message);
  }
})();

timeoutedPromise(Promise.resolve(1), 1000).then((v) => console.log(v));

timeoutedPromise(Promise.reject(1), 1000).catch((v) => console.log(v));
