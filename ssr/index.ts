const middleware = require(
  process.env.NODE_ENV === 'development'
    ? "./middleware/hmrMiddleware"
    : "./middleware/ssrMiddleware"
).default;

export default middleware;
