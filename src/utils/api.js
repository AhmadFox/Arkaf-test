import { store } from "@/store/store"

export const GET_SETTINGS = "get_system_settings"
export const GET_PROFILE = "get-user-data"
export const USER_SIGNUP = "register"
export const USER_VERIFY_CODE = "verify-code"
export const USER_RESEND_CODE = "resend-code"
export const USER_LOGIN = "login"
export const USER_LOGOUT = "logout"
export const FORGOT_PASSWORD = "forgot-password"
export const RESET_PASSWORD = 'change-password'
export const UPDATE_PROFILE = "update_profile"
export const GET_SLIDERS = "get_slider"
export const GET_CATEGORES = "get_categories"
export const GET_PROPETRES = "get_property"
export const POST_ADDITION_REQUEST = "post_property_addition_request"
export const POST_PROPERTY_REQUEST = "post_property_request"
export const GET_ARTICLES = "get_articles"
export const GET_CITIES = "cities"
export const GET_COUNT_BY_CITIES_CATEGORIS = "get_count_by_cities_categoris"
export const ADD_FAVOURITE = "add_favourite"
export const GET_LANGUAGES = "get_languages"
export const CONTACT_US = "contct_us"
export const GET_FAV = "get_favourite_property"
export const GET_PACKAGES = "get_package";
export const GET_PAYMENT_SETTINGS = "get_payment_settings";
export const CREATEPAYMENT = "createPaymentIntent";
export const CONFIRMPAYMENT = "confirmPayment"
export const POST_PROPERTY = "post_property"
export const GET_FACILITITES = "get_facilities"
export const GET_LIMITS = "get_limits"
export const GET_PAYMENT_DETAILS = "get_payment_details";
export const UPDATE_POST_PROPERTY = "update_post_property";
export const DELETE_PROPERTY = "delete_property"
export const DELETE_PROJECT = "delete_project"
export const INTEREST_PROPERTY = "interested_users"
export const STORE_ADVERTISEMENT = "store_advertisement"
export const GET_NOTIFICATION_LIST = "get_notification_list"
export const ASSIGN_FREE_PACKAGE = "assign_package"
export const GET_CHATS = "get_chats"
export const GET_CHATS_MESSAGES = "get_messages"
export const SEND_MESSAGE = "send_message"
export const DELETE_MESSAGES = "delete_chat_message"
export const DELETE_USER = "delete_user"
export const GET_REPORT_REASONS = "get_report_reasons"
export const ADD_REPORT = "add_reports"
export const GET_NEARBY_PROPERTIES = "get_nearby_properties"
export const GET_SEO_SETTINGS = "get_seo_settings"
export const SET_PROPERTY_TOTAL_CLICKS = "set_property_total_click"
export const UPDATE_PROPERTYY_STATUS = "update_property_status"
export const GET_INTREESTED_USERS = "get_interested_users"
export const POST_PROJECT = "post_project"
export const GET_PROJECTS = "get_projects"
export const USER_INTREST = "personalised-fields"
export const GET_USER_RECOMMENDATION = "get_user_recommendation"
export const GET_PROPERTY_ADDITION_REQUEST = "get_property_addition_request"
export const GET_PROPERTY_REQUEST = "get_property_request"
export const GET_AGENT = "agent"
export const GET_AGENTS = "agents"


// is login user check
export const getUserID = () => {
    let user = store.getState()?.User_signup
    if (user) {
        try {
            return user?.data?.data?.id
        } catch (error) {
            return null;
        }
    } else {
        return null
    }

}

// GET SETTINGS
export const getSettingApi = (user_id) => {
    return {
        url: `${GET_SETTINGS}`,
        method: "POST",
        data: {
            // type: type,
            user_id: user_id,
        },
        authorizationHeader: false,

    }
}

// USER SIGNUP
export const user_signupApi = (user_type, email, mobile, password, password_confirmation, type, firebase_id) => {
    let data = new FormData();
    data.append("user_type", user_type);
    data.append("email", email);
    data.append("mobile", mobile);
    data.append("password", password);
    data.append("password_confirmation", password_confirmation);
    data.append("type", type);
    data.append("firebase_id", firebase_id);
    return {
        url: `${USER_SIGNUP}`,
        method: 'POST',
        data,
        authorizationHeader: false,

    }
}

