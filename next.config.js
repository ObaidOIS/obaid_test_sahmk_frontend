// next.config.js
module.exports = {
  assetPrefix: process.env.FRONTEND_URL_ENV === 'production' ? 'https://sahmk.sa/' : 'http://localhost:3000/',
};
