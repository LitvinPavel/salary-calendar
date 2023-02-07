import axios from "axios";
import { parse, stringify } from 'qs';

const instance = axios.create({
  baseURL: "https://e2e-calendar-api.vercel.app/",
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  }
});

export default instance;