// USER VERIFY
export const user_verifyCodeApi = (email, code) => {
    let data = new FormData();
    data.append("email", email);
    data.append("code", code);
    return {
        url: `${USER_VERIFY_CODE}`,
        method: 'POST',
        data,
        authorizationHeader: false,

    }
}

// USER RESEND
export const user_resendCodeApi = (email) => {
    let data = new FormData();
    data.append("email", email);
    return {
        url: `${USER_RESEND_CODE}`,
        method: 'POST',
        data,
        authorizationHeader: false,

    }
}

// USER LOGIN
export const user_loginApi = (email, password) => {
    let data = new FormData();
    data.append("email", email);
    data.append("password", password);
    return {
        url: `${USER_LOGIN}`,
        method: 'POST',
        data,
        authorizationHeader: false,

    }
}

// USER LOGOUT
export const user_logoutApi = () => {
    return {
        url: `${USER_LOGOUT}`,
        method: 'POST',
        authorizationHeader: true,

    }
}

// USER FORGOT_PASSWORD
export const user_forgotPasswordApi = (email) => {
    let data = new FormData();
    data.append("email", email);
    return {
        url: `${FORGOT_PASSWORD}`,
        method: 'POST',
        data,
        authorizationHeader: false,

    }
}

// USER RESET_PASSWORD
export const user_resetPasswordApi = (email, code, password, passwordConfirmation) => {
    let data = new FormData();
    data.append("email", email);
    data.append("code", code);
    data.append("password", password);
    data.append("password_confirmation", passwordConfirmation);
    return {
        url: `${RESET_PASSWORD}`,
        method: 'POST',
        data,
        authorizationHeader: false,

    }
}

// UPDATE PROFILE
export const update_profile = (name, mobile, city_id, fcm_id, address, firebase_id, notification, about_me, facebook_id, twiiter_id, instagram_id, pintrest_id, latitude, longitude, city, state, country, profile, Agency_name, experience, specialties) => {
    let data = new FormData();
    data.append("name", name);
    data.append("mobile", mobile);
    data.append("fcm_id", fcm_id);
    data.append("address", address);
    data.append("firebase_id", firebase_id);
    data.append("notification", notification);
    data.append("about_me", about_me);
    data.append("facebook_id", facebook_id);
    data.append("twiiter_id", twiiter_id);
    data.append("instagram_id", instagram_id);
    data.append("pintrest_id", pintrest_id);
    data.append("latitude", latitude);
    data.append("longitude", longitude);
    data.append("city", city);
    data.append("city_id", city_id);
    data.append("state", state);
    data.append("country", country);
    data.append("Agency_name", Agency_name);
    data.append("experience", experience);
    data.append("specialties", specialties);
    data.append("profile", profile);
    return {
        url: `${UPDATE_PROFILE}`,
        method: 'POST',
        data,
        authorizationHeader: true,

    }
}

// GET Slider 

export const getSliderApi = () => {

    return {
        url: `${GET_SLIDERS}`,
        method: "GET",
        params: {

        },
        authorizationHeader: false,

    }
}

// GET CATEGORIES

export const getCategorieApi = () => {

    return {
        url: `${GET_CATEGORES}`,
        method: "GET",
        params: {

        },
        authorizationHeader: false,

    }
}

// GET USER PROFILE
export const getProfileApi = () => {

    return {
        url: `${GET_PROFILE}`,
        method: "GET",
        params: {

        },
        authorizationHeader: true,

    }
}

// get Propertyes 
export const getAllProperties = (
    is_featured,
    promoted,
    top_rated,
    id,
    category_id,
    most_liked,
    city,
    city_id,
    get_simiilar,
    offset,
    limit,
    current_user,
    property_type,
    max_price,
    min_price,
    posted_since,
    country,
    search,
    userid,
    users_promoted,
    slug_id,
    category_slug_id,
    filter_type,
) => {

    return {
        url: `${GET_PROPETRES}`,
        method: "GET",
        params: {
            is_featured,
            promoted,
            top_rated,
            id,
            category_id,
            most_liked,
            city,
            city_id,
            get_simiilar,
            offset,
            limit,
            current_user,
            property_type,
            max_price,
            min_price,
            posted_since,
            country,
            search,
            userid,
            users_promoted,
            slug_id,
            category_slug_id,
            filter_type,
        },
        authorizationHeader: false,

    }
}

