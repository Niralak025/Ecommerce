import axiosInstance from './ApiInstance.tsx';

interface ApiResponse {
  data: any;
}

export default class WSCall {
  static async getResponse(
    apiName: string,
    params: Record<string, any> = {},
    requestType: 'get' | 'post' = 'get',
    completion: (data: any, error: any) => void,
  ): Promise<void> {
    const accessToken = '';
    console.log('accessToken: ', accessToken);

    try {
      let response: ApiResponse | undefined;

      if (requestType === 'post') {
        console.log('📤 Sending POST request:', apiName, params);
        response = await axiosInstance.post(apiName, params, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } else {
        console.log('📤 Sending GET request:', apiName, params);
        response = await axiosInstance.get(apiName, {
          params,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }

      if (!response || !response.data) {
        console.warn('⚠️ Warning: No response data received.');
        return completion(null, { message: 'No data received' });
      }

      completion(response.data, null);
    } catch (error: any) {
      console.error('❌ API Error:', error.message);
      const errorMsg = error.response?.data || error.message || 'Unknown error';
      completion(null, { message: errorMsg });
    }
  }

  static async postResponse(
    apiName: string,
    params: any,
    requestType: 'get' | 'post' = 'get',
    completion: (data: any, error: any) => void,
  ): Promise<void> {
    const accessToken = '';
    console.log('accessToken from Redux store:', accessToken);
    try {
      let response: ApiResponse | undefined;
      if (requestType === 'post') {
        console.log('📤 Sending POST request:', apiName, params);
        response = await axiosInstance.post(apiName, params, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } else {
        console.log('📤 Sending GET request:', apiName, params);
        response = await axiosInstance.get(apiName, {
          params,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }

      if (!response || !response.data) {
        console.warn('⚠️ Warning: No response data received.');
        return completion(null, { message: 'No data received' });
      }

      completion(response.data, null);
    } catch (error: any) {
      console.error('❌ API Error:', error.message);
      const errorMsg = error.response?.data || error.message || 'Unknown error';
      completion(null, { message: errorMsg });
    }
  }

  static async postResponseUpload(
    apiName: string,
    params: Record<string, any> = {},
    requestType: 'post',
    completion: (data: any, error: any) => void,
  ): Promise<void> {
    const accessToken = ''; //TODO: get access token from redux store or local storage
    console.log('accessToken: ', accessToken);

    console.log('📤 Sending Image Upload request:', apiName, params);
    try {
      let response: ApiResponse | undefined;
      console.log('📤 Sending POST request:', apiName, params);
      response = await axiosInstance.post(apiName, params, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
        transformRequest: data => data,
      });

      if (!response || !response.data) {
        console.warn('⚠️ Warning: No response data received.');
        return completion(null, { message: 'No data received' });
      }

      completion(response.data, null);
    } catch (error: any) {
      console.error('❌ API Error:', error.message);
      const errorMsg = error.response?.data || error.message || 'Unknown error';
      completion(null, { message: errorMsg });
    }
  }
}
