import axios from "axios";
import { toast } from "react-toastify";
import * as actions from "../actions/apiActions";

const api = ({ dispatch, getState }) => (next) => async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    let {
        url,
        method,
        data,
        params,
        onStart,
        onSuccess,
        onError,
        onStartDispatch,
        onErrorDispatch,
        onSuccessDispatch,
        headers,
        displayToast,
        authorizationHeader,
        meta,
    } = action.payload;

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
            headers,
        });

        const responseData = response.data;
        const payloadData = params || data;
        const fullResponseData = { ...responseData, requestData: payloadData };

        if (responseData.error) {
            dispatch(actions.apiCallFailed(responseData.message));

            if (onError) onError(responseData);
            if (onErrorDispatch) dispatch({ type: onErrorDispatch, payload: responseData, meta });

            if (displayToast) {
                toast.error(responseData.message);
            }
        } else {
            dispatch(actions.apiCallSuccess(fullResponseData));

            if (onSuccess) onSuccess(responseData);
            if (onSuccessDispatch) {
                dispatch({ type: onSuccessDispatch, payload: fullResponseData, meta }); // Include meta here
            }

            if (displayToast) {
                toast.success(responseData.message);
            }
        }
    } catch (error) {
        console.error("API Error:", error);

        const errorMessage = error.response?.data || error.message;

        dispatch(actions.apiCallFailed(errorMessage));

        if (onError) onError({ message: errorMessage });
        if (onErrorDispatch) dispatch({ type: onErrorDispatch, payload: { message: errorMessage }, meta });

        if (displayToast) {
            toast.error(errorMessage);
        }
    }
};

export default api;
