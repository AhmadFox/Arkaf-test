"use client"
import React, { Fragment, useEffect, useRef, useState } from 'react'
import Location from "@/Components/Location/Location";
import { useRouter } from "next/router";
import { loadUpdateData, loadUpdateUserData, userSignUpData } from "../../store/reducer/authSlice";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { UpdateProfileApi } from "@/store/actions/campaign";
import dummyimg from "../../assets/Images/user_profile.png";
import { languageData } from "@/store/reducer/languageSlice";
import { placeholderImage, translate } from "@/utils";
import LocationSearchBox from "@/Components/Location/LocationSearchBox";
import Image from "next/image";
import { Fcmtoken } from '@/store/reducer/settingsSlice';
import AuthLayout from '../Layout/AuthLayout';

const inputStyle = `
    p-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]
`;

const UserRegister = () => {

    const navigate = useRouter();
    const signupData = useSelector(userSignUpData);
    const FcmToken = useSelector(Fcmtoken)
    const navigateToHome = () => {
        navigate.push("/");
    };

    useEffect(() => {
        if (signupData.data === null) {
            navigate.push("/");
        }
    }, [signupData])
    const [showCurrentLoc, setShowCurrentLoc] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [username, setUsername] = useState(signupData?.data?.data?.name ? signupData?.data?.data?.name : "");
    const [email, setEmail] = useState(signupData?.data?.data?.email ? signupData?.data?.data?.email : "");
    const [mobile, setMobile] = useState(signupData?.data?.data?.mobile ? signupData?.data?.data?.mobile : "");
    const [address, setAddress] = useState();
    const [image, setImage] = useState();
    const fileInputRef = useRef(null);

    const [uploadedImage, setUploadedImage] = useState(signupData?.data?.data?.profile ? signupData?.data?.data?.profile : null);

    const lang = useSelector(languageData);

    useEffect(() => { }, [lang]);
    const handleOpenLocModal = () => {
        // onClose()
        setShowCurrentLoc(true);
    };
    const handleCloseLocModal = () => {
        setShowCurrentLoc(false);
    };
    const handleSelectLocation = (location) => {

        setSelectedLocation(location);
    };
    const modalStyle = {
        display: showCurrentLoc ? "none" : "block",
    };
    const handleUploadButtonClick = () => {
        fileInputRef.current.click(); // Trigger the file input click event
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];


        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // const imageBlob = new Blob([e.target.result], { type: file.type });

                setImage(file);
                setUploadedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmitInfo = (e) => {
        e.preventDefault();

        if (signupData && signupData?.data?.data?.logintype === "1") {
            if (!email.trim()) {
                toast.error(translate("fillEmail"));
                return; // Stop further execution
            }
        } else {
            if (!mobile.trim()) {
                toast.error(translate("fillMobile"));
                return; // Stop further execution
            }
        }

        
        UpdateProfileApi({
            userid: signupData.data.data.id,
            name: username,
            email: email,
            mobile: mobile,
            address: address,
            firebase_id: signupData.data.data.firebase_id,
            profile: image,
            fcm_id: FcmToken,
            notification: "1",
            city: selectedLocation && selectedLocation.city ? selectedLocation.city : "",
            state: selectedLocation && selectedLocation.state ? selectedLocation.state : "",
            country: selectedLocation && selectedLocation.country ? selectedLocation.country : "",
            onSuccess: (res) => {
                toast.success(translate("userRegister"));
                loadUpdateUserData(res.data);
                navigate.push("/");
            },
            onError: (err) => {
                toast.error(err);
            }
        });
    };

    return (
        <AuthLayout>
            {/* <Breadcrumb title={translate("basicInfo")} /> */}
            <section className='mt-12'>
                <div className="border border-[#f2f2f2] rounded-lg md:rounded-xl bg-white shadow-[0px_11px_22px_rgba(0,0,0,0.07)] overflow-hidden">
                    <div className="border-b px-4 py-3">
                        <h4 className='text-xl md:text-2xl font-medium'>{translate('completeYourAccount')}</h4>
                    </div>
                    <div className="px-4 py-5">
                        <form action="" className='grid sm:grid-cols-2 gap-3'>
                            <div className="col-span-2 flex items-center gap-4">
                                <div className="relative rounded-full overflow-hidden w-32 h-32 bg-[#f3f3f3]">
                                    <Image
                                        loading="lazy"
                                        src={uploadedImage || dummyimg.src}
                                        alt="user profile image or avatar" 
                                        fill
                                        sizes=''
                                        className='objrct-fit'
                                        onError={placeholderImage}/>
                                </div>
                                <div className="">
                                    <input type="file" accept="image/jpeg, image/png" id="add_img" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageUpload} />
                                    <button type="button" className='tw-btn-outline text-sm !px-8 !py-2 mb-2' onClick={handleUploadButtonClick}>
                                        {translate("uploadImg")}
                                    </button>

                                    <p className='text-red-500 text-sm'>{translate("Note:")}</p>
                                </div>
                            </div>
                            <div className="">
                                <label htmlFor='userName' className='d-block mb-1 text-[#272835] text-sm'>{translate('userName')}</label>
                                <input
                                    required
                                    id="userName"
                                    type="text"
                                    name="uname"
                                    value={username}
                                    className={inputStyle}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder={translate('enterYourNamePlease')}
                                />
                            </div>
                            <div className="">
                                <label htmlFor='userPhone' className='d-block mb-1 text-[#272835] text-sm'>{translate('phoneNumber')}</label>
                                <input
                                    required
                                    id="userPhone"
                                    type="text"
                                    name="mobile"
                                    value={mobile}
                                    className={inputStyle}
                                    onChange={(e) => setMobile(e.target.value)} 
                                    placeholder={translate('enterYourPhoneNumberPlease')}
                                />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor='userLocation' className='d-block mb-1 text-[#272835] text-sm'>{translate('location')}</label>
                                <LocationSearchBox
                                    className={inputStyle}
                                    onLocationSelected={handleSelectLocation}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                {showCurrentLoc && <Location isOpen={true} onClose={handleCloseLocModal} onSelectLocation={handleSelectLocation} />}
            </section>
            <div className="sticky bottom-0 left-0 py-3 w-full bg-white">
                <div className="container flex flex-row-reverse justify-between items-center">
                    <button className='tw-btn-solid w-40' onClick={handleSubmitInfo}>{translate("complete")}</button>
                </div>
            </div>
        </AuthLayout>
    )
}

export default UserRegister