// GET ARTICLES
export const getArticlesApi = (id, category_id, get_simiilar, slug_id) => {

    return {
        url: `${GET_ARTICLES}`,
        method: "GET",
        params: {
            id: id,
            category_id: category_id,
            get_simiilar: get_simiilar,
            slug_id: slug_id,
        },
        authorizationHeader: false,

    }
}

// GET CITIES
export const getCities = () => {
    return {
        url: `${GET_CITIES}`,
        method: "GET",
        params: {

        },
        authorizationHeader: false,

    }
}

// GET AGENT
export const getAgent = (agentId) => {
    return {
        url: `${GET_AGENT}/${agentId}`,
        method: "GET",
        params: {

        },
        authorizationHeader: false,

    }
}

// GET AGENT
export const getAgents = (offset, limit, city_id, search) => {
    return {
        url: `${GET_AGENTS}`,
        method: "GET",
        params: {
            offset: offset,
            limit: limit,
            city_id: city_id,
            search: search,
        },
        authorizationHeader: false,

    }
}

// GET ADDITION REQUEST
export const getPropertyAdditionRequest = (offset, limit, userid) => {
    return {
        url: `${GET_PROPERTY_ADDITION_REQUEST}`,
        method: "GET",
        params: {
            userid: userid,
            offset: offset,
            limit: limit
        },
        authorizationHeader: true,

    }
}

// GET PROPERTY REQUEST
export const getPropertyPropertyRequest = (offset, limit, userid) => {
    return {
        url: `${GET_PROPERTY_REQUEST}`,
        method: "GET",
        params: {
            userid: userid,
            offset: offset,
            limit: limit
        },
        authorizationHeader: true,

    }
}

// GET_COUNT_BY_CITIES_CATEGORIS
export const getCountByCitysCategories = () => {
    return {
        url: `${GET_COUNT_BY_CITIES_CATEGORIS}`,
        method: "GET",
        params: {

        },
        authorizationHeader: false,

    }
}

// ADD_FAVOURITE
export const addFavourite = (property_id, type) => {
    return {
        url: `${ADD_FAVOURITE}`,
        method: "POST",
        data: {
            property_id: property_id,
            type: type
        },
        authorizationHeader: true,

    }
}

// GET_LANGUAGES

export const getLanguages = (language_code, web_language_file) => {
    return {
        url: `${GET_LANGUAGES}`,
        method: "GET",
        params: {
            language_code: language_code,
            web_language_file: web_language_file
        },
        authorizationHeader: false,

    }
}


// CONTACT US 
export const ContactUs = (first_name, last_name, email, subject, message) => {
    let data = new FormData();
    data.append("first_name", first_name);
    data.append("last_name", last_name);
    data.append("email", email);
    data.append("subject", subject);
    data.append("message", message);
    return {
        url: `${CONTACT_US}`,
        method: 'POST',
        data,
        authorizationHeader: false,

    }
}

// GET_FAV_PROPERTY

export const getFav = (offset, limit) => {
    return {
        url: `${GET_FAV}`,
        method: "GET",
        params: {
            offset: offset,
            limit: limit
        },
        authorizationHeader: true,

    }
}

// GET_PACKAGES

export const getPackages = () => {
    let getuserid = getUserID();
    return {
        url: `${GET_PACKAGES}`,
        method: "GET",
        params: {
            current_user: getuserid
        },
        authorizationHeader: false,
    }
}

// GET_PAYMENT_SETTINGS
export const getPaymentSettings = () => {
    return {
        url: `${GET_PAYMENT_SETTINGS}`,
        method: "GET",
        params: {},
        authorizationHeader: true,
    }
}

// CREATEPAYMENT
export const createPaymentIntent = (description, name, address1, postalcode, city, state, country, amount, currency, card, packageID) => {
    let data = new FormData();
    data.append("description", description);
    data.append("shipping[name]", name);
    data.append("shipping[address][line1]", address1);
    data.append("shipping[address][postal_code]", postalcode);
    data.append("shipping[address][city]", city);
    data.append("shipping[address][state]", state);
    data.append("shipping[address][country]", country);
    data.append("amount", amount);
    data.append("currency", currency);
    data.append("payment_method_types[]", card);
    data.append("package_id", packageID);
    return {
        url: `${CREATEPAYMENT}`,
        method: "POST",
        data,
        authorizationHeader: true,
    }
}

