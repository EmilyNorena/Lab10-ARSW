const memo = { 0: 0n, 1: 1n }; 

function fib(n) {
  if (n < 0) throw new Error("n debe ser >= 0");
  if (memo[n] !== undefined) return memo[n];

  const result = fib(n - 1) + fib(n - 2);
  memo[n] = result;
  return result;
}


module.exports = async function (context, req) {
  try {
    const raw = req.body?.nth ?? req.query?.nth;
    const n = parseInt(raw, 10);

    const start = Date.now();
    const value = fib(n);         
    const durationMs = Date.now() - start;

    context.log(`fib(${n}) calculado en ${durationMs} ms`);

    context.res = {
      status: 200,
      body: {
        nth: n,
        value: value.toString(),  
        durationMs
      }
    };
  } catch (err) {
    context.log.error(err);
    context.res = {
      status: 500,
      body: { error: err.message }
    };
  }
};
