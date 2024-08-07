"use client"
import React, { useEffect, useState, useRef, Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import { placeholderImage, translate } from "@/utils";

import { userSignUpData } from "@/store/reducer/authSlice";
import { Fcmtoken, settingsData } from "@/store/reducer/settingsSlice";
import { UpdateProfileApi, GetCitiesApi } from "@/store/actions/campaign";
import { loadUpdateUserData } from "@/store/reducer/authSlice";
import { languageData } from "@/store/reducer/languageSlice";

import InputTel from "../ui/InputTel.jsx";
import UserLayout from "../Layout/UserLayout.jsx";
import GoogleMapBox from "../Location/GoogleMapBox.jsx";
import LocationSearchBox from "../Location/LocationSearchBox";
import InputTag from "../ui/InputTag.jsx";

const UserProfile = () => {


    const GoogleMapApi = process.env.NEXT_PUBLIC_GOOGLE_API;
    const signupData = useSelector(userSignUpData);
    const FcmToken = useSelector(Fcmtoken);
    const lang = useSelector(languageData);
    
    const fileInputRef = useRef(null);
    const [resetLocationValue, setresetLocationValue] = useState(false)
    const [disabledButtons, setDisabledButtons] = useState(true);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [cities, setCities] = useState([]);
    const user = signupData?.data?.data

    console.log('user', user);

    const [formData, setFormData] = useState({
        fullName: user?.name,
        cityId: user?.city_id,
        email: user?.email,
        phoneNumber: user?.mobile,
        profile: user?.profile,
        address: user?.address,
        agencyName: user?.Agency_name,
        description: user?.about_me,
        experience: user?.experience,
        specialties: user?.specialties,
    });

    const [selectedLocationAddress, setSelectedLocationAddress] = useState({
        lat: user?.latitude,
        lng: user?.longitude,
        city: user?.city,
        state: user?.state,
        country: user?.country,
        address: user?.address,
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

    const handleAgencyName = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            agencyName: value,
        });
       
    };

    const handleDescription = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            description: value,
        });
       
    };
    
    const handleExperiance = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            experience: value,
        });
       
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current.click(); // Trigger the file input click event
    };

    const handelCityId = (e) => {
		const value = e.target.value;
		setFormData({
            ...formData,
            cityId: value
        });
	}

	const handleLocationSelect = (address) => {
        // Update the form field with the selected address
		setSelectedLocationAddress({
            lat: address?.lat,
			lng: address?.lng,
			city: address?.city,
			state: address?.state,
			country: address?.country,
			address: address?.address
        });
		setFormData({
            ...formData,
            selectedLocation: address
        });
    };

    const handlePhone = (valid, value) => {
        valid &&
		setFormData({
            ...formData,
            phoneNumber: value
        })
	};

    const handleSpecialties = (value) => {
        setFormData({
            ...formData,
            specialties: value
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
            profileImage: user?.profile,
            agencyName: user?.agencyName,
            description: user?.about_me,
            experience: user?.experience,
            specialties: user?.specialties,
            cityId: user?.city_id,
        });
        setSelectedLocationAddress({
			lat: user?.lat,
			lng: user?.lng,
			city: user?.city,
			state: user?.state,
			country: user?.country,
			address: user?.address
		});
    }

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        setDisabledButtons(true);
        UpdateProfileApi({
            name: formData.fullName,
            city_id: formData.cityId,
            mobile: formData.phoneNumber,
            fcm_id: FcmToken,
            address: formData.address,
            firebase_id: '2',
            notification: "1",
            facebook_id: formData.facebook ? formData.facebook : "",
            twiiter_id: formData.twiiter ? formData.twiiter : "",
            instagram_id: formData.instagram ? formData.instagram : "",
            pintrest_id: formData.pintrest ? formData.pintrest : "",
            latitude: selectedLocationAddress?.lat,
            longitude: selectedLocationAddress?.lng,
            city: selectedLocationAddress?.city,
            state: selectedLocationAddress?.state,
            country: selectedLocationAddress?.country,
            profile: formData.profileImage,
            Agency_name: formData.agencyName,
            about_me: formData.description,
            experience: formData.experience,
            specialties: formData.specialties,
            city_id: formData.cityId,
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

        // setSelectedLocationAddress({
        //     lat: user?.latitude,
        //     lng: user?.longitude,
        //     city: user?.city,
        //     state: user?.state,
        //     country: user?.country,
        //     formatted_address: user?.address,
        // });

    }, [formData, user]);

    useEffect(() => {
        GetCitiesApi(
            (response) => {
                setCities(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    const inputStyle = `
        p-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]
    `

    return (
        <UserLayout footer={true}>
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
                            <div className="grid grid-cols-2 gap-4">
                                <div className={`${user?.user_type !== '1' && 'col-span-2'}`}>
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
                                {
                                   user?.user_type == '0' || user?.user_type == '1'  &&
                                    <div className="">
                                        <label className='d-block mb-1 text-[#272835] text-sm'>{translate('agencyName')}</label>
                                        <input
                                            type="text"
                                            name="agencyName"
                                            value={formData.agencyName}
                                            onChange={handleAgencyName}
                                            placeholder={translate('enterAgencyName')}
                                            pattern="^[a-zA-Z]+$"
                                            className={inputStyle}
                                        />
                                    </div>
                                }
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
                            {
                                user?.user_type == '0' || user?.user_type == '1'  &&
                                <Fragment>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="">
                                            <label className='d-block mb-1 text-[#272835] text-sm'>{translate('yearsOfExperience')}</label>
                                            <input
                                                type="number"
                                                name="experience"
                                                min={0} max={100} step={0.1} 
                                                value={formData.experience}
                                                onChange={handleExperiance}
                                                placeholder={translate('yearsOfExperience')}
                                                className={inputStyle}
                                            />
                                        </div>
                                        <div className="">
                                            <label className='d-block mb-1 text-[#272835] text-sm'>{translate('specialities')}</label>
                                            <InputTag onValueChange={handleSpecialties} getTags={formData.specialties} />
                                        </div>
                                    </div>
                                    <div className="">
                                        <label className='d-block mb-1 text-[#272835] text-sm'>{translate('description')}</label>
                                        <textarea
                                            cols={4}
                                            rows={8}
                                            name="description"
                                            value={formData.description}
                                            onChange={handleDescription}
                                            placeholder={translate('enterDescription')}
                                            className={inputStyle}
                                        ></textarea>
                                    </div>
                                </Fragment>
                            }

                            <div className="grid grid-cols-2 gap-4">
                                <div className="">
                                    <label className='d-block mb-1 text-[#272835] text-sm'>{translate('city')}</label>
                                    <select
                                        // value={formData.}
                                        onChange={e => handelCityId(e)}
                                        className={`${inputStyle}`}
                                    >
                                        {cities.map((item, idx) => (
                                            <option
                                                value={item.id}
                                                key={idx}
                                            >{translate(item.name)}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="">
                                    <label className='d-block text-[#272835] text-sm'>{translate('address')}</label>
                                    <LocationSearchBox
                                        onLocationSelected={handleLocationSelect}
                                        initialLatitude={selectedLocationAddress.lat}
                                        initialLongitude={selectedLocationAddress.lng}
                                        className={`${inputStyle}`}
                                    />
                                </div>
                            </div>
                            <div className="">
                                
                                <GoogleMapBox
                                    apiKey={GoogleMapApi}
                                    onSelectLocation={handleLocationSelect}
                                    latitude={selectedLocationAddress.lat}
                                    longitude={selectedLocationAddress.lng}
                                />
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