// CONFIRMPAYMENT
export const confirmPayment = (paymentIntentId) => {
    let data = new FormData();
    data.append("paymentIntentId", paymentIntentId);

    return {
        url: `${CONFIRMPAYMENT}`,
        method: "POST",
        data,
        authorizationHeader: true,
    }
}
// POST PROPERTY
export const postProperty = (
    userid,
    title,
    description,
    city,
    city_id,
    size,
    state,
    country,
    latitude,
    longitude,
    address,
    price,
    category_id,
    property_type,
    video_link,
    parameters,
    facilities,
    title_image,
    threeD_image,
    gallery_images,
    property_layout, // new attribute by @ahmad_gharaibeh
    meta_title,
    meta_description,
    meta_keywords,
    meta_image,
    rentduration,
    is_premium,
    status,
    built_in,
    second_contact_number,
    contact_name
) => {
    let data = new FormData();

    // Append the property data to the FormData object
    data.append('userid', userid);
    data.append('size', size);
    data.append('title', title);
    data.append('description', description);
    data.append('city', city);
    data.append('city_id', city_id);
    data.append('state', state);
    data.append('country', country);
    data.append('latitude', latitude);
    data.append('longitude', longitude);
    data.append('address', address);
    data.append('price', price);
    data.append('category_id', category_id);
    data.append('property_type', property_type);
    data.append('video_link', video_link);
    data.append('meta_title', meta_title);
    data.append('meta_description', meta_description);
    data.append('meta_keywords', meta_keywords);
    data.append('meta_image', meta_image);
    data.append('rentduration', rentduration);
    data.append('is_premium', is_premium);
    data.append('status', status);
    data.append('built_in', built_in);
    data.append('second_contact_number', second_contact_number);
    data.append('contact_name', contact_name);

    // Append the parameters array if it is an array
    if (Array.isArray(parameters)) {
        parameters.forEach((parameter, index) => {
            data.append(`parameters[${index}][parameter_id]`, parameter.parameter_id);
            data.append(`parameters[${index}][value]`, parameter.value);
        });
    }
    // Append the facilities array if it is an array
    if (Array.isArray(facilities)) {
        facilities.forEach((facility, index) => {
            data.append(`facilities[${index}][facility_id]`, facility.facility_id);
            data.append(`facilities[${index}][distance]`, facility.distance);
        });
    }
    data.append('title_image', title_image);
    data.append('threeD_image', threeD_image);

    // Check if gallery_images is defined and an array before using forEach
    if (Array.isArray(gallery_images)) {
        gallery_images.forEach((image, index) => {
            data.append(`gallery_images[${index}]`, image);
        });
    }

    // Check if layouts_images is defined and an array before using forEach
    // if (Array.isArray(property_layout)) {
    //     property_layout.forEach((image, index) => {
    //         data.append(`property_layout[${index}]`, image);
    //     });
    // }

    // Append the layouts array if it is an array
    if (Array.isArray(property_layout)) {
        property_layout.forEach((layout, index) => {
            data.append(`property_layout[${index}][image]`, layout.image);
            data.append(`property_layout[${index}][name]`, layout.name);
            data.append(`property_layout[${index}][price]`, layout.price);
            data.append(`property_layout[${index}][size]`, layout.size);
            
            layout.parameters.forEach((parameter, idx) => {
                console.log(`parameters[${idx}]`, parameter);
                data.append(`property_layout[${index}][parameters][${idx}][parameter_id]`, parameter.parameter_id);
                data.append(`property_layout[${index}][parameters][${idx}][value]`, parameter.value);
            })
        });
    }
    
    return {
        url: `${POST_PROPERTY}`,
        method: 'POST',
        data,
        authorizationHeader: true,
    };
};


// POST ADITIONAL REQUIST
export const postAdditionRequest = (
    property_type,
    full_name,
    phone_number,
    size,
    category_id,
    address,
    latitude,
    longitude,
    rentduration,
    request_to,
) => {
    let data = new FormData();

    // Append the property data to the FormData object
    data.append('property_type', property_type);
    data.append('full_name', full_name);
    data.append('phone_number', phone_number);
    data.append('size', size);
    data.append('category_id', category_id);
    data.append('address', address);
    data.append('latitude', latitude);
    data.append('longitude', longitude);
    data.append('rentduration', rentduration);
    data.append('request_to', request_to);
    
    return {
        url: `${POST_ADDITION_REQUEST}`,
        method: 'POST',
        data,
        authorizationHeader: true,
    };
};

