import axios from 'axios';
import { recruitCRMHost } from '../config/env.json';

const axioConnectorInstance = axios.create({
  baseURL: recruitCRMHost,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

export default axioConnectorInstance;