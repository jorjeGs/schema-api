const env = process.env.MODE === 'prod'
    ? require('../environment/env.prod').ENVIRONMENT
    : require('../environment/env.local').ENVIRONMENT;

export default env;