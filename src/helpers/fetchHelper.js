/* eslint-disable */

import { APP_ENPOINT_URL } from '../configs/configs';
// import fetch from 'isomorphic-unfetch';
import axios from 'axios';

export const generateHttpHeader = (token) => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: null
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
};

export const HttpMethod = {
    PUT: 'PUT',
    POST: 'POST',
    GET: 'GET',
    DELETE: 'DELETE',
    HEAD: 'HEAD',
    OPTIONS: 'OPTIONS',
    PATCH: 'PATCH'
};

export default async function fetchHelper(LinkEndPoint, method, body, token) {
    const res = await fetch(APP_ENPOINT_URL + LinkEndPoint, {
        method: method,
        headers: generateHttpHeader(token),
        body: body
    });
    return res.json();
}

export async function fetchRawHelper(LinkEndPoint, method, body, token) {
    const res = await fetch(APP_ENPOINT_URL + LinkEndPoint, {
        method: method,
        headers: generateHttpHeader(token),
        body: body
    });
    return res;
}

export async function protectedGetFetcher(endpointlink, method, body) {
    const thisToken = localStorage.getItem('accessToken');
    let fetcherResponse = null;
    try {
        const res = await fetch(APP_ENPOINT_URL + endpointlink, {
            method: method,
            headers: generateHttpHeader(thisToken)
        });

        const response = await res.json();
        const httpResponse = response;
        if (httpResponse.success) {
            fetcherResponse = httpResponse.result;
        }
    } catch (err) {}
    return fetcherResponse;
}

export async function protectedFetcher(endpointlink, method, body) {
    const thisToken = localStorage.getItem('accessToken');
    let fetcherResponse = null;
    try {
        const res = await fetch(APP_ENPOINT_URL + endpointlink, {
            method: method,
            headers: generateHttpHeader(thisToken),
            body: body
        });

        const response = await res.json();
        const httpResponse = response;
        if (httpResponse.code === 200) {
            fetcherResponse = httpResponse;
        }
    } catch (err) {}
    return fetcherResponse;
}

export async function publicFetcher(endpointlink, method, body) {
    const res = await fetch(APP_ENPOINT_URL + endpointlink, {
        method: method,
        headers: generateHttpHeader(null),
        body: body ? JSON.stringify(body) : null
    });
    let fetcherResponse = null;

    const response = await res.json();
    const httpResponse = response;

    if (httpResponse.success) {
        fetcherResponse = httpResponse.data;
    }
    return fetcherResponse;
}

export async function fetchToken(endpointlink, method, body) {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic Y29yZV9jbGllbnQ6c2VjcmV0'
    };
    const res = await fetch(APP_ENPOINT_URL + endpointlink, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null
    });
    const token = null;
    const response = await res.json();
    const httpResponse = response;
    if (httpResponse.access_token) {
        localStorage.setItem('accessToken', httpResponse.access_token);
        token = httpResponse;
    }
    return token;
}
