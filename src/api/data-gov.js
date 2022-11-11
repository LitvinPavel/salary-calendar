import axios from "axios";
import { parse, stringify } from 'qs';

const instance = axios.create({
  baseURL: "https://isdayoff.ru/api/",
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  }
});

export default instance;
