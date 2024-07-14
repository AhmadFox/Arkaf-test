"use client"
import React, { useState, useEffect, Fragment } from "react";

import { RiUserSmileLine } from "react-icons/ri";
import { CloseButton, Dropdown } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";
import LoginModal from "../LoginModal/LoginModal";
import AreaConverter from "../AreaConverter/AreaConverter";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess, userSignUpData } from "@/store/reducer/authSlice";

import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-hot-toast";
import { settingsData } from "@/store/reducer/settingsSlice";
import { languageLoaded, setLanguage } from "@/store/reducer/languageSlice";
import { placeholderImage, translate } from "@/utils";
import { store } from "@/store/store";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Image from "next/image";
import { loadProfile, profileCacheData, silderCacheData } from "@/store/reducer/momentSlice";
import FirebaseData from "@/utils/Firebase";
import { Checkbox } from "antd";

import { AiFillTwitterCircle, AiOutlineInstagram, AiOutlineLinkedin } from "react-icons/ai";
import { CiFacebook } from "react-icons/ci";
import { ImPinterest2 } from "react-icons/im";
import { FaXTwitter } from "react-icons/fa6";

import arkafLogo from "@/assets/Logo_Color.png";
import ArkafAvatar from "@/assets/arkaf_avatar.png";
import dummyimg from '@/assets/Images/user_profile.png'





