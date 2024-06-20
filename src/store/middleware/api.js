import axios from "axios";
import { toast } from "react-toastify";
import * as actions from "../actions/apiActions";

const api = ({ dispatch, getState }) => (next) => async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    let { url, method, data, params, onStart, onSuccess, onError, onStartDispatch, onErrorDispatch, onSuccessDispatch, headers, displayToast, authorizationHeader, meta } = action.payload;
    if (typeof displayToast === "undefined") displayToast = true;

    if (typeof authorizationHeader === "undefined" || authorizationHeader === true) {
        headers = {
            ...headers,
            Authorization: "Bearer " + getState().User_signup.data.token,
        };
    }

    if (onStartDispatch) dispatch({ type: onStartDispatch, meta });
    if (onStart) onStart();
    next(action);

    try {
        const response = await axios.request({
            baseURL: `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_END_POINT}`,
            url,
            method,
            data,
            params,
            onSuccess,
            onError,
            headers,
        });
        if (response.data.error) {
            dispatch(actions.apiCallFailed(response.data.message));

            if (onError) onError(response.data.message);
            if (onErrorDispatch) dispatch({ type: onErrorDispatch, payload: response.data.message, meta });

            if (displayToast) {
                toast.error(response.data.message);
            }
        } else {
            let payloadData;
            if (params) {
                payloadData = params;
            } else {
                payloadData = data;
            }
            let responseData = { ...response.data, requestData: payloadData };
            dispatch(actions.apiCallSuccess(responseData));

            if (onSuccess) onSuccess(response.data);
            if (onSuccessDispatch) {
                dispatch({ type: onSuccessDispatch, payload: responseData, meta });
            }

            if (displayToast) {
                toast.success(response.data.message);
            }
        }
    } catch (error) {
        console.log("error", error);

        dispatch(actions.apiCallFailed(error.response?.data));

        if (onError) onError(error.response?.data);
        if (onErrorDispatch) dispatch({ type: onErrorDispatch, payload: error.response?.data, meta });

        if (displayToast) {
            toast.error(error.response?.data);
        }
    }
};

export default api;
