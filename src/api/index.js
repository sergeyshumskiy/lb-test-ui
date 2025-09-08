import axios from 'axios';
import { config } from '../config';

export function createPayment(payload) {
    return axios.post('/payments', payload, { baseURL: config.apiUrl }).then(({data}) => data)
}

export function completePayment(payload) {
    return axios.post( '/payments/complete', payload   , { baseURL: config.apiUrl }).then(({data}) => data)
}