const Nav = ({ stikyNav }) => {

    const router = useRouter();
    const language = store.getState().Language.languages;
    const { signOut } = FirebaseData();   
    
    const dispatch = useDispatch();
    const currentLanguage = useSelector(state => state.Language.selectedLanguage);

    const isHomePage = router.pathname === '/';
    const user_register = router.pathname === '/user-register';
    const signupData = useSelector(userSignUpData);
    const sliderdata = useSelector(silderCacheData);
    const settingData = useSelector(settingsData);
    const webdata = settingData && settingData;

    const isSubscription = settingData?.subscription;
    const LanguageList = settingData && settingData.languages;
    const systemDefaultLanguageCode = settingData?.default_language;
    const [showModal, setShowModal] = useState(false);
    const [areaconverterModal, setAreaConverterModal] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [defaultlang, setDefaultlang] = useState(language.name);
    const [show, setShow] = useState(false);
    const [headerTop, setHeaderTop] = useState(0);
    const [scroll, setScroll] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userProfileData = signupData?.data?.data?.profile
    // const userProfileData = signupData?.data?.data?.profile

    // console.log('Navbar profileData', profileData);
    // console.log('userProfileData ===>', signupData?.data?.data);

    const handelAddProperty = () => {
        signupData.data !== null ?
        router.push('/user/properties/post-listing') : router.push("/login")
    }

    const handelRequistProperty = () => {
        signupData.data !== null ?
        router.push('/user/properties/requist-listing') : router.push("/login")
    }

    useEffect(() => {
        if (language && language.rtl === 1) {
            document.documentElement.dir = "rtl";

        } else {
            document.documentElement.dir = "ltr";

        }
    }, [language]);



    useEffect(() => {
        const header = document.querySelector(".header");
        setHeaderTop(header.offsetTop);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {

        if (!language || Object.keys(language).length === 0) {

            languageLoaded(
                systemDefaultLanguageCode,
                "1",
                (response) => {
                    const currentLang = response && response.data.name;

                    // Dispatch the setLanguage action to update the selected language in Redux
                    store.dispatch(setLanguage(currentLang));
                    setSelectedLanguage(currentLang);
                    setDefaultlang(currentLang);
                },
                (error) => {
                    console.log(error);
                }
            );
        }

    }, []);

    const handleLanguageChange = (event) => {
        const isChecked = event.target.checked;
        const newLanguage = isChecked ? 'ar' : 'en';

        store.dispatch(setLanguage(newLanguage));

        languageLoaded(
                newLanguage,
                isChecked ? "2" : "1",
                (response) => {
                    const currentLang = response && response.data.name;
                    // Dispatch the setLanguage action to update the selected language in Redux
                    store.dispatch(setLanguage(currentLang));
                    setSelectedLanguage(currentLang);
                    setDefaultlang(currentLang);
                },
                (error) => {
                    console.log(error);
                }
        );

        // const isChecked = event.target.checked;

        // console.log('Language Select ===>', isChecked ? 'Arabic' : 'English');
        // languageLoaded(
        //     isChecked ? 'ar' : 'en',
        //     isChecked ? '2' : '1',
        //     (response) => {
        //         const currentLang = response && response.data.name;
        //         setSelectedLanguage(currentLang);

        //         // Dispatch the setLanguage action to update the selected language in Redux
        //         store.dispatch(setLanguage(currentLang));
        //     },
        //     (error) => {
        //         toast.error(error)
        //         console.log(error);
        //     }
        // );
    };
    useEffect(() => {

    }, [selectedLanguage, language, defaultlang])

    const handleScroll = () => {
        setScroll(window.scrollY);
    };

    const handleOpenModal = () => {
        setShow(false);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleOpenAcModal = () => {
        setShow(false);
        setAreaConverterModal(true);
    };
    const handleCloseAcModal = () => {
        setAreaConverterModal(false);
    };

    const handleShowDashboard = () => {
        router.push("/user/profile");
    };
    const handleAddProperty = () => {
        if (isSubscription === true) {
            // Corrected the condition
            router.push("/user/properties"); // Use an absolute path here
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You have not subscribed. Please subscribe first",
                customClass: {
                    confirmButton: 'Swal-confirm-buttons',
                },

                // footer: '<a href="">Why do I have this issue?</a>'
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push("/subscription-plan"); // Redirect to the subscription page
                }
            });
        }
    };
    const handleLogout = () => {
        handleClose();
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            customClass: {
                confirmButton: 'Swal-confirm-buttons',
                cancelButton: "Swal-cancel-buttons"
            },
            confirmButtonText: "Yes! Logout",
        }).then((result) => {
            if (result.isConfirmed) {
                // Clear the recaptchaVerifier by setting it to null
                window.recaptchaVerifier = null;
                
                // Perform the logout action
                logoutSuccess();
                signOut()

                toast.success(translate("logoutSuccess"));
            } else {
                toast.error(translate("logoutcancel"));
            }
        });
    };

    const CheckActiveUserAccount = () => {
        if (settingData?.is_active === false) {
            Swal.fire({
                title: "Opps!",
                text: "Your account has been deactivated by the admin. Please contact them.",
                icon: "warning",
                allowOutsideClick: false,
                showCancelButton: false,
                customClass: {
                    confirmButton: 'Swal-confirm-buttons',
                    cancelButton: "Swal-cancel-buttons"
                },
                confirmButtonText: "Logout",
            }).then((result) => {
                if (result.isConfirmed) {
                    logoutSuccess();
                    signOut()
                    router.push("/contact-us");
                }
            });
        }
    }
    useEffect(() => {
        CheckActiveUserAccount()
    }, [settingData?.is_active])

    return (
        <>
            <header className={` ${stikyNav ? 'sticy' : 'border-b'}`}>
                <nav className={`navbar header navbar-expand-lg navbar-light`}>
                {/* ${scroll > headerTop || (isHomePage && (!sliderdata || sliderdata.length === 0)) ? "is-sticky" : ""} */}
                    <div className="container max-w-full xl:px-9">

                        <div className="center-side">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" href="/properties/all-properties">{translate("rent")}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/properties/all-properties" className="nav-link">{translate("buy")}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={handelAddProperty} className="nav-link">{translate("addProperty")}</button>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={handelRequistProperty} className="nav-link" href="/add-request">{translate("propertyRequest")}</button>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href="/find-agent">{translate("findAgent")}</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="left-side">
                            <div className="d-xl-none">
                                {
                                // Check if signupData.data is null
                                signupData?.data === null ? (
                                    <div className="d-flex gap-3">
                                        <Link href="/login" aria-label="regester account">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#34484f" style={{width: '32px'}}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                            <span className="hidden-text-seo">Regestration</span>
                                        </Link>
                                    </div>
                                ) : // Check if mobile and firebase_id are present
                                signupData?.data ? (
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic01">
                                            {/* <RiUserSmileLine size={20} className="icon01" /> */}

                                            {/* {signupData.data.data.name} */}
                                            <div className="border rounded-full py-1.5 px-2.5 flex gap-x-2 items-center justify-between">
                                                <Image
                                                    src={userProfileData ||  dummyimg.src}
                                                    alt={'User Profile Picture'}
                                                    width={32}
                                                    height={32}
                                                    className="object-cover rounded-full w-8 h-8"
                                                />
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#333" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </div>
                                        </Dropdown.Toggle>
                                            <Dropdown.Menu className="!rounded-lg" id="language">
                                                <Dropdown.Item onClick={handleShowDashboard} className="flex py-2 items-center gap-x-2 group !text-[#5A727B] hover:!bg-[#F6F6F6] rounded-sm hover:m-0 focus:m-0 ease-in-out duration-200">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                                                        <g id="Group_6" data-name="Group 6" transform="translate(-728 -443)">
                                                            <rect id="Rectangle_4" data-name="Rectangle 4" width="21" height="21" transform="translate(728 443)" fill="none"/>
                                                            <path id="Vector" d="M.5.833A.833.833,0,0,1,1.333,0h5a.833.833,0,0,1,.833.833v5a.833.833,0,0,1-.833.833h-5A.833.833,0,0,1,.5,5.833Zm0,8.333a.833.833,0,0,1,.833-.833h5a.833.833,0,0,1,.833.833v5A.833.833,0,0,1,6.333,15h-5A.833.833,0,0,1,.5,14.167ZM8.833.833A.833.833,0,0,1,9.667,0h5A.833.833,0,0,1,15.5.833v5a.833.833,0,0,1-.833.833h-5a.833.833,0,0,1-.833-.833Zm0,8.333a.833.833,0,0,1,.833-.833h5a.833.833,0,0,1,.833.833v5a.833.833,0,0,1-.833.833h-5a.833.833,0,0,1-.833-.833Zm1.667-7.5V5h3.333V1.667ZM10.5,10v3.333h3.333V10ZM2.167,1.667V5H5.5V1.667Zm0,8.333v3.333H5.5V10Z" transform="translate(730.5 446)" className="fill-[#5A727B]"/>
                                                        </g>
                                                    </svg>
                                                    {translate("dashboard")}
                                                </Dropdown.Item>
                                                <Dropdown.Item className="flex py-2 items-center gap-x-2 group !text-[#5A727B] hover:!bg-[#F6F6F6] rounded-sm hover:m-0 focus:m-0 ease-in-out duration-200">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                                                        <g id="Group_5" data-name="Group 5" transform="translate(-749 -443)">
                                                            <rect id="Rectangle_5" data-name="Rectangle 5" width="21" height="21" transform="translate(749 443)" fill="none"/>
                                                            <path id="Vector_1_" data-name="Vector (1)" d="M1.634,2.224A5.417,5.417,0,0,1,9,1.951a5.416,5.416,0,0,1,7.648,7.628l-6.47,6.493a1.667,1.667,0,0,1-2.266.085l-.091-.085L1.351,9.579A5.417,5.417,0,0,1,1.634,2.224ZM2.813,3.4a3.75,3.75,0,0,0-.122,5.176l.122.128L9,14.893l4.419-4.42L10.473,7.527l-.884.884A2.5,2.5,0,0,1,6.054,4.876L7.8,3.124a3.751,3.751,0,0,0-4.864.157ZM9.884,5.76a.833.833,0,0,1,1.178,0L14.6,9.295l.59-.589a3.75,3.75,0,0,0-5.175-5.425L9.884,3.4,7.232,6.054A.833.833,0,0,0,7.168,7.16l.065.073A.833.833,0,0,0,8.338,7.3l.073-.065Z" transform="translate(750.5 444.901)" className="fill-[#5A727B]"/>
                                                        </g>
                                                    </svg>
                                                    {translate("applyRequest")}
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={handleLogout} className="flex py-2 items-center gap-x-2 group hover:!bg-[#F6F6F6] rounded-sm hover:m-0 focus:m-0 ease-in-out duration-200">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                                                        <g id="Group_4" data-name="Group 4" transform="translate(-770 -443)">
                                                            <rect id="Rectangle_6" data-name="Rectangle 6" width="21" height="21" transform="translate(770 443)" fill="none"/>
                                                            <path id="Vector_2_" data-name="Vector (2)" d="M3.333,13.5H5v1.667H15V1.834H5V3.5H3.333V1A.833.833,0,0,1,4.166.167H15.833A.833.833,0,0,1,16.666,1V16a.833.833,0,0,1-.833.833H4.166A.833.833,0,0,1,3.333,16ZM5,7.667h5.833V9.334H5v2.5L.833,8.5,5,5.167Z" transform="translate(772.167 444.833)" fill="red"/>
                                                        </g>
                                                    </svg>
                                                    <span className="text-red-500">{translate("logout")}</span>
                                                </Dropdown.Item>
                                                
                                            </Dropdown.Menu>
                                    </Dropdown>
                                ) : null
                                }
                            </div>
                            <Link className="navbar-brand" href="/">
                                <Image loading="lazy" src={settingData?.web_logo ? settingData?.web_logo : arkafLogo} alt="Arkaf Brand Logo" width={350} height={157} className="nav_logo" onError={placeholderImage}/>
                            </Link>
                            <span onClick={handleShow} id="hamburg">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#34484f" className="">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </span>
                        </div>

                        <div className="right-side">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto gap-3">
                                    <li className="nav-lang">
                                        <span>EN</span>
                                        <div className="language-switch">
                                            <input type="checkbox" name="" id="language" onChange={handleLanguageChange} checked={currentLanguage === 'ar'} />
                                            <label className="" htmlFor="language"></label>
                                        </div>
                                        <span>AR</span>
                                    </li>
                                    
                                    <li className="nav-item">
                                        {
                                            // Check if signupData.data is null
                                            signupData?.data === null ? (
                                                <div className="d-flex gap-3">
                                                    <Link href="/login" className="button button-outline">{translate("SignIn")}</Link>
                                                    <Link href="/register" className="button button-solid">{translate("SignUp")}</Link>
                                                </div>
                                            ) : // Check if mobile and firebase_id are present
                                            signupData? (
                                                    <div className="flex items-center justify-center gap-x-3">
                                                        <Link href="/chat" className="p-2.5 border rounded-full hover:bg-[#34484F] hover:border-[#34484F] ease-in-out duration-200 group">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                                                                <g id="Group_2"  transform="translate(-749 -415)">
                                                                    <rect id="Rectangle_3" data-name="Rectangle 3" width="21" height="21" transform="translate(749 415)" fill="none"/>
                                                                    <path id="chatIcon" d="M8,0h4a8,8,0,0,1,0,16v3.5C7,17.5,0,14.5,0,8A8,8,0,0,1,8,0Zm2,14h2A6,6,0,0,0,12,2H8A6,6,0,0,0,2,8c0,3.61,2.462,5.966,8,8.48Z" transform="translate(749.5 415.75)" className="fill-[#34484F] group-hover:fill-white ease-in-out duration-200" />
                                                                </g>
                                                            </svg>
                                                            <span className="sr-only">Chat link redirect</span>
                                                        </Link>
                                                        <Link href="/chat" className="p-2.5 border rounded-full hover:bg-[#34484F] hover:border-[#34484F] ease-in-out duration-200 group">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                                                                <g id="Group_3" data-name="Group 3" transform="translate(-714 -415)">
                                                                    <rect id="Rectangle_2" data-name="Rectangle 2" width="21" height="21" transform="translate(714 415)" fill="none"/>
                                                                    <path id="notifecationIcon" d="M19.16,17h1.907v2H2V17H3.907V10a7.82,7.82,0,0,1,7.627-8,7.82,7.82,0,0,1,7.627,8Zm-1.907,0V10a5.865,5.865,0,0,0-5.72-6,5.865,5.865,0,0,0-5.72,6v7Zm-8.58,4h5.72v2H8.673Z" transform="translate(712.933 413)" className="fill-[#34484F] group-hover:fill-white ease-in-out duration-200"/>
                                                                </g>
                                                            </svg>
                                                            <span className="sr-only">Chat link redirect</span>
                                                        </Link>
                                                        <Dropdown>
                                                            <Dropdown.Toggle id="dropdown-basic01">
                                                                {/* <RiUserSmileLine size={20} className="icon01" /> */}

                                                                {/* {signupData.data.data.name} */}
                                                                <div className="border rounded-full py-1.5 px-2.5 flex gap-x-2 items-center justify-between">
                                                                    <Image
                                                                        src={userProfileData || dummyimg.src}
                                                                        alt={'User Profile Picture'}
                                                                        width={32}
                                                                        height={32}
                                                                        className="object-cover rounded-full w-8 h-8"
                                                                    />
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#333" className="size-4">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                                    </svg>
                                                                </div>
                                                            </Dropdown.Toggle>

                                                                <Dropdown.Menu className="!rounded-lg" id="language">
                                                                    <div className="px-2 !flex flex-col !gap-y-2">
                                                                    <Dropdown.Item onClick={handleShowDashboard} className="flex py-2 items-center gap-x-2 group !text-[#5A727B] hover:!bg-[#F6F6F6] rounded-sm hover:m-0 focus:m-0 ease-in-out duration-200">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                                                                            <g id="Group_6" data-name="Group 6" transform="translate(-728 -443)">
                                                                                <rect id="Rectangle_4" data-name="Rectangle 4" width="21" height="21" transform="translate(728 443)" fill="none"/>
                                                                                <path id="Vector" d="M.5.833A.833.833,0,0,1,1.333,0h5a.833.833,0,0,1,.833.833v5a.833.833,0,0,1-.833.833h-5A.833.833,0,0,1,.5,5.833Zm0,8.333a.833.833,0,0,1,.833-.833h5a.833.833,0,0,1,.833.833v5A.833.833,0,0,1,6.333,15h-5A.833.833,0,0,1,.5,14.167ZM8.833.833A.833.833,0,0,1,9.667,0h5A.833.833,0,0,1,15.5.833v5a.833.833,0,0,1-.833.833h-5a.833.833,0,0,1-.833-.833Zm0,8.333a.833.833,0,0,1,.833-.833h5a.833.833,0,0,1,.833.833v5a.833.833,0,0,1-.833.833h-5a.833.833,0,0,1-.833-.833Zm1.667-7.5V5h3.333V1.667ZM10.5,10v3.333h3.333V10ZM2.167,1.667V5H5.5V1.667Zm0,8.333v3.333H5.5V10Z" transform="translate(730.5 446)" className="fill-[#5A727B]"/>
                                                                            </g>
                                                                        </svg>
                                                                        {translate("dashboard")}
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item className="flex py-2 items-center gap-x-2 group !text-[#5A727B] hover:!bg-[#F6F6F6] rounded-sm hover:m-0 focus:m-0 ease-in-out duration-200">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                                                                            <g id="Group_5" data-name="Group 5" transform="translate(-749 -443)">
                                                                                <rect id="Rectangle_5" data-name="Rectangle 5" width="21" height="21" transform="translate(749 443)" fill="none"/>
                                                                                <path id="Vector_1_" data-name="Vector (1)" d="M1.634,2.224A5.417,5.417,0,0,1,9,1.951a5.416,5.416,0,0,1,7.648,7.628l-6.47,6.493a1.667,1.667,0,0,1-2.266.085l-.091-.085L1.351,9.579A5.417,5.417,0,0,1,1.634,2.224ZM2.813,3.4a3.75,3.75,0,0,0-.122,5.176l.122.128L9,14.893l4.419-4.42L10.473,7.527l-.884.884A2.5,2.5,0,0,1,6.054,4.876L7.8,3.124a3.751,3.751,0,0,0-4.864.157ZM9.884,5.76a.833.833,0,0,1,1.178,0L14.6,9.295l.59-.589a3.75,3.75,0,0,0-5.175-5.425L9.884,3.4,7.232,6.054A.833.833,0,0,0,7.168,7.16l.065.073A.833.833,0,0,0,8.338,7.3l.073-.065Z" transform="translate(750.5 444.901)" className="fill-[#5A727B]"/>
                                                                            </g>
                                                                        </svg>
                                                                        {translate("applyRequest")}
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item onClick={handleLogout} className="flex py-2 items-center gap-x-2 group hover:!bg-[#F6F6F6] rounded-sm hover:m-0 focus:m-0 ease-in-out duration-200">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                                                                            <g id="Group_4" data-name="Group 4" transform="translate(-770 -443)">
                                                                                <rect id="Rectangle_6" data-name="Rectangle 6" width="21" height="21" transform="translate(770 443)" fill="none"/>
                                                                                <path id="Vector_2_" data-name="Vector (2)" d="M3.333,13.5H5v1.667H15V1.834H5V3.5H3.333V1A.833.833,0,0,1,4.166.167H15.833A.833.833,0,0,1,16.666,1V16a.833.833,0,0,1-.833.833H4.166A.833.833,0,0,1,3.333,16ZM5,7.667h5.833V9.334H5v2.5L.833,8.5,5,5.167Z" transform="translate(772.167 444.833)" fill="red"/>
                                                                            </g>
                                                                        </svg>
                                                                        <span className="text-red-500">{translate("logout")}</span>
                                                                    </Dropdown.Item>
                                                                    </div>
                                                                    
                                                                </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>

                                                ) : null
                                                
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <div>
                <Offcanvas
                    show={show}
                    onHide={handleClose}
                    placement="end"
                    scroll={false}
                    backdrop={true}
                    style={{
                        width: "90%",
                        maxWidth: "400px"
                    }}
                >
                    <Offcanvas.Header>
                        <Offcanvas.Title>
                            <span className="title-name">{translate('menu')}</span>
                        </Offcanvas.Title>
                        <Offcanvas.Title>
                            <CloseButton onClick={handleClose} />
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className="d-flex flex-column gap-2 justify-content-between h-100">
                            <ul className="navbar-nav" id="mobile-ul">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" href="/" onClick={handleClose}>
                                        {translate("home")}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/properties/all-properties" onClick={handleClose}>
                                        {translate("rent")}
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" href="/properties/all-properties" onClick={handleClose}>
                                        {translate("buy")}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/add-property" onClick={handleClose}>
                                        {translate("addProperty")}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/property-request" onClick={handleClose}>
                                        {translate("propertyRequest")}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/find-agent" onClick={handleClose}>
                                        {translate("findAgent")}
                                    </Link>
                                </li>

                                <li><hr className="dropdown-divider" /></li>

                                <li className="nav-item nav-lang  justify-content-center mt-3">
                                    <span>EN</span>
                                        <div className="language-switch">
                                            <input type="checkbox" name="" id="language" onChange={handleLanguageChange} checked={currentLanguage === 'ar'} />
                                            <label className="" htmlFor="language"></label>
                                        </div>
                                    <span>AR</span>
                                </li>
                            </ul>

                            <div className="">
                                {webdata?.facebook_id || webdata?.instagram_id || webdata?.pintrest_id || webdata?.twitter_id ? (
                                    <div id="follow_us" className="d-flex justify-content-center text-muted">
                                        {webdata?.facebook_id ? (
                                            <Link href={webdata?.facebook_id} target="_blank" aria-label="facebook page" className="text-muted">
                                                <CiFacebook size={28} />
                                                <span className="hidden-text-seo">facebook page</span>
                                            </Link>
                                        ) : null}
                                        {webdata?.instagram_id ? (
                                            <Link href={webdata?.instagram_id} target="_blank" aria-label="instagram page" className="text-muted">
                                                <AiOutlineInstagram size={28} />
                                                <span className="hidden-text-seo">instagram profile</span>
                                            </Link>
                                        ) : null}
                                        {webdata?.pintrest_id ? (
                                            <Link href={webdata?.pintrest_id} target="_blank" aria-label="pintrest page" className="text-muted">
                                                <ImPinterest2 size={25} />
                                                <span className="hidden-text-seo">pintrest page</span>
                                            </Link>
                                        ) : null}
                                        {webdata?.twitter_id ? (
                                            <Link href={webdata?.twitter_id} target="_blank"  aria-label="twitter page" className="text-muted">
                                                <FaXTwitter size={25}/>
                                                <span className="hidden-text-seo">twitter page</span>
                                            </Link>
                                        ) : null}
                                    </div>
                                ) : (null)}
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
            <LoginModal isOpen={showModal} onClose={handleCloseModal} />

            <AreaConverter isOpen={areaconverterModal} onClose={handleCloseAcModal} />
        </>
    );
};

export default Nav;
