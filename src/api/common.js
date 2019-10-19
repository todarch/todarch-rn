import { AsyncStorage } from 'react-native';
import _ from 'lodash';
import { Toast } from 'native-base';

const tokenStorageKey = 'userToken';

export async function storeToken(token) {
  try {
    await AsyncStorage.setItem(tokenStorageKey, token);
  } catch (error) {
    // Error saving data
  }
}

export async function clearToken() {
  try {
    await AsyncStorage.removeItem(tokenStorageKey);
  } catch (error) {
    // Error saving data
  }
}

function getHeaders(optionalToken) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  console.log('Optional token: "' + optionalToken + '"');
  if (optionalToken) {
    headers['Authorization'] = `Bearer ${optionalToken}`;
  }

  return headers;
}

function normalizeUrl(url) {
  const baseApi = "https://api.todarch.com";
  return baseApi + url;
}

export function callApi({url, method='GET', body={}}) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(tokenStorageKey, (error, optionalToken) => {
      const normalizedUrl = normalizeUrl(url);
      const normalizedBody = body;

      const requestOptions = {
        method: method,
        headers: getHeaders(optionalToken)
      };

      if (!_.isEmpty(body)) {
        requestOptions.body = JSON.stringify(normalizedBody);
      }

      return fetch(normalizedUrl, requestOptions)
        .then(response => {
          if (response.status === 204) {
            return { json: [], response };
          }
          return response.json().then(json => ({ json, response }));
        })
        .then(({ json, response }) => {
          if (!response.ok) { // 200-299 is ok
            console.log('error in call api:' + JSON.stringify(json));
            reject(json);
          }
          return resolve(json);
        });
    });
  });

}

export const toastr = {
  showToast: (message, duration = 4500) => {
    Toast.show({
      text: message,
      duration,
      position: 'bottom',
      textStyle: { textAlign: 'center' },
      buttonText: 'OK',
    });
  },
};
