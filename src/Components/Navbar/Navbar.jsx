"use client"
import React, { useState, useEffect, Fragment } from "react";
import arkafLogo from "@/assets/Logo_Color.png";
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
import { silderCacheData } from "@/store/reducer/momentSlice";
import FirebaseData from "@/utils/Firebase";
import { Checkbox } from "antd";

import { AiFillTwitterCircle, AiOutlineInstagram, AiOutlineLinkedin } from "react-icons/ai";
import { CiFacebook } from "react-icons/ci";
import { ImPinterest2 } from "react-icons/im";
import { FaXTwitter } from "react-icons/fa6";




const Nav = () => {
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


    useEffect(() => {
        if (language && language.rtl === 1) {
            document.documentElement.dir = "rtl";

        } else {
            document.documentElement.dir = "ltr";

        }
    }, [language]);
    useEffect(() => {
        if (signupData?.data?.data.name === "" || signupData?.data?.data.email === "" || signupData?.data?.data?.mobile === "" && !user_register) {
            Swal.fire({
                title: 'Complete Profile First',
                icon: 'info',
                customClass: {
                    confirmButton: 'Swal-confirm-buttons',
                    cancelButton: "Swal-cancel-buttons"
                },
                confirmButtonText: 'OK',
                backdrop: 'static',
            }).then((result) => {
                if (result.isConfirmed) {
                    // If the user clicks "OK," navigate to "/user-register"
                    router.push('/user-register');
                }
            });
        }
    }, [signupData]);



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

        console.log('newLanguage ==>', newLanguage);
        console.log('language ==>', language);
        console.log('systemDefaultLanguageCode ==>', systemDefaultLanguageCode);

        store.dispatch(setLanguage(newLanguage));

        languageLoaded(
                newLanguage,
                isChecked ? "2" : "1",
                (response) => {
                    const currentLang = response && response.data.name;
                    console.log('currentLang ==>', currentLang);

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
        if (isSubscription === true) {
            // Corrected the condition
            router.push("/user/dashboard"); // Use an absolute path here
        } else {
            router.push("/user/profile"); // Redirect to the subscription page
        }
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
            <header className="sticy">
                <nav className={`navbar header navbar-expand-lg navbar-light`}>
                {/* ${scroll > headerTop || (isHomePage && (!sliderdata || sliderdata.length === 0)) ? "is-sticky" : ""} */}
                    <div className="container">

                    <div className="center-side">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" href="/rent">{translate("rent")}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/buy" className="nav-link">{translate("buy")}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href="/add-listing">{translate("addListing")}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href="/add-request">{translate("addRequest")}</Link>
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
                                        <Link href="/log-in" aria-label="regester account">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#34484f" style={{width: '32px'}}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                            <span className="hidden-text-seo">Regestration</span>
                                        </Link>
                                    </div>
                                ) : // Check if mobile and firebase_id are present
                                    signupData?.data?.data.mobile && signupData?.data?.data.firebase_id && signupData?.data?.data.name === "" ? (
                                        <span className="nav-link">{translate("welcmGuest")}</span>
                                ) :
                                signupData?.data?.data.name ? (
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic01">
                                            <RiUserSmileLine size={20} className="icon01" />

                                            {signupData.data.data.name}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu id="language">
                                            <Dropdown.Item onClick={handleShowDashboard}>{translate("dashboard")}</Dropdown.Item>
                                            <Dropdown.Item onClick={handleLogout}>{translate("logout")}</Dropdown.Item>
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
                                    {/* <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic">  {selectedLanguage ? selectedLanguage : defaultlang}</Dropdown.Toggle>
                                        <Dropdown.Menu id="language">
                                            {LanguageList &&
                                                LanguageList.map((ele, index) => (
                                                    <span>
                                                        {ele.code}
                                                        <Dropdown.Item key={index} onClick={() => handleLanguageChange(ele.code)}>
                                                        {ele.name}
                                                    </Dropdown.Item>
                                                    </span>
                                                ))}
                                        </Dropdown.Menu>
                                    </Dropdown> */}
                                    <li className="nav-item">
                                        {
                                            // Check if signupData.data is null
                                            signupData?.data === null ? (
                                                <div className="d-flex gap-3">
                                                    <Link href="/login" className="button button-outline">{translate("SignIn")}</Link>
                                                    <Link href="/register" className="button button-solid">{translate("SignUp")}</Link>
                                                </div>
                                            ) : // Check if mobile and firebase_id are present
                                                signupData?.data?.data.mobile && signupData?.data?.data.firebase_id && signupData?.data?.data.name === "" ? (
                                                    <>

                                                        <span className="nav-link">{translate("welcmGuest")}</span>

                                                    </>
                                                ) :
                                                    signupData?.data?.data.name ? (
                                                        <Dropdown>
                                                            <Dropdown.Toggle id="dropdown-basic01">
                                                                <RiUserSmileLine size={20} className="icon01" />

                                                                {signupData.data.data.name}
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu id="language">
                                                                <Dropdown.Item onClick={handleShowDashboard}>{translate("dashboard")}</Dropdown.Item>
                                                                <Dropdown.Item onClick={handleLogout}>{translate("logout")}</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    ) : null
                                        }
                                    </li>
                                    {signupData?.data?.data.name && settingData && (
                                        <li className="nav-item">
                                            <button className="btn" id="addbutton" onClick={handleAddProperty}>
                                                <FiPlusCircle size={20} className="mx-2 add-nav-button" />
                                                {translate("addProp")}
                                            </button>
                                        </li>
                                    )}
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
                                    <Link className="nav-link" href="/rent" onClick={handleClose}>
                                        {translate("rent")}
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" href="/buy" onClick={handleClose}>
                                        {translate("buy")}
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" href="/add-request" onClick={handleClose}>
                                        {translate("addRequest")}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/find-agent" onClick={handleClose}>
                                        {translate("findAgent")}
                                    </Link>
                                </li>

                                <li><hr className="dropdown-divider" /></li>

                                <li className="nav-item">
                                    {
                                        // Check if signupData.data is null
                                        signupData?.data === null ? (
                                            <a className="nav-link" to="/" onClick={handleOpenModal}>
                                                <RiUserSmileLine size={20} className="icon" />
                                                {translate("login&Regiser")}
                                            </a>
                                        ) : // Check if mobile and firebase_id are present
                                            signupData?.data?.data.mobile && signupData?.data?.data.firebase_id && signupData?.data?.data.name === "" ? (
                                                <span className="nav-link">{translate("welcmGuest")}</span>
                                            ) : // If name is present, show "Welcome, {name}"
                                                signupData?.data?.data.name ? (
                                                    <Dropdown>
                                                        <Dropdown.Toggle id="dropdown-basic01">
                                                            <RiUserSmileLine size={20} className="icon01" />
                                                            {/* <Avatar size={16} src={signupData.data.data.profile}/> */}
                                                            {signupData.data.data.name}
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu id="language">
                                                            <Dropdown.Item onClick={handleShowDashboard}>{translate("dashboard")}</Dropdown.Item>
                                                            <Dropdown.Item onClick={handleLogout}>{translate("logout")}</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                ) : null // Handle any other cases or conditions here
                                    }
                                </li>
                                {signupData?.data?.data.name && settingData && (
                                    <li className="nav-item">
                                        <button className="btn" id="addbutton-mobile" onClick={handleAddProperty}>
                                            <FiPlusCircle size={20} className="mx-2 add-nav-button" />
                                            {translate("addProp")}
                                        </button>
                                    </li>
                                )}

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
