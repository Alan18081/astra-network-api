import { resolve } from 'path';

export const JWT_SECRET = 'Hello, my dear friend';
export const JWT_EXPIRES = 3600 * 24;

// DB data
export const DB_HOST = 'localhost';
export const DB_PORT = 5432;
export const DB_USER = 'postgres';
export const DB_PASSWORD = 'qwerty1';
export const DB_NAME = 'astra_store';

// Google OAuth 20
export const GOOGLE_CLIENT_ID = '28234399443-i32gbk49djgk94jk16dghdskg9u9c3jp.apps.googleusercontent.com';
export const GOOGLE_CLIENT_SECRET = 'Q5tf2uQofbSpIeAP2Rx4gSsc';
export const GOOGLE_CALLBACK_URL = '/auth/google/callback';

// Cloudinary Keys
export const CLOUDINARY_CLOUD_NAME = 'dkvyhy1hr';
export const CLOUDINARY_API_KEY = '785611567955674';
export const CLOUDINARY_API_SECRET = '0oc_djHhKTlL2mZZmeG8JyMS8v8';
export const FILES_UPLOAD_FOLDER = resolve(__dirname, '../../upload');