import axios from "axios";
import { parse, stringify } from 'qs';

const instance = axios.create({
  baseURL: "https://salary-calendar-api.herokuapp.com/",
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  }
});

export default instance;