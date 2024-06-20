import { createSelector, createSlice, createAction } from "@reduxjs/toolkit";
import { 
    user_loginApi,
    user_signupApi,
    user_verifyCodeApi,
    user_resendCodeApi,
    user_resetPasswordApi,
    user_forgotPasswordApi,
} from "@/utils/api";
import { apiCallBegan } from "../actions/apiActions";
import { store } from "../store";

// initial state
const initialState = {
    data: null,
    loading: false,
};

// slice
export const authSlice = createSlice({
    name: "User_signup",
    initialState,
    reducers: {
        signupRequested: (user_signup) => {
            user_signup.loading = true;
        },
        signupSuccess: (user_signup, action) => {
            console.log(' action', action);
            console.log(' action.meta', action.meta);
            console.log(' action.meta.arg', action.meta?.arg);
            console.log(' action.meta.arg.email', action.meta?.arg?.email);
            user_signup.data = action.payload;
            if (action.meta && action.meta.arg) {
                user_signup.data.email = action.meta.arg.email; // Store email in state
            }
            user_signup.loading = false;
        },
        signupFailure: (user_signup) => {
            user_signup.loading = false;
        },
        updateDataSuccess: (user_signup, action) => {
            user_signup.data = action.payload;
        },
        userUpdateData: (user_signup, action) => {
            user_signup.data = {
                ...user_signup.data,
                ...action.payload.data,
            };
        },
        userLogout: () => {
            return initialState;
        },
    },
});

export const { signupRequested, signupSuccess, signupFailure, updateDataSuccess, userUpdateData, userLogout } = authSlice.actions;
export default authSlice.reducer;

// API CALLS
export const signupLoaded = (name, email, mobile, password, password_confirmation, type, firebase_id, onSuccess, onError, onStart) => {
    store.dispatch(
        apiCallBegan({
            ...user_signupApi(name, email, mobile, password, password_confirmation, type, firebase_id),
            displayToast: false,
            onStartDispatch: signupRequested.type,
            onSuccessDispatch: signupSuccess.type,
            onErrorDispatch: signupFailure.type,
            meta: { arg: { email } }, // Pass email in meta
            onStart,
            onSuccess,
            onError,
        })
    );
};

// API CALLS
export const verifyLoaded = (email, code, onSuccess, onError, onStart) => {
    store.dispatch(
        apiCallBegan({
            ...user_verifyCodeApi(email, code),
            displayToast: false,
            onStartDispatch: signupRequested.type,
            onSuccessDispatch: signupSuccess.type,
            onErrorDispatch: signupFailure.type,
            meta: { arg: { email } }, // Pass email in meta
            onStart,
            onSuccess,
            onError,
        })
    );
};

// // API CALLS
export const resendCodeLoaded = (email, onSuccess, onError, onStart) => {
    store.dispatch(
        apiCallBegan({
            ...user_resendCodeApi(email),
            displayToast: false,
            onStartDispatch: signupRequested.type,
            onSuccessDispatch: signupSuccess.type,
            onErrorDispatch: signupFailure.type,
            meta: { arg: { email } }, // Pass email in meta
            onStart,
            onSuccess,
            onError,
        })
    );
};

// // API CALLS
export const loginLoaded = (email, password, onSuccess, onError, onStart) => {
    store.dispatch(
        apiCallBegan({
            ...user_loginApi(email, password),
            displayToast: false,
            onStartDispatch: signupRequested.type,
            onSuccessDispatch: signupSuccess.type,
            onErrorDispatch: signupFailure.type,
            meta: { arg: { email } }, // Pass email in meta
            onStart,
            onSuccess,
            onError,
        })
    );
};

// API CALLS
export const forgotPasswordLoaded = (email, onSuccess, onError, onStart) => {
    store.dispatch(
        apiCallBegan({
            ...user_forgotPasswordApi(email),
            displayToast: false,
            onStartDispatch: signupRequested.type,
            onSuccessDispatch: signupSuccess.type,
            onErrorDispatch: signupFailure.type,
            meta: { arg: { email } }, // Pass email in meta
            onStart,
            onSuccess,
            onError,
        })
    );
};

// API CALLS
export const resetPasswordLoaded = (email, code, password, passwordConfirmation, onSuccess, onError, onStart) => {
    store.dispatch(
        apiCallBegan({
            ...user_resetPasswordApi(email, code, password, passwordConfirmation),
            displayToast: false,
            onStartDispatch: signupRequested.type,
            onSuccessDispatch: signupSuccess.type,
            onErrorDispatch: signupFailure.type,
            meta: { arg: { email } }, // Pass email in meta
            onStart,
            onSuccess,
            onError,
        })
    );
};



export const loadUpdateData = (data) => {
    store.dispatch(updateDataSuccess({ data }));
};
export const loadUpdateUserData = (data) => {
    store.dispatch(userUpdateData({ data }));
};
export const logoutSuccess = () => {
    store.dispatch(userLogout());
};


// Selectors
export const userSignUpData = createSelector(
    (state) => state.User_signup,
    (User_signup) => User_signup
);
