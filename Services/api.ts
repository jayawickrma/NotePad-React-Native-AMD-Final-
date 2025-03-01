import axios, {AxiosError} from "axios";
import {Button, notification} from "antd";
import React from "react";
import {getToken, removeToken, saveToken} from "@/Services/tokenService";

export const api = axios.create({
    baseURL: "http://172.20.10.2:8080/api/v1/"
});

api.interceptors.request.use(
    async (config: any) => {
        if (!config.url?.includes("/auth")) {
            const token = await getToken();
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
);

api.interceptors.response.use((response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest.isRetry) {
            originalRequest.isRetry = true;

            const refreshToken = await getToken();
            if (refreshToken) {
                try {
                    const response: any = await api.post(
                        "auth/refresh-token",
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${refreshToken}`
                            }
                        }
                    );
                    const newAccessToken = response.data.accessToken;
                    saveToken(newAccessToken);
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                    return api(originalRequest);
                } catch (e) {
                    const error = e as AxiosError;
                    console.error("Token refresh failed:", error);
                    console.log("response error " , error.response);

                    if (!error.response) {
                        console.error("No response from server!");
                        localStorage.removeItem("jwt_token");
                        localStorage.removeItem("refresh_token");
                        showSuccessNotification();
                        return;
                    }

                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                        removeToken();
                        showSuccessNotification();
                    }
                }
            } else {
                removeToken();
                showSuccessNotification();
            }
        }
        return Promise.reject(error);
    }
)

export const showSuccessNotification = () => {
    const key = "Session Expired";

    notification.error({
        message: "Session Expired",
        description: "please login to the system.",
        placement: "bottomRight",
        key,
        btn: React.createElement(Button, {
            type: "primary",
            size: "small",
            onClick: () => {
                window.location.href = "/";
            },
            children: "Logout",
        }),
        duration:0,
    });
};
