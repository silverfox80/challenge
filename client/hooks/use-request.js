import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  
  const doRequest = async () => {
    try {

      setErrors(null);
      const response = await axios[method](url, body);   //lookup where method === 'post', 'get', 'patch
      
      if(method==="delete" && onSuccess) {        
        onSuccess(null);
        return null;
      }

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;

    } catch (err) {
        //console.log(err);
        setErrors(
          <div className="alert alert-danger">
            <h4>Something went wrong</h4>
            <ul className="my-0">
              {err.response.data.errors && err.response.data.errors.map(err => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          </div>
        );
    }
  };

  return { doRequest, errors };
};

export default useRequest;