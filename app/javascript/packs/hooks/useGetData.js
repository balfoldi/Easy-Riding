import { useEffect, useRef, useState } from "react";
import authStore from "../stores/Auth";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const useGetData = (url, reloadTick) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const isMounted = useRef(false);

  const fetchData = () => {
    setIsLoading(true);
    const userToken = Cookies.get("EasyRidingUserToken");
    fetch(`/api/${url}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${userToken}`
      },
    })
      .then((response) => {
        if (response.status === 401) {
          authStore.logout();
          history.push('/', {
            message: "Pour des raisons de sécurité, veuillez vous reconnecter pour continuer."
          });
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted.current) {
          setData(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted.current) {
          console.error(error);
          setIsLoading(false);
        }
      });
  }

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, [])

  useEffect(() => {
    fetchData();
  }, [reloadTick])

  return { isLoading, data };

}

export default useGetData;
