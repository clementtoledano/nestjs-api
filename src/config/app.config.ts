import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  workingDirectory: process.env.PWD || process.cwd(),
  port: parseInt(process.env.APP_PORT as string || process.env.PORT as string, 10) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api',
  fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
  //frontendDomain: process.env.FRONTEND_DOMAIN,
  //backendDomain: process.env.BACKEND_DOMAIN,
}));

