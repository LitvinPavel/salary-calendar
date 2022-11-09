import axios from "axios";
import { parse, stringify } from 'qs';

const instance = axios.create({
  baseURL: "http://data.gov.ru/api/json/dataset",
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  }
});

export default instance;
