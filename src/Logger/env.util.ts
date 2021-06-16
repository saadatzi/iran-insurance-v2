import { config } from 'dotenv';
// import { isNil } from './shared.util';
import {isNil} from 'lodash'
declare const process: { // nevermind 
  env: {
    [key: string]: string;
  };
};
config(); // load .env file
// Get an env value by key
export const Env = (key: string, fallback: any = null) => {
  return isNil(process.env[key]) ? fallback : process.env[key];
};