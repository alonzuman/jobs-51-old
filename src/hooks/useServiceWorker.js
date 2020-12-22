import { useEffect } from 'react';
import * as serviceWorker from '../serviceWorker';

const useServiceWorker = () => {
  useEffect(() => {
    serviceWorker.register({
      onUpdate: () => {
        console.log('update available');
        return window.location.reload();
      }
    })
  }, [])
}

export default useServiceWorker;
