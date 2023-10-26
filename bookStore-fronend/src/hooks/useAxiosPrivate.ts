import { axiosPrivate } from "../apis/axios";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useStore";
import { logOut } from "../stores/slices/authSlice";

const useAxiosPrivate = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        // console.log("!!!",config.headers["Authorization"]);

        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const pervRequest = error?.config;

        if (error?.response?.status === 401 && !pervRequest?.sent) {
          pervRequest.sent = true;
          dispatch(logOut());
          // const newAccessToken = await refresh();
          // // console.log(newAccessToken);

          // pervRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosPrivate(pervRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return axiosPrivate;
};

export default useAxiosPrivate;
