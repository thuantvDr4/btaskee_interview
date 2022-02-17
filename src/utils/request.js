
import axios from "axios";
import { BASE_URL } from "@utils/constants";

/*
 * Todo : KHOI TAO AXIOS
 */
const Request = axios.create({
    baseURL: BASE_URL,
});

/*
 * --------------------------------------------> Xử lý trước khi REQUEST
 */
Request.interceptors.request.use(
    async (config) => {
        // config headers
        config.headers = {
            ...config.headers,
            Accept: "application/json, text/plain, */*",
            //   Authorization: globalVariable.kong_token,
            //   access_token: globalVariable.kong_token,
        };
        config.timeout = 30000; // set timeout = 30 sec
        //
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

/*
 * --------------------------------------------> Xử lý khi có RESPONSE
 */
Request.interceptors.response.use(
    //---------------------> RESPONSE
    function (response) {
        // console.log('--------------- RESPONSE', response);

        return response.data;
    },

    // ---------------> ERROR
    function (error) {
        console.log("ERROR------>", error);
        // console.log('--------------- ERROR.response', error.response);
        // todo:---------->XU LY KHI CO LOI

        //=----------> Network Error
        if (error && error.message === "Network Error") {
            // if (!globalVariable.isBackLogin) {
            console.log("Xử lý khi có RESPONSE: case1 -->", error);
            //
            const response = {
                header: null,
                data: {
                    status: 404, // 404: Network Error
                    message: "Network have problem!",
                    data: null,
                    version: "",
                },
            };
            //
            return Promise.reject(response);
        }

        //----------> NEW FIX TIMEOUT (2019.10.16)
        if (error && error.message === "timeout of 30000ms exceeded") {
            console.log("Xử lý khi-case6 -timeout->", error);

            const response = {
                header: null,
                data: {
                    status: 408, // 404: Network Error
                    message: "Can't connect to server, please try again later",
                    data: null,
                    version: "",
                },
            };

            return Promise.reject(response);
        }
        //
        return Promise.reject(error.response);
    }
);

export default Request;