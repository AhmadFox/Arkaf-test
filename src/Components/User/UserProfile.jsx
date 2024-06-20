"use client"
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic.js";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Fcmtoken, settingsData } from "@/store/reducer/settingsSlice";
import LocationSearchBox from "@/Components/Location/LocationSearchBox";
import { UpdateProfileApi } from "@/store/actions/campaign";
import { loadUpdateUserData } from "@/store/reducer/authSlice";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { placeholderImage, translate } from "@/utils";
import { languageData } from "@/store/reducer/languageSlice";
import Image from "next/image";
import Swal from "sweetalert2";
import UserLayout from "../Layout/UserLayout.jsx";


const UserProfile = () => {
    const userData = useSelector((state) => state.User_signup);
    const userProfileData = userData?.data?.data;
    const navigate = useRouter();
    const FcmToken = useSelector(Fcmtoken)
    const [formData, setFormData] = useState({
        fullName: userProfileData?.name,
        email: userProfileData?.email,
        phoneNumber: userProfileData?.mobile,
        address: userProfileData?.address,
        aboutMe: userProfileData?.about_me,
        facebook: userProfileData?.facebook_id,
        instagram: userProfileData?.instagram_id,
        pintrest: userProfileData?.pintrest_id,
        twiiter: userProfileData?.twiiter_id,
        profileImage: userProfileData?.profile,

    });
    const fileInputRef = useRef(null);

    const [uploadedImage, setUploadedImage] = useState(userProfileData?.profile || null);

    const lang = useSelector(languageData);

    useEffect(() => { }, [lang]);
    const SettingsData = useSelector(settingsData);
    const PlaceHolderImg = SettingsData?.web_placeholder_logo;
    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData({
                    ...formData,
                    profileImage: file,
                });
                setUploadedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current.click(); // Trigger the file input click event
    };

    const handleLocationSelected = (locationData) => {
        setFormData({
            ...formData,
            selectedLocation: locationData,
        });
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setFormData({ ...formData, phoneNumber: value });
        }
    };

    const isLoggedIn = useSelector((state) => state.User_signup);
    const userCurrentId = isLoggedIn && isLoggedIn.data ? isLoggedIn.data.data.id : null;
    const handleUpdateProfile = (e) => {
        e.preventDefault();
        if (SettingsData.demo_mode) {
            Swal.fire({
                title: "Opps !",
                text: "This Action is Not Allowed in Demo Mode",
                icon: "warning",
                showCancelButton: false,
                customClass: {
                    confirmButton: 'Swal-confirm-buttons',
                    cancelButton: "Swal-cancel-buttons"
                },
                confirmButtonText: "OK",
            });
            return false;
        }
        UpdateProfileApi({

            userid: userCurrentId,
            name: formData.fullName,
            email: formData.email,
            mobile: formData.phoneNumber,
            address: formData.address,
            profile: formData.profileImage,
            latitude: formData.selectedLocation?.lat,
            longitude: formData.selectedLocation?.lng,
            about_me: formData.aboutMe ? formData.aboutMe : "",
            facebook_id: formData.facebook ? formData.facebook : "",
            twiiter_id: formData.twiiter ? formData.twiiter : "",
            instagram_id: formData.instagram ? formData.instagram : "",
            pintrest_id: formData.pintrest ? formData.pintrest : "",
            fcm_id: FcmToken,
            notification: "1",
            city: formData.selectedLocation?.city,
            state: formData.selectedLocation?.state,
            country: formData.selectedLocation?.country,
            onSuccess: (response) => {
                toast.success(translate("profileupdate"));
                loadUpdateUserData(response.data);
                navigate.push("/");
                setFormData({
                    fullName: "",
                    email: "",
                    phoneNumber: "",
                    address: "",
                    aboutMe: "",
                    facebook: "",
                    instagram: "",
                    pintrest: "",
                    twiiter: "",
                });
            },
            onError: (error) => {
                toast.error(error);

            }
        });

    };

    const inputStyle = `
        p-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]
    `;

    return (
        <UserLayout>
            <div className="container">
            <form>
                <div className="">
                    <div className="border rounded-xl" id="personal_info_card">
                        <div className="border-b px-4 py-3">
                            <h4 className="text-xl font-normal my-1">{translate("accountSettings")}</h4>
                        </div>
                        <div className="p-6 flex flex-col gap-y-6">
                            {/* Profile Picture */}
                            <div className="md:flex items-center gap-x-6">
                                <div className="relative w-32 pb-32 overflow-hidden rounded-lg mb-2 md:mb-0">
                                    <Image 
                                        loading="lazy"
                                        src={uploadedImage || PlaceHolderImg}
                                        alt="no_img"
                                        fill
                                        sizes=""
                                        onError={placeholderImage}
                                    />
                                </div>
                                <div className="">
                                    <input type="file" accept="image/jpeg, image/png" id="add_img" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageUpload} />
                                    <button type="button" className="tw-btn-outline !py-2 text-sm !px-6 mb-2" onClick={handleUploadButtonClick}>
                                        {translate("ChangeProfilePicture")}
                                    </button>

                                    <p className="text-red-500 text-xs">{translate("Note:")}</p>
                                </div>
                            </div>
                            {/* Form Fields */}
                            <div className="">
                                <label className='d-block mb-1 text-[#272835] text-sm'>{translate('fullName')}</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder={translate('enterFullName')}
                                    pattern="^[a-zA-Z]+$"
                                    className={inputStyle}
                                />
                            </div>
                            {/* <div className="">
                                <label className='d-block mb-1 text-[#272835] text-sm'>{translate('email')}</label>
                                <input
                                    readOnly={userProfileData?.logintype === "0" ? true : false}
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder={translate('enterEmail')}
                                    pattern="^[a-zA-Z]+$"
                                    className={inputStyle}
                                />
                            </div> */}
                            <div className="">
                                <label className='d-block mb-1 text-[#272835] text-sm'>{translate('phoneNumber')}</label>
                                <input
                                    readOnly={userProfileData?.logintype === "0" ? true : false}
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                    placeholder={translate('enterPhone')}
                                    className={inputStyle}
                                />
                            </div>
                            <div className="">
                                <label className='d-block mb-1 text-[#272835] text-sm'>{translate('address')}</label>
                                <LocationSearchBox onLocationSelected={handleLocationSelected}
                                    initialLatitude={userProfileData?.latitude}
                                    initialLongitude={userProfileData?.longitude}
                                    className={inputStyle}
                                />
                            </div>
                            <div className="">

                            </div>
                            {/* <div className="">
                                <label className='d-block mb-1 text-[#272835] text-sm'>{translate('address')}</label>
                                <input
                                    type="text"
                                    rows={4}
                                    className={inputStyle}
                                    name="address"
                                    placeholder={translate('enterAddress')}
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="mt-3 flex gap-x-2 justify-end">
                    <button
                        type="submit"
                        onClick={handleUpdateProfile}
                        className="tw-btn-solid w-32"
                        disabled
                    >
                        {translate("save")}
                    </button>
                </div>
            </form>
            </div>
        </UserLayout>
    );
};

export default UserProfile;