// POST PROPERTY REQUIST
export const postPropertyRequest = (
    category_id,
    property_type,
    size,
    full_name,
    phone_number,
    address,
    rentduration,
    max_price,
) => {
    let data = new FormData();

    // Append the property data to the FormData object
    data.append('category_id', category_id);
    data.append('property_type', property_type);
    data.append('size', size);
    data.append('full_name', full_name);
    data.append('phone_number', phone_number);
    data.append('address', address);
    data.append('rentduration', rentduration);
    data.append('max_price', max_price);
    
    return {
        url: `${POST_PROPERTY_REQUEST}`,
        method: 'POST',
        data,
        authorizationHeader: true,
    };
};



// GET_COUNT_BY_CITIES_CATEGORIS
export const getFacilities = () => {
    return {
        url: `${GET_FACILITITES}`,
        method: "GET",
        params: {

        },
        authorizationHeader: false,

    }
}

// get limits api 
export const getLimits = (package_type) => {
    return {
        url: `${GET_LIMITS}`,
        method: "GET",
        params: {
            package_type: package_type
        },
        authorizationHeader: true,

    }
}

// get payment detaisl
export const getPaymentDetials = (offset, limit) => {
    return {
        url: `${GET_PAYMENT_DETAILS}`,
        method: "GET",
        params: {
            offset: offset,
            limit: limit
        },
        authorizationHeader: true,
    }
}


// UPDATE POST PROPERTY
export const updatePostProperty = (
    id,
    action_type,
    title,
    size,
    description,
    price,
    category_id,
    property_type,
    rentduration,
    title_image,
    threeD_image,
    gallery_images,
    built_in,
    second_contact_number,
    contact_name,
    city,
    city_id,
    state,
    country,
    latitude,
    longitude,
    address,
    video_link,
    parameters,
) => {
    let data = new FormData();

    // Append the property data to the FormData object
    data.append('id', id);
    data.append('action_type', action_type);
    data.append('title', title);
    data.append('size', size);
    data.append('description', description);
    data.append('city', city);
    data.append('city_id', city_id);
    data.append('state', state);
    data.append('country', country);
    data.append('latitude', latitude);
    data.append('longitude', longitude);
    data.append('address', address);
    data.append('price', price);
    data.append('category_id', category_id);
    data.append('property_type', property_type);
    data.append('video_link', video_link);
    data.append('rentduration', rentduration);
    data.append('built_in', built_in);
    data.append('second_contact_number', second_contact_number);
    data.append('contact_name', contact_name);

    // Append the parameters array if it is an array
    if (Array.isArray(parameters)) {
        parameters.forEach((parameter, index) => {
            data.append(`parameters[${index}][parameter_id]`, parameter.parameter_id);
            data.append(`parameters[${index}][value]`, parameter.value);
        });
    }
    // Append the facilities array if it is an array
    // if (Array.isArray(facilities)) {
    //     facilities.forEach((facility, index) => {
    //         data.append(`facilities[${index}][facility_id]`, facility.facility_id);
    //         data.append(`facilities[${index}][distance]`, facility.distance);
    //     });
    // }
    data.append('title_image', title_image);
    data.append('threeD_image', threeD_image);

    // Check if gallery_images is defined and an array before using forEach
    if (Array.isArray(gallery_images)) {
        gallery_images.forEach((image, index) => {
            data.append(`gallery_images[${index}]`, image);
        });
    }


    return {
        url: `${UPDATE_POST_PROPERTY}`,
        method: 'POST',
        data,
        authorizationHeader: true,
    };
};


// DELETE_PROPERTY
export const deleteProperty = (id) => {
    let data = new FormData();
    data.append("id", id);

    return {
        url: `${DELETE_PROPERTY}`,
        method: "POST",
        data,
        authorizationHeader: true,
    }
}

