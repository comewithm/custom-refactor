import { useState, useEffect } from 'react';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  loading: boolean;
  run?: () => Promise<void>
}

interface RequestOptions {
  method?: string;
  headers?: { [key: string]: string };
  body?: string | FormData;
}

type ApiOptions = {
  params?: { [key: string]: any };
  manual?: boolean;
  isToken?: boolean;
} & RequestOptions

const useApiRequest = <T>(url: string, options: ApiOptions = {}): ApiResponse<T> => {
  const { params, manual, isToken, method = 'GET', headers = {}, body = '' } = options;
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  // 处理请求头
  const getRequestOptions = () => {
    const requestOptions: RequestOptions = {
      method,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body
    };

    if (isToken) {
      // TODO: 处理token问题
      requestOptions.headers = {
        ...requestOptions.headers,
        'BM_token': 'your_token_value',
      };
    }

    if (method.toUpperCase() === 'POST') {
      requestOptions.body = JSON.stringify(params);
    }
    return requestOptions
  }

  // 请求接口
  const sendRequest = async () => {
    setLoading(true);
    try {
      const requestOptions = getRequestOptions()

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (response.ok) {
        setData(responseData);
      } else {
        setError(responseData.error || 'Request failed');
      }
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!manual) {
      sendRequest();
    }
  }, [manual, url]);

  return { data, error, loading, run: sendRequest };
};

export default useApiRequest;