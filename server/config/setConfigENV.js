const config = require('./config.json');
const env = process.env.NODE_ENV || 'development';

const envConfig = config[env];
// set env variables
Object.keys(envConfig).forEach(env_key => {
    process.env[env_key] = envConfig[env_key]
});