// DELETE_PROJECT
export const deleteProject = (id) => {
    let data = new FormData();
    data.append("id", id);

    return {
        url: `${DELETE_PROJECT}`,
        method: "POST",
        data,
        authorizationHeader: true,
    }
}
// FEATURE PROPERTY
export const featureProperty = (property_id, type, image) => {
    let data = new FormData();
    data.append("property_id", property_id);
    data.append("type", type);
    data.append("image", image);

    return {
        url: `${STORE_ADVERTISEMENT}`,
        method: "POST",
        data,
        authorizationHeader: true,
    }
}


// Intrested Property
export const intrestedProperty = (property_id, type) => {
    let data = new FormData();
    data.append("property_id", property_id);
    data.append("type", type);

    return {
        url: `${INTEREST_PROPERTY}`,
        method: "POST",
        data,
        authorizationHeader: true,
    }
}
// get notification list
export const getNotificationList = (userid, offset, limit) => {

    // data.append("userid", userid);

    return {
        url: `${GET_NOTIFICATION_LIST}`,
        method: "GET",
        params: {
            userid: userid,
            offset: offset,
            limit: limit
        },
        authorizationHeader: true,
    }
}
// assign free package 
export const assignFreePackage = (package_id) => {
    let data = new FormData();
    data.append("package_id", package_id);

    return {
        url: `${ASSIGN_FREE_PACKAGE}`,
        method: "POST",
        data,
        authorizationHeader: true,
    }
}

// GET CHAT LIST
export const getChatList = (search) => {

    return {
        url: `${GET_CHATS}`,
        method: "GET",
        params: {
            search: search
        },
        authorizationHeader: true,

    }
}
// GET CHAT messages
export const getChatMessages = (user_id, property_id, page, per_page) => {

    return {
        url: `${GET_CHATS_MESSAGES}`,
        method: "GET",
        params: {
            user_id: user_id,
            property_id: property_id,
            page: page,
            per_page: per_page
        },
        authorizationHeader: true,

    }
}

// USER SIGNUP
export const sendMessage = (sender_id, receiver_id, message, property_id, file, audio) => {
    let data = new FormData();

    data.append("sender_id", sender_id);
    data.append("receiver_id", receiver_id);
    data.append("message", message);
    data.append("property_id", property_id);
    data.append("file", file);
    data.append("audio", audio);
    return {
        url: `${SEND_MESSAGE}`,
        method: 'POST',
        data,
        authorizationHeader: true,

    }
}
// DELETE CHAT messages
export const deleteChatMessages = (sender_id, receiver_id, property_id) => {
    let data = new FormData();

    data.append("sender_id", sender_id);
    data.append("receiver_id", receiver_id);
    data.append("property_id", property_id);
    return {
        url: `${DELETE_MESSAGES}`,
        method: 'POST',
        data,
        authorizationHeader: true,

    }
}
// Delete user api 
export const deleteUser = (userid) => {
    let data = new FormData();
    data.append("userid", userid);

    return {
        url: `${DELETE_USER}`,
        method: "POST",
        data,
        authorizationHeader: true,
    }
}

// Get Report Reasons list 
export const getReportReasons = () => {
    return {
        url: `${GET_REPORT_REASONS}`,
        method: "GET",
        params: {

        },
        authorizationHeader: false,

    }
}
// ADD Report 
export const addReport = (reason_id, property_id, other_message) => {
    let data = new FormData();
    data.append("reason_id", reason_id);
    data.append("property_id", property_id);
    data.append("other_message", other_message);
    return {
        url: `${ADD_REPORT}`,
        method: "POST",
        data,
        authorizationHeader: true,

    }
}

// GET_NEARBY_PROPERTIES    
export const getNearbyProperties = (
    city, 
    type, 
    max_price, 
    min_price, 
    property_type, 
    search, 
    parameter_id, 
    price_sort, 
    userid, 
    filter_type, 
    city_id, 
) => {
    return {
        url: `${GET_NEARBY_PROPERTIES}`,
        method: "GET",
        params: {
            city, 
            type, 
            max_price, 
            min_price, 
            property_type, 
            search, 
            parameter_id, 
            price_sort, 
            userid, 
            filter_type, 
            city_id,
        },
        authorizationHeader: false,
    }
}
// set property clicks     
export const setPropertyTotalClicks = (slug_id) => {
    let data = new FormData();
    data.append("slug_id", slug_id);
    return {
        url: `${SET_PROPERTY_TOTAL_CLICKS}`,
        method: "POST",
        data,
        authorizationHeader: false,
    }
}
// set property status     
export const changePropertyStatus = (property_id, status, is_visible) => {
    let data = new FormData();
    data.append("property_id", property_id);
    data.append("status", status);
    data.append("is_visible", is_visible);
    return {
        url: `${UPDATE_PROPERTYY_STATUS}`,
        method: "POST",
        data,
        authorizationHeader: true,
    }
}


