declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      TYPEORM_HOST: string;
      TYPEORM_PORT: string;
      TYPEORM_USERNAME: string;
      TYPEORM_PASSWORD: string;
      TYPEORM_DATABASE_NAME: string;
      SECRET_JWT: string
    }
  }
}

export {};
