import { useEffect } from 'react';
import * as serviceWorker from '../serviceWorker';

const useServiceWorker = () => {
  useEffect(() => {
    serviceWorker.register({
      onUpdate: () => {
        console.log('Updating');
        return window.location.reload();
      }
    })
  }, [])
}

export default useServiceWorker;