// get details of intrested users 
export const getIntretsedUsers = (property_id, slug_id, limit, offset) => {

    return {
        url: `${GET_INTREESTED_USERS}`,
        method: "GET",
        params: {
            property_id: property_id,
            slug_id: slug_id,
            limit: limit,
            offset: property_id
        },
        authorizationHeader: true,
    }
}



// POST PROJECT
export const postProject = (id, title, description, category_id, type, meta_title, meta_description, meta_keywords, meta_image, city, state, country, latitude, longitude, location, video_link, image, plans, documents, gallery_images, remove_documents, remove_gallery_images, remove_plans) => {
    let data = new FormData();

    // Append the property data to the FormData object
    data.append('id', id);
    data.append('title', title);
    data.append('description', description);
    data.append('category_id', category_id);
    data.append('type', type);

    data.append('meta_title', meta_title);
    data.append('meta_description', meta_description);
    data.append('meta_keywords', meta_keywords);
    data.append('meta_image', meta_image);

    data.append('city', city);
    data.append('state', state);
    data.append('country', country);
    data.append('latitude', latitude);
    data.append('longitude', longitude);
    data.append('location', location);

    data.append('video_link', video_link);
    data.append('image', image);

    // Append the parameters array if it is an array
    if (Array.isArray(plans)) {
        plans.forEach((plans, index) => {
            data.append(`plans[${index}][id]`, plans.id);
            data.append(`plans[${index}][title]`, plans.title);
            data.append(`plans[${index}][document]`, plans.document);
        });
    }

    // Check if gallery_images is defined and an array before using forEach
    if (Array.isArray(documents)) {
        documents.forEach((image, index) => {
            data.append(`documents[${index}]`, image);
        });
    }
    // Check if gallery_images is defined and an array before using forEach
    if (Array.isArray(gallery_images)) {
        gallery_images.forEach((image, index) => {
            data.append(`gallery_images[${index}]`, image);
        });
    }
    data.append('remove_documents', remove_documents);
    data.append('remove_gallery_images', remove_gallery_images);
    data.append('remove_plans', remove_plans);



    return {
        url: `${POST_PROJECT}`,
        method: 'POST',
        data,
        authorizationHeader: true,
    };
};

// get Propertyes 
export const getAllProjects = (userid, id, slug_id, search, get_sililar, category_id, city, state, country, posted_since, offset, limit) => {

    return {
        url: `${GET_PROJECTS}`,
        method: "GET",
        params: {
            userid: userid,
            id: id,
            slug_id: slug_id,
            search: search,
            get_sililar: get_sililar,
            category_id: category_id,
            city: city,
            state: state,
            country: country,
            posted_since: posted_since,
            offset: offset,
            limit: limit

        },
        authorizationHeader: false,

    }
}


// AddUserIntrest   
export const AddUserIntrest = (category_ids, outdoor_facilitiy_ids, price_range, property_type, city) => {
    let data = new FormData();
    data.append("category_ids", category_ids);
    data.append("outdoor_facilitiy_ids", outdoor_facilitiy_ids);
    data.append("price_range", price_range);
    data.append("property_type", property_type);
    data.append("city", city);
    return {
        url: `${USER_INTREST}`,
        method: "POST",
        data,
        authorizationHeader: true,
    }
}
// getUser intrest 
export const GetUserIntrest = () => {
    
    return {
        url: `${USER_INTREST}`,
        method: "GET",
        params:{},
        authorizationHeader: true,
    }
}
// getUser intrest 
export const DeleteUserIntrest = () => {
    
    return {
        url: `${USER_INTREST}`,
        method: "DELETE",
        params:{},
        authorizationHeader: true,
    }
}

// GET get_user_recommendation
export const getUserRecommendation = (offset, limit) => {
    return {
        url: `${GET_USER_RECOMMENDATION}`,
        method: "GET",
        params: {
            offset:offset,
            limit:limit
        },
        authorizationHeader: true,

    }
}