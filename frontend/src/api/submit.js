import axios from 'axios/index';
import { feedback_url } from '../config/env';

const headers = {
  'Accept': '*/*',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*'
};

const post = async (body) => {
    try {
      await axios.post(feedback_url, body, headers);
      return 2;
    } catch (error) {
      return error;
    }
};

export { post };
