import axios from 'axios';
import string from '../utilities/AppString'
/**
 * create axios instance
 */
const $http = axios.create({
    timeout: 30000,
    baseURL:'',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const successCodes = [200, 201];

  export const GET_API_CALL = (endPoint: string, callback: Function) => {
    $http
      .get(endPoint)
      .then((response: any) => {
        if (
          response &&
          response?.status &&
          successCodes.includes(response?.status)
        ) {
          callback({
            isSuccess: true,
            data: response?.data?.data || response?.data,
          });
        } else {
          
          callback({isSuccess: false, data: response?.response?.data});
        }
      })
      .catch((error: any) => {
        if (
          error?.message?.statusCode === 403 ||
          error?.message?.statusCode === 401 //Session expire
        ) {
        
          callback({isSuccess: false, data: {}});
         
        } else {
         
          callback({isSuccess: false, data: {}});
        }
      });
  };