"use client"
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import { placeholderImage, translate } from "@/utils";

import { userSignUpData } from "@/store/reducer/authSlice";
import { Fcmtoken, settingsData } from "@/store/reducer/settingsSlice";
import { UpdateProfileApi } from "@/store/actions/campaign";
import { loadUpdateUserData } from "@/store/reducer/authSlice";
import { languageData } from "@/store/reducer/languageSlice";

import InputTel from "../ui/InputTel.jsx";
import UserLayout from "../Layout/UserLayout.jsx";
import LocationSearchBox from "@/Components/Location/LocationSearchBox";

const UserProfile = () => {

    
    // const userData = useSelector((state) => state.User_signup);
    const signupData = useSelector(userSignUpData);
    const FcmToken = useSelector(Fcmtoken);
    const lang = useSelector(languageData);
    
    const fileInputRef = useRef(null);
    const [resetLocationValue, setresetLocationValue] = useState(false)
    const [disabledButtons, setDisabledButtons] = useState(true);
    const [uploadedImage, setUploadedImage] = useState(null);
    const user = signupData?.data?.data

    const [formData, setFormData] = useState({
        fullName: user?.name,
        email: user?.email,
        phoneNumber: user?.mobile,
        address: user?.address,
        profile: user?.profile
    });

    // useEffect(() => { }, [lang]);

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

    const handleFullName = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            fullName: value,
        });
       
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current.click(); // Trigger the file input click event
    };

    const handleLocationSelected = (locationData) => {
        console.log('=====', locationData);
        setFormData({
            ...formData,
            selectedLocation: locationData
        });
    };

    const handlePhone = (valid, value) => {
        valid &&
		setFormData({
            ...formData,
            phoneNumber: value
        })
	};

    // const isLoggedIn = useSelector((state) => state.User_signup);
    // const userCurrentId = isLoggedIn && isLoggedIn.data ? isLoggedIn.data.data.id : null;

    const handleDiscardUpdate = (e) => {
        e.preventDefault();
        setresetLocationValue(!resetLocationValue)
        setUploadedImage(user?.profile);
        fileInputRef.current.value = ''
        setFormData({
            fullName: user?.name,
            email: user?.email,
            phoneNumber: user?.mobile,
            address: user?.address,
            profileImage: user?.profile
        });
    }

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        console.log('formData.phoneNumber', formData.phoneNumber);
        setDisabledButtons(true);
        UpdateProfileApi({
            name: formData.fullName,
            mobile: formData.phoneNumber,
            fcm_id: FcmToken,
            address: formData.address,
            firebase_id: '2',
            notification: "1",
            about_me: formData.aboutMe ? formData.aboutMe : "",
            facebook_id: formData.facebook ? formData.facebook : "",
            twiiter_id: formData.twiiter ? formData.twiiter : "",
            instagram_id: formData.instagram ? formData.instagram : "",
            pintrest_id: formData.pintrest ? formData.pintrest : "",
            latitude: formData.selectedLocation?.lat,
            longitude: formData.selectedLocation?.lng,
            city: formData.selectedLocation?.city,
            state: formData.selectedLocation?.state,
            country: formData.selectedLocation?.country,
            profile: formData.profileImage,
            onSuccess: (response) => {
                toast.success(translate("profileupdate"));
                loadUpdateUserData(response);
                setDisabledButtons(true);
            },
            onError: (error) => {
                toast.error(error);
                setDisabledButtons(true);

            }
        });

    };

    useEffect(() => {
        const initialData = {
            fullName: user?.name,
            email: user?.email,
            phoneNumber: user?.mobile,
            address: user?.address,
            profileImage: user?.profile
        };

        const hasFormChanged = Object.keys(formData).some(
          key => formData[key] !== initialData[key]
        );
        setDisabledButtons(!hasFormChanged);
    }, [formData]);

    const inputStyle = `
        p-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]
    `

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
                                        src={uploadedImage || formData.profile || PlaceHolderImg}
                                        alt="no_img"
                                        fill
                                        sizes=""
                                        className="object-cover"
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
                                    onChange={handleFullName}
                                    placeholder={translate('enterFullName')}
                                    pattern="^[a-zA-Z]+$"
                                    className={inputStyle}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="">
                                    <label className='d-block mb-1 text-[#272835] text-sm'>{translate('email')}</label>
                                    <div className={`${inputStyle} bg-slate-100 opacity-60 select-none w-full`}>{formData.email}</div>
                                </div>
                                <div className="">
                                    <InputTel
                                        code={'+966'}
                                        label={'phoneNumber'}
                                        value={formData.phoneNumber}
                                        placeholder={'Ex: +966 000 000 000'}
                                        onValueChange={handlePhone}
                                        className="!py-1.5"
                                    />
                                </div>
                            </div>
                            <div className="">
                                <label className='d-block mb-1 text-[#272835] text-sm'>{translate('address')}</label>
                                <LocationSearchBox onLocationSelected={handleLocationSelected}
                                    initialLatitude={user?.latitude}
                                    initialLongitude={user?.longitude}
                                    className={inputStyle}
                                    reset={resetLocationValue}
                                />
                            </div>
                            <div className="">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3 flex gap-x-2 justify-end">
                    <button
                        onClick={handleDiscardUpdate}
                        className="tw-btn-outline w-36"
                        disabled={disabledButtons}
                    >
                        {translate("discard")}
                    </button>
                    <button
                        type="submit"
                        onClick={handleUpdateProfile}
                        className="tw-btn-solid w-36"
                        disabled={disabledButtons}
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
