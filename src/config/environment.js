const environments = {
  development: {
    apiUrl: 'https://ad95af5b-467a-453b-8c82-2beb7ab1adef-00-2roxempm1ibix.pike.replit.dev'
  },
  production: {
    apiUrl: 'https://twister-contest.replit.app'
  }
};

const env = process.env.NODE_ENV || 'development';

export const config = {
  ...environments[env],
  isDevelopment: env === 'development',
  isProduction: env === 'production'
};
