"use client"
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import Breadcrumb from "@/Components/Breadcrumb/Breadcrumb";
import Image from "next/image";
import { PiPlayCircleThin } from "react-icons/pi";
import ReactPlayer from "react-player";
import SimilerPropertySlider from "@/Components/SimilerPropertySlider/SimilerPropertySlider";
import { settingsData } from "@/store/reducer/settingsSlice";
import { useSelector } from "react-redux";
import Map from "@/Components/GoogleMap/GoogleMap";
import { languageData } from "@/store/reducer/languageSlice";
import { isThemeEnabled, placeholderImage, translate } from "@/utils";
import { useRouter } from "next/router";
import { GetFeturedListingsApi, intrestedPropertyApi } from "@/store/actions/campaign";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import LightBox from "@/Components/LightBox/LightBox";
import Loader from "@/Components/Loader/Loader";
import toast from "react-hot-toast";
import { isSupported } from "firebase/messaging";
import { ImageToSvg } from "@/Components/Cards/ImageToSvg";
import Swal from "sweetalert2";
import ReportPropertyModal from "@/Components/ReportPropertyModal/ReportPropertyModal";
import { getChatData } from "@/store/reducer/momentSlice";
import OwnerDeatilsCard from "../OwnerDeatilsCard/OwnerDeatilsCard";
import PremiumOwnerDetailsCard from "../OwnerDeatilsCard/PremiumOwnerDetailsCard";
import Layout from "../Layout/Layout";
import { message } from "antd";
import LoginModal from "../LoginModal/LoginModal";
import useSWR from "swr";
import setPropertyTotalClicksApi from "@/hooks/setPropertyTotalClicksApi";
import { formatNumberWithCommas } from "@/utils";
import TimeComponent from "../Cards/TimeComponent";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import AvatarImage from "@/assets/avatar.png";
import ScketchOne from "@/assets/scketchplanone.png";
import ScketchTow from "@/assets/scketchplantow.png";
import Link from "next/link";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import headerImag from "@/assets/home_header.png"


const PropertyDetails = () => {
    const router = useRouter();
    const propId = router.query;
    const currentUrl = process.env.NEXT_PUBLIC_WEB_URL + router.asPath;
    // const { isLoaded } = loadGoogleMaps();
    const [isMessagingSupported, setIsMessagingSupported] = useState(false);
    const [notificationPermissionGranted, setNotificationPermissionGranted] = useState(false);
    const [isReporteModal, setIsReporteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [expandedLayout, setExpandedLayout] = useState(false);
    const [getPropData, setPropData] = useState();
    const [interested, setInterested] = useState(false);
    const [isReported, setIsReported] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [showChat, setShowChat] = useState(true);
    const [chatData, setChatData] = useState({
        property_id: "",
        title: "",
        title_image: "",
        user_id: "",
        name: "",
        profile: "",
    });
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);


    const [playing, setPlaying] = useState(false);
    const [manualPause, setManualPause] = useState(false); // State to track manual pause
    const [seekPosition, setSeekPosition] = useState(0);
    const [showThumbnail, setShowThumbnail] = useState(true);


    const [imageURL, setImageURL] = useState("");


    const lang = useSelector(languageData);
    const isLoggedIn = useSelector((state) => state.User_signup);
    const SettingsData = useSelector(settingsData);

    const isPremiumUser = SettingsData && SettingsData?.is_premium
    const themeEnabled = isThemeEnabled();
    const isPremiumProperty = getPropData && getPropData.is_premium


    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const priceSymbol = useSelector(settingsData);
    const CurrencySymbol = priceSymbol && priceSymbol.currency_symbol;

    useEffect(() => { }, [lang]);
    useEffect(() => {
        const checkMessagingSupport = async () => {
            try {
                const supported = await isSupported();
                setIsMessagingSupported(supported);

                if (supported) {
                    const permission = await Notification.requestPermission();
                    if (permission === 'granted') {
                        setNotificationPermissionGranted(true);
                    }
                }
            } catch (error) {
                console.error('Error checking messaging support:', error);
            }
        };

        checkMessagingSupport();
    }, [notificationPermissionGranted, isMessagingSupported]);
    useEffect(() => {
        setIsLoading(true);
        if (propId.slug && propId.slug != "") {
            GetFeturedListingsApi({
                current_user: isLoggedIn ? userCurrentId : "",
                slug_id: propId.slug,
                onSuccess: (response) => {
                    const propertyData = response && response.data;
                    setIsLoading(false);
                    setPropData(propertyData[0]);
                    if (propertyData[0]?.is_reported) {
                        setIsReported(true)
                    }
                },
                onError: (error) => {
                    setIsLoading(true);
                    console.log(error);
                }
            }
            );
        }
    }, [isLoggedIn, propId, interested, isReported]);



    useEffect(() => {
        if (getPropData && getPropData.threeD_image) {
            setImageURL(getPropData.threeD_image);
        }
    }, [getPropData]);


    useEffect(() => {
        if (imageURL) {
            const panoramaElement = document.getElementById("panorama");

            if (panoramaElement) {
                pannellum?.viewer("panorama", {
                    type: "equirectangular",
                    panorama: imageURL,
                    autoLoad: true,
                });
            }
        }
    }, [imageURL]);


    const userCurrentId = isLoggedIn && isLoggedIn.data ? isLoggedIn.data.data.id : null;


    const PlaceHolderImg = SettingsData?.web_placeholder_logo;

    const getVideoType = (videoLink) => {
        if (videoLink && (videoLink.includes("youtube.com") || videoLink.includes("youtu.be"))) {
            return "youtube";
        } else if (videoLink && videoLink.includes("drive.google.com")) {
            return "google_drive";
        } else {
            return "unknown";
        }
    };
    const videoLink = getPropData && getPropData.video_link;

    const videoId = videoLink ? (videoLink.includes('youtu.be') ? videoLink.split('/').pop().split('?')[0] : videoLink.split('v=')[1].split('&')[0]) : null;
    const backgroundImageUrl = videoId ? `https://img.youtube.com/vi/${videoId}/sddefault.jpg` : PlaceHolderImg;

    const handleVideoReady = (state) => {
        setPlaying(state);
        setShowThumbnail(!state);
    };


    const handleSeek = (e) => {
        try{
            if (e && typeof e.playedSeconds === "number") {
                setSeekPosition(parseFloat(e.playedSeconds));
                // Avoid pausing the video when seeking
                if (!manualPause) {
                    setPlaying(true);
                }
            }

        }catch(error){
            console.log(error)
        }
    };

    const handleSeekEnd = () => {
        setShowThumbnail(false);
    };

    const handlePause = () => {
        setManualPause(true); // Manually pause the video
        setShowThumbnail(true); // Reset showThumbnail to true
    };


    const galleryPhotos = getPropData && getPropData.gallery;

    const openLightbox = (index) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    };



    const closeLightbox = () => {
        // if (viewerIsOpen) {
        setCurrentImage(0);
        setViewerIsOpen(false);
        // }
    };
    const handleShowMap = () => {
        if (isPremiumProperty) {
            if (isPremiumUser) {
                setShowMap(true);
            } else {
                Swal.fire({
                    title: "Opps!",
                    text: " Private property ahead. Upgrade for premium access. Join now to explore exclusive features!",
                    icon: "warning",
                    allowOutsideClick: true,
                    showCancelButton: false,
                    customClass: {
                        confirmButton: 'Swal-confirm-buttons',
                        cancelButton: "Swal-cancel-buttons"
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push("/subscription-plan");
                    }
                });

            }
        } else {
            setShowMap(true);
        }
    }
    useEffect(() => {

        return () => {
            setShowMap(false);
            setIsReported(false)
        };


    }, [userCurrentId, propId]);
    useEffect(() => {

        return () => {
            setIsReported(false)
        };


    }, [userCurrentId, propId]);
    useEffect(() => {

        if (userCurrentId === getPropData?.added_by) {
            setShowChat(false);
        } else {
            setShowChat(true);
        }

    }, [propId, showChat, isLoggedIn, getPropData?.added_by]);

    const handleInterested = (e) => {
        e.preventDefault();
        if (userCurrentId) {
            intrestedPropertyApi(
                getPropData.id,
                "1",
                (response) => {
                    setInterested(true);
                    toast.success(response.message);
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            Swal.fire({
                title: translate("plzLogFirstIntrest"),
                icon: "warning",
                allowOutsideClick: false,
                showCancelButton: false,
                allowOutsideClick: true,
                customClass: {
                    confirmButton: 'Swal-confirm-buttons',
                    cancelButton: "Swal-cancel-buttons"
                },
                confirmButtonText: "Ok",
            }).then((result) => {
                if (result.isConfirmed) {
                    setShowModal(true)
                }
            });
        }
    };

    const handleNotInterested = (e) => {
        e.preventDefault();

        intrestedPropertyApi(
            getPropData.id,
            "0",
            (response) => {
                setInterested(false);
                toast.success(response.message);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const handleChat = (e) => {
        e.preventDefault();
        if (SettingsData?.demo_mode === true) {
            Swal.fire({
                title: "Opps!",
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
        } else {
            if (userCurrentId) {
                setChatData((prevChatData) => {
                    const newChatData = {
                        property_id: getPropData.id,
                        slug_id: getPropData.slug_id,
                        title: getPropData.title,
                        title_image: getPropData.title_image,
                        user_id: getPropData.added_by,
                        name: getPropData.customer_name,
                        profile: getPropData.profile,
                    };

                    // Use the updater function to ensure you're working with the latest state
                    // localStorage.setItem('newUserChat', JSON.stringify(newChatData));
                    getChatData(newChatData)
                    return newChatData;
                });

                router.push('/user/chat');
            } else {
                Swal.fire({
                    title: translate("plzLogFirsttoAccess"),
                    icon: "warning",
                    allowOutsideClick: false,
                    showCancelButton: false,
                    allowOutsideClick: true,
                    customClass: {
                        confirmButton: 'Swal-confirm-buttons',
                        cancelButton: "Swal-cancel-buttons"
                    },
                    confirmButtonText: "Ok",
                }).then((result) => {
                    if (result.isConfirmed) {
                        setShowModal(true)
                    }
                });
                setShowChat(true);
            }
        }
    };
    const handleReportProperty = (e) => {
        e.preventDefault();
        if (userCurrentId) {
            setIsReporteModal(true)
        } else {
            Swal.fire({
                title: translate("plzLogFirsttoAccess"),
                icon: "warning",
                allowOutsideClick: false,
                showCancelButton: false,
                allowOutsideClick: true,
                customClass: {
                    confirmButton: 'Swal-confirm-buttons',
                    cancelButton: "Swal-cancel-buttons"
                },
                confirmButtonText: "Ok",
            }).then((result) => {
                if (result.isConfirmed) {
                    setShowModal(true)
                }
            });
        }
    }



    useEffect(() => {
    }, [chatData, isReported])

    // SET PROPERTY CLICKS API 
    // Define a function to fetch property total clicks data
    const fetchPropertyTotalClicks = async () => {
        try {
            const response = await setPropertyTotalClicksApi({
                slug_id: propId.slug,
            });
            return response.data ?? null;
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to be handled by SWR
        }
    };

    // Use SWR to fetch property total clicks data
    const { data: propertyTotalClicksData, error: propertyTotalClicksError } = useSWR(
        ['propertyTotalClicksData', propId.slug], // Use propId.slug as part of the key
        fetchPropertyTotalClicks,
        {
            refreshInterval: 0, // Disable automatic revalidation
            revalidateOnMount: true, // Fetch data only once after reload
            revalidateOnFocus: false, // Disable automatic revalidation on focus
        }
    );


    const [isLoaded, setIsLoaded] = useState(false);




    return (
        <Fragment>

            <Layout>
                {/* <Breadcrumbw
                    data={{
                        type: getPropData && getPropData.category.category,
                        title: getPropData && getPropData.title,
                        loc: getPropData && getPropData.address,
                        propertyType: getPropData && getPropData.property_type,
                        time: getPropData && getPropData.post_created,
                        price: getPropData && getPropData.price,
                        is_favourite: getPropData && getPropData.is_favourite,
                        propId: getPropData && getPropData.id,
                        title_img: getPropData && getPropData.title_image,
                        rentduration: getPropData && getPropData.rentduration
                    }}
                /> */}
                
                <section className="properties-deatil-page pt-5 mt-5">
                    <div id="all-prop-deatil-containt">
                        <div className="container">

                            {
                                getPropData && getPropData.title &&
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb gap-s-3">
                                        <li className="breadcrumb-item"><Link className="" href="/">Home</Link></li>
                                        <li className="breadcrumb-item me-2"><Link className="" href="/cites/ryadah">Riyadh</Link></li>
                                        <li className="breadcrumb-item active me-2" aria-current="page">{getPropData.title}</li>
                                    </ol>
                                </nav>
                            }
                            {galleryPhotos && galleryPhotos.length > 0 &&
                                <div className="overflow-hidden d-lg-none mb-4">
                                    <Swiper
                                        // install Swiper modules
                                        modules={[Scrollbar, A11y]}
                                        spaceBetween={15}
                                        slidesPerView={1.2}
                                        // pagination={{ clickable: true }}
                                        scrollbar={{ draggable: true }}
                                        onSwiper={(swiper) => console.log(swiper)}
                                        onSlideChange={() => console.log()}
                                        >
                                            <SwiperSlide>
                                                <div className="bs-pb-80 position-relative overflow-hidden rounded-3">
                                                    <Image
                                                        onError={placeholderImage}
                                                        loading="lazy"
                                                        src={getPropData?.title_image || PlaceHolderImg}
                                                        className="img-fluid"
                                                        style={{ objectFit: 'cover', cursor: 'pointer'}}
                                                        alt={`photo slid main`}
                                                        fill
                                                        onClick={() => openLightbox(0)}
                                                        property
                                                    />
                                                </div>
                                            </SwiperSlide>
                                            {
                                                galleryPhotos.map((item, idx) => (
                                                    <SwiperSlide>
                                                        <div className="bs-pb-80 position-relative overflow-hidden rounded-3">
                                                            <Image
                                                                onError={placeholderImage}
                                                                loading="lazy"
                                                                src={item.image_url || PlaceHolderImg}
                                                                className="img-fluid"
                                                                style={{ objectFit: 'cover', cursor: 'pointer'}}
                                                                alt={`photo slid-${idx}`}
                                                                fill
                                                                onClick={() => openLightbox(idx+1)}
                                                            />
                                                        </div>
                                                    </SwiperSlide>
                                                ))
                                            }
                                    </Swiper>
                                </div>
                            }

                             {/* <div className="image-wrapper">
                                <Image
                                    className={`blurred ${isLoaded ? 'loaded' : ''}`}
                                    src={galleryPhotos? galleryPhotos[0]?.image_url : ''}
                                    alt={'ss dd qq'}
                                    quality={100}
                                    onLoadingComplete={() => setIsLoaded(true)}
                                    sizes="100vw"
                                    fill
                                    // placeholder="blur"
                                />
                            </div> */}

                            {galleryPhotos && galleryPhotos.length > 0 ? (
                                <div className="row d-none d-lg-flex" id="prop-images">
                                    {galleryPhotos.length < 2 ? (
                                        <div className="grid-gallery">
                                            <div className="col-sm-12 col-md-6" id="prop-main-image">
                                                <Image
                                                    onError={placeholderImage}
                                                    loading="lazy"
                                                    src={getPropData?.title_image || PlaceHolderImg}
                                                    className="two-img01"
                                                    alt="Main Image" width={200}
                                                    height={200}
                                                    onClick={() => openLightbox(0)} />
                                            </div>
                                            <div className="col-sm-12 col-md-6" id="prop-main-image">
                                                <Image
                                                    onError={placeholderImage}
                                                    loading="lazy"
                                                    src={galleryPhotos[0]?.image_url || PlaceHolderImg}
                                                    className="two-img02"
                                                    alt="Main Image"
                                                    width={200}
                                                    height={200}
                                                    onClick={() => openLightbox(1)} />

                                                <div className="see_all02">
                                                    <button onClick={() => openLightbox(2)}>{galleryPhotos.length - 2} {` `} {translate("morePhotos")}</button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Fragment>
                                            <div className="col-lg-8 col-xl-6 col-sm-12 text-center pe-1 pe-xl-2" id="prop-main-image">
                                                <div className="bs-pb-80 position-relative overflow-hidden rounded-3">
                                                    <Image
                                                        onError={placeholderImage}
                                                        loading="lazy"
                                                        src={getPropData?.title_image || PlaceHolderImg}
                                                        className="img-fluid"
                                                        style={{ objectFit: 'cover', cursor: 'pointer'}}
                                                        alt="Main Image"
                                                        fill
                                                        onClick={() => openLightbox(0)}
                                                    />
                                                </div>
                                                
                                            </div>
                                            <div className="col-lg-4 col-xl-3 col-sm-12 d-flex flex-column gap-3 gap-xl-4">
                                                <div className="bs-pb-40 position-relative overflow-hidden rounded-3">
                                                    <Image
                                                        onError={placeholderImage}
                                                        loading="lazy"
                                                        src={galleryPhotos[0]?.image_url || PlaceHolderImg}
                                                        className="img-fluid"
                                                        style={{ objectFit: 'cover', cursor: 'pointer'}}
                                                        alt="Image 1"
                                                        fill
                                                        onClick={() => openLightbox(1)}
                                                    />
                                                </div>
                                                <div className="bs-pb-40 position-relative overflow-hidden rounded-3" id="prop-left-images">
                                                    <Image
                                                        onError={placeholderImage}
                                                        loading="lazy"
                                                        src={galleryPhotos[1]?.image_url || PlaceHolderImg}
                                                        className="img-fluid"
                                                        style={{ objectFit: 'cover', cursor: 'pointer'}}
                                                        alt="Image 2"
                                                        fill
                                                        onClick={() => openLightbox(2)}
                                                    />
                                                    {
                                                        galleryPhotos.length > 2 &&
                                                        <div className="see_all d-xl-none">
                                                            <button onClick={() => openLightbox(3)}>{galleryPhotos.length - 2} {` `} {translate("morePhotos")}</button>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-sm-12 flex-column d-none d-xl-flex  gap-3 gap-xl-4">
                                                <div className="bs-pb-40 position-relative overflow-hidden rounded-3">
                                                    <Image
                                                        onError={placeholderImage}
                                                        loading="lazy"
                                                        src={galleryPhotos[2]?.image_url || PlaceHolderImg}
                                                        className="img-fluid"
                                                        style={{ objectFit: 'cover', cursor: 'pointer'}}
                                                        alt="Image 3"
                                                        fill
                                                        onClick={() => openLightbox(3)}
                                                    />
                                                </div>
                                                <div className="bs-pb-40 position-relative overflow-hidden rounded-3" id="prop-left-images">
                                                    <Image
                                                        onError={placeholderImage}
                                                        loading="lazy"
                                                        src={galleryPhotos[3]?.image_url || PlaceHolderImg}
                                                        className="img-fluid"
                                                        style={{ objectFit: 'cover', cursor: 'pointer'}}
                                                        alt="Image 4"
                                                        fill
                                                        onClick={() => openLightbox(4)}
                                                    />
                                                    {
                                                        galleryPhotos.length > 4 &&
                                                        <div className="see_all">
                                                            <button onClick={() => openLightbox(5)}>{galleryPhotos.length - 4} {` `} {translate("morePhotos")}</button>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            
                                        </Fragment>

                                    )}
                                </div>
                            ) :
                                <div className="row" id="prop-images">
                                    <div className="col-12" id="prop-main-image01">
                                        <Image
                                            onError={placeholderImage}
                                            loading="lazy"
                                            src={getPropData?.title_image || PlaceHolderImg}
                                            className="one-img"
                                            alt="Main Image"
                                            width={200}
                                            height={200}
                                            onClick={() => openLightbox(0)} />
                                    </div>
                                </div>
                            }

                            {/* {viewerIsOpen && */}
                            <LightBox photos={galleryPhotos} viewerIsOpen={viewerIsOpen} currentImage={currentImage} onClose={setViewerIsOpen} title_image={getPropData?.title_image} setViewerIsOpen={setViewerIsOpen} setCurrentImage={setCurrentImage} />
                            {/* } */}

                            { getPropData && 
                            <div className="row" id="prop-all-deatils-cards">
                                <div className="col-12 col-md-12 col-lg-7" id="prop-deatls-card">
                                    <div className="">
                                        <div className="h3 mb-2">{getPropData.address}</div>
                                        
                                        <span className="text-muted">{translate("listedOn")} {` `} <TimeComponent timeAgo={getPropData.post_created} /></span>

                                        <div className="d-flex gap-2 flex-wrap mt-3">
                                            <div className="features-and-amenities">

                                                {/* Category Name */}
                                                <div className="feature_img_value">
                                                    {themeEnabled ? (

                                                        <ImageToSvg imageUrl={getPropData.category.image !== undefined && getPropData.category.image !== null ? getPropData.category.image : PlaceHolderImg} className="custom-svg" />
                                                    ) : (
                                                        <Image loading="lazy" src={getPropData.category?.image} alt="no_img" width={20} height={16} onError={placeholderImage} />
                                                    )}
                                                    <p>
                                                        <span> {getPropData.category.category}</span>
                                                    </p>
                                            </div>
                                            
                                        </div>
                                            {getPropData &&
                                                getPropData.parameters.map((elem, index) =>
                                                    elem.value !== "" && elem.value !== "0" ? (
                                                    <div className="features-and-amenities" key={index}>
                                                        {/* <div className="feature_img_value">
                                                            <p><span> {elem?.name}</span></p>
                                                        </div> */}
                                                        <div className="feature_img_value">
                                                            {themeEnabled ? (

                                                                <ImageToSvg imageUrl={elem.image !== undefined && elem.image !== null ? elem.image : PlaceHolderImg} className="custom-svg" />
                                                            ) : (
                                                                <Image loading="lazy" src={elem?.image} alt="no_img" width={20} height={16} onError={placeholderImage} />
                                                            )}
                                                            <p>
                                                                {Array.isArray(elem?.value) ? elem.value.slice(0, 2).join(', ') : elem.value}
                                                                {
                                                                    elem?.name !== 'Size' &&
                                                                    <span> {elem?.name}</span>
                                                                }
                                                            </p>
                                                        </div>
                                                        
                                                    </div>

                                            ): '')}
                                        </div>
                                        
                                    </div>
                                    
                                    {getPropData && getPropData.description ? (
                                        <Fragment>
                                            <hr className="my-2" />
                                            <div className="">
                                                
                                                <h4 className="h4 mb-4">{translate("aboutProp")}</h4>
                                                {getPropData && getPropData.description && (
                                                    <Fragment>
                                                        <p style={{ fontSize: '20px', overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: expanded ? 'none' : '6em', marginBottom: '0', whiteSpace: 'pre-wrap' }}>
                                                            {getPropData.description}
                                                        </p>

                                                        <button className="seemore-btn" onClick={() => setExpanded(!expanded)} style={{ display: getPropData.description.split('\n').length > 3 ? 'flex' : 'none' }}>
                                                            {expanded ? translate("showLess") : translate("showMore")}
                                                            {/* <AiOutlineArrowRight className="mx-2" size={18} /> */}
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                            </svg>

                                                        </button>
                                                    </Fragment>
                                                )}
                                            </div>
                                        </Fragment>
                                    ) : null}

                                    <hr className="my-3" />
                                    
                                    <div className="card border-slate rounded-4 bg-light p-4">
                                            <div className="h4 mb-3">{translate("propertyListedBy")}</div>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex gap-2 align-items-center">
                                                    <Image 
                                                        src={AvatarImage}
                                                        alt={`properity List Avatar`}
                                                        width={54}
                                                        height={54}
                                                        className="rounded-pill"
                                                    />
                                                    <div className="">
                                                        <p className="fs-5 fw-normal mb-0 text-black">{getPropData.customer_name}</p>
                                                        <p className="text-muted mb-0">{getPropData.mobile}</p>
                                                    </div>
                                                </div>
                                                <button className="button button-outline">{translate("getMoreInfo")}</button>
                                            </div>
                                    </div>

                                    
                                    
                                    
                                    {/* {getPropData && getPropData.assign_facilities.length > 0 && getPropData.assign_facilities.some((elem) => elem.distance !== null && elem.distance !== "" && elem.distance !== 0) ? (
                                        <hr className="my-3" />
                                        <div className="card " id="features-amenities">
                                            <div className="card-header">{translate("OTF")}</div>
                                            <div className="card-body">
                                                <div className="row">
                                                    {getPropData &&
                                                        getPropData.assign_facilities.map((elem, index) =>
                                                            // Check if the value is an empty string
                                                            elem.distance !== "" && elem.distance !== 0 ? (
                                                                <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
                                                                    <div id="specification">
                                                                        <div className="spec-icon">
                                                                            {themeEnabled ? (
                                                                                <ImageToSvg imageUrl={elem.image !== undefined && elem.image !== null ? elem?.image : PlaceHolderImg} className="custom-svg" />
                                                                            ) : (
                                                                                <Image
                                                                                    loading="lazy"
                                                                                    src={elem.image !== undefined && elem.image !== null ? elem.image : PlaceHolderImg}
                                                                                    width={20}
                                                                                    height={16}
                                                                                    alt="no_img"
                                                                                    onError={placeholderImage}
                                                                                />
                                                                            )}
                                                                        </div>

                                                                        <div id="specs-deatils">
                                                                            <div>
                                                                                <span>{elem.name}</span>
                                                                            </div>
                                                                            <div className="valueDiv">

                                                                                <span id="spacs-count">{elem.distance} {""} {translate("km")}   </span>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : null
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : null} */}


                                    {getPropData && getPropData.latitude && getPropData.longitude ? (
                                        <Fragment>
                                            <hr className="my-3" />
                                            <div className="" id="propertie_address">
                                                <div className="h4 mb-3">{translate("location")}</div>
                                                <p className="fs-5 d-flex align-items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24}}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                    </svg>
                                                    {getPropData && getPropData.address}
                                                </p>
                                                <div className="">
                                                    {/* <div className="row" id="prop-address">
                                                        {!isPremiumProperty || isPremiumUser ? (
                                                            <>
                                                                <div className="adrs">
                                                                    <div>
                                                                        <span> {translate("address")}</span>
                                                                    </div>
                                                                    <div className="">
                                                                        <span> {translate("city")}</span>
                                                                    </div>
                                                                    <div className="">
                                                                        <span> {translate("state")}</span>
                                                                    </div>
                                                                    <div className="">
                                                                        <span> {translate("country")}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="adrs02">
                                                                    <div className="adrs_value">
                                                                        <span>{getPropData && getPropData.address}</span>
                                                                    </div>
                                                                    <div className="adrs_value">
                                                                        <span className="">{getPropData && getPropData.city}</span>
                                                                    </div>

                                                                    <div className="adrs_value">
                                                                        <span className="">{getPropData && getPropData.state}</span>
                                                                    </div>
                                                                    <div className="adrs_value">
                                                                        <span className="">{getPropData && getPropData.country}</span>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : null}
                                                    </div> */}
                                                    {getPropData ? (
                                                        <div className="card google_map rounded-4 border-0  overflow-hidden">
                                                            {showMap ? (
                                                                <Map latitude={getPropData.latitude} longitude={getPropData.longitude} />
                                                            ) : (
                                                                <>
                                                                    <div className="blur-background" />
                                                                    <div className="blur-container">
                                                                        <div className="view-map-button-div">
                                                                            <button onClick={handleShowMap} id="view-map-button">
                                                                                {translate("ViewMap")}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </Fragment>
                                    ) : null}

                                    

                                    {getPropData && getPropData.video_link ? (
                                        <Fragment>
                                            <hr className="my-3" />
                                            <div className="" id="prop-video">
                                                <div className="h4 mb-4">{translate("videoTour")}</div>
                                                <div className="overflow-hidden rounded-4">
                                                    {!playing ? (
                                                        <div
                                                            className="video-background container"
                                                            style={{
                                                                backgroundImage: `url(${backgroundImageUrl})`,
                                                                backgroundSize: "cover",
                                                                backgroundPosition: "center center",
                                                            }}

                                                        >
                                                            <div id="video-play-button">
                                                                <button onClick={() => setPlaying(true)} aria-label="Play video Tour">
                                                                    <PiPlayCircleThin className="button-icon" size={80} />
                                                                    <span className="hidden-text-seo"> </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <ReactPlayer
                                                                className="prop_video_player"
                                                                url={getPropData && getPropData.video_link}
                                                                playing={playing}
                                                                controls={true}
                                                                onPlay={() => handleVideoReady(true)}
                                                                onPause={() => {
                                                                    setManualPause(true); // Manually pause the video
                                                                    handlePause();
                                                                }}
                                                                onEnded={() => setPlaying(false)}
                                                                onProgress={handleSeek}
                                                                onSeek={handleSeek}
                                                                onSeekEnd={handleSeekEnd}
                                                            />

                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Fragment>
                                    ) : null}

                                    {getPropData && getPropData.layout ? (
                                        <Fragment>
                                            <hr className="my-3" />
                                            <div className="h4">{translate("propertyLayout")} ({getPropData.layout.length})</div>
                                                <div className="">
                                                    <div className="d-flex flex-column gap-4" style={{ overflow: 'hidden', maxHeight: expandedLayout ? 'none' : '23em' }}>
                                                        {
                                                            getPropData.layout.map((item, idx) => (
                                                                <div className="border rounded-4 p-4 d-flex align-items-center gap-4" kry={idx}>
                                                                    <div className="overflow-hidden position-relative rounded-3" style={{ paddingBlockEnd: 120, width: 120 }}>
                                                                        <Image 
                                                                            onError={placeholderImage}
                                                                            loading="lazy"
                                                                            src={item.image_url || PlaceHolderImg}
                                                                            className="img-fluid"
                                                                            style={{ objectFit: 'cover'}}
                                                                            alt={`photo Layout ${idx}`}
                                                                            fill
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex flex-column justify-content-between">
                                                                        <p className="fs-5 fw-normal mb-0 text-black">Camelia Layout</p>
                                                                        
                                                                        <div className="d-flex gap-2 flex-wrap my-2">
                                                                            {getPropData &&
                                                                                getPropData.parameters.map((elem, index) =>
                                                                                    elem.value !== "" && elem.value !== "0" ? (
                                                                                    <div className="features-and-amenities" key={index}>
                                                                                        {/* <div className="feature_img_value">
                                                                                            <p><span> {elem?.name}</span></p>
                                                                                        </div> */}
                                                                                        <div className="feature_img_value">
                                                                                            {themeEnabled ? (

                                                                                                <ImageToSvg imageUrl={elem.image !== undefined && elem.image !== null ? elem.image : PlaceHolderImg} className="custom-svg" />
                                                                                            ) : (
                                                                                                <Image loading="lazy" src={elem?.image} alt="no_img" width={20} height={16} onError={placeholderImage} />
                                                                                            )}
                                                                                            <p>
                                                                                                {Array.isArray(elem?.value) ? elem.value.slice(0, 2).join(', ') : elem.value}
                                                                                                {
                                                                                                    elem?.name !== 'Size' &&
                                                                                                    <span> {elem?.name}</span>
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                        
                                                                                    </div>

                                                                            ): '')}
                                                                        </div>
                                                                        <p className="fs-5 fw-semibold mb-0 text-black">56,732.06 SAR</p>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                        
                                                    </div>
                                                    {
                                                        getPropData.layout.length > 2 &&
                                                        <button className="seemore-btn mx-auto" onClick={() => setExpandedLayout(!expandedLayout)} style={{ outline: 'none' }}>
                                                            {expandedLayout ? translate("showLess") : translate("showMore")}
                                                            {/* <AiOutlineArrowRight className="mx-2" size={18} /> */}
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" style={{ transform: expandedLayout ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                            </svg>
                                                        </button>
                                                    }
                                                </div>
                                        </Fragment>

                                    ): null}

                                    
                                    <hr className="my-3" />                                      
                                    <div className="">
                                        <div className="h4 mb-4">{translate("360tourView")}</div>
                                        <div className="rounded-4 overflow-hidden position-relative canvas-container">
                                            <iframe
                                                title="360 tour View"
                                                src="https://momento360.com/e/uc/fb0d71acfc7a4aa8a8cf9493793b0769?utm_campaign=marketingsite&utm_source=www&size=large&display-plan=true&upload-key=9f0752e203f443a09130aaf6ada85104"
                                                // frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                style={{ width: '100%', height: '100%,', position: 'absolute' }}
                                            />
                                        </div>

                                    </div>

                                </div>



                                <div className="col-12 col-md-12 col-lg-5 ps-0 ps-lg-4">
                                    {/* {!isPremiumProperty || isPremiumUser ? (
                                        <OwnerDeatilsCard
                                            getPropData={getPropData}
                                            showChat={showChat}
                                            userCurrentId={userCurrentId}
                                            interested={interested}
                                            isReported={isReported}
                                            handleInterested={handleInterested}
                                            isMessagingSupported={isMessagingSupported}
                                            handleNotInterested={handleNotInterested}
                                            notificationPermissionGranted={notificationPermissionGranted}
                                            handleChat={handleChat}
                                            handleReportProperty={handleReportProperty}
                                            PlaceHolderImg={PlaceHolderImg}

                                        />
                                    ) : (
                                        <PremiumOwnerDetailsCard
                                            getPropData={getPropData}
                                            showChat={showChat}
                                            userCurrentId={userCurrentId}
                                            interested={interested}
                                            isReported={isReported}
                                            handleInterested={handleInterested}
                                            isMessagingSupported={isMessagingSupported}
                                            handleNotInterested={handleNotInterested}
                                            notificationPermissionGranted={notificationPermissionGranted}
                                            handleChat={handleChat}
                                            handleReportProperty={handleReportProperty}

                                        />
                                    )
                                    } */}
                                    <div className="sticky-card-price">
                                        <div className="card p-4 d-flex flex-column rounded-4">
                                            <span className="d-block mb-3 text-muted fs-5">{translate("price")}</span>
                                            <span className="h2">
                                                    {formatNumberWithCommas(getPropData && getPropData.price)} {CurrencySymbol}
                                            </span>
                                            <hr className="mb-4" />
                                            <button className="enquiry-buttons button button-solid py-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M10 3H14C18.4183 3 22 6.58172 22 11C22 15.4183 18.4183 19 14 19V22.5C9 20.5 2 17.5 2 11C2 6.58172 5.58172 3 10 3ZM12 17H14C17.3137 17 20 14.3137 20 11C20 7.68629 17.3137 5 14 5H10C6.68629 5 4 7.68629 4 11C4 14.61 6.46208 16.9656 12 19.4798V17Z" fill="white"/>
                                                </svg>
                                                {translate("chat")}
                                            </button>
                                            <br />
                                            <button className="enquiry-buttons button button-outline py-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 25 24" fill="none">
                                                    <path d="M7.75361 18.4944L8.47834 18.917C9.68909 19.623 11.0651 20 12.501 20C16.9193 20 20.501 16.4183 20.501 12C20.501 7.58172 16.9193 4 12.501 4C8.0827 4 4.50098 7.58172 4.50098 12C4.50098 13.4363 4.87821 14.8128 5.58466 16.0238L6.00704 16.7478L5.35355 19.1494L7.75361 18.4944ZM2.50516 22L3.85712 17.0315C2.99494 15.5536 2.50098 13.8345 2.50098 12C2.50098 6.47715 6.97813 2 12.501 2C18.0238 2 22.501 6.47715 22.501 12C22.501 17.5228 18.0238 22 12.501 22C10.6671 22 8.94851 21.5064 7.47086 20.6447L2.50516 22ZM8.89232 7.30833C9.0262 7.29892 9.16053 7.29748 9.29459 7.30402C9.34875 7.30758 9.40265 7.31384 9.45659 7.32007C9.61585 7.33846 9.79098 7.43545 9.84986 7.56894C10.1482 8.24536 10.4376 8.92565 10.7182 9.60963C10.7801 9.76062 10.7428 9.95633 10.625 10.1457C10.5652 10.2428 10.4713 10.379 10.3625 10.5183C10.2494 10.663 10.006 10.9291 10.006 10.9291C10.006 10.9291 9.90738 11.0473 9.94455 11.1944C9.95903 11.25 10.0052 11.331 10.0471 11.3991C10.0703 11.4368 10.0918 11.4705 10.1058 11.4938C10.3617 11.9211 10.7057 12.3543 11.1259 12.7616C11.2463 12.8783 11.3631 12.9974 11.4887 13.108C11.957 13.5209 12.4868 13.8583 13.059 14.1082L13.0641 14.1105C13.1486 14.1469 13.192 14.1668 13.3157 14.2193C13.3781 14.2457 13.4419 14.2685 13.5074 14.2858C13.5311 14.292 13.5554 14.2955 13.5798 14.2972C13.7415 14.3069 13.835 14.2032 13.8749 14.1555C14.5984 13.279 14.6646 13.2218 14.6696 13.2222V13.2238C14.7647 13.1236 14.9142 13.0888 15.0476 13.097C15.1085 13.1007 15.1691 13.1124 15.2245 13.1377C15.7563 13.3803 16.6258 13.7587 16.6258 13.7587L17.2073 14.0201C17.3047 14.0671 17.3936 14.1778 17.3979 14.2854C17.4005 14.3523 17.4077 14.4603 17.3838 14.6579C17.3525 14.9166 17.2738 15.2281 17.1956 15.3913C17.1406 15.5058 17.0694 15.6074 16.9866 15.6934C16.8743 15.81 16.7909 15.8808 16.6559 15.9814C16.5737 16.0426 16.5311 16.0714 16.5311 16.0714C16.3922 16.159 16.3139 16.2028 16.1484 16.2909C15.891 16.428 15.6066 16.5068 15.3153 16.5218C15.1296 16.5313 14.9444 16.5447 14.7589 16.5347C14.7507 16.5342 14.1907 16.4482 14.1907 16.4482C12.7688 16.0742 11.4538 15.3736 10.3503 14.402C10.1247 14.2034 9.9155 13.9885 9.70194 13.7759C8.81288 12.8908 8.13982 11.9364 7.73169 11.0336C7.53043 10.5884 7.40299 10.1116 7.40098 9.62098C7.39729 9.01405 7.59599 8.4232 7.96569 7.94186C8.03857 7.84697 8.10774 7.74855 8.22709 7.63586C8.35348 7.51651 8.43392 7.45244 8.52057 7.40811C8.63607 7.34902 8.76293 7.31742 8.89232 7.30833Z" fill="#5A727B"/>
                                                </svg>
                                                {translate("whatsapp")}
                                            </button>
                                        </div>
                                        <div className="d-flex gap-3 mt-3">
                                            <button className="button button-outline d-flex justify-content-center gap-1 w-50">
                                                {translate("save")}
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '20px'}}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                </svg>
                                            </button>
                                            <button className="button button-outline d-flex justify-content-center gap-1 w-50">
                                                {translate("share")}
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '20px'}}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                                </svg>

                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mobile-card-sticky d-lg-none">
                                    <div className="container">
                                        <div className="sticky-content">
                                            <div className="card-details">
                                                <Image 
                                                    src={getPropData && getPropData.title_image}
                                                    width={54}
                                                    alt={`Sticky Properity Image`}
                                                    height={54}
                                                />
                                                <div className="">
                                                    {/* <span className="d-block">{translate("price")}</span> */}
                                                    <div className="text-muted"><small>{getPropData && getPropData.title}</small></div>
                                                    <span className="h5 mb-0">
                                                        {CurrencySymbol} {formatNumberWithCommas(getPropData && getPropData.price)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="card-button">
                                                <button className="enquiry-buttons button button-solid px-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M10 3H14C18.4183 3 22 6.58172 22 11C22 15.4183 18.4183 19 14 19V22.5C9 20.5 2 17.5 2 11C2 6.58172 5.58172 3 10 3ZM12 17H14C17.3137 17 20 14.3137 20 11C20 7.68629 17.3137 5 14 5H10C6.68629 5 4 7.68629 4 11C4 14.61 6.46208 16.9656 12 19.4798V17Z" fill="white"/>
                                                    </svg>
                                                    {translate("chat")}
                                                </button>
                                                <br />
                                                <button className="enquiry-buttons button button-outline px-2" aria-label="whatsapp chat">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 25 24" fill="none">
                                                        <path d="M7.75361 18.4944L8.47834 18.917C9.68909 19.623 11.0651 20 12.501 20C16.9193 20 20.501 16.4183 20.501 12C20.501 7.58172 16.9193 4 12.501 4C8.0827 4 4.50098 7.58172 4.50098 12C4.50098 13.4363 4.87821 14.8128 5.58466 16.0238L6.00704 16.7478L5.35355 19.1494L7.75361 18.4944ZM2.50516 22L3.85712 17.0315C2.99494 15.5536 2.50098 13.8345 2.50098 12C2.50098 6.47715 6.97813 2 12.501 2C18.0238 2 22.501 6.47715 22.501 12C22.501 17.5228 18.0238 22 12.501 22C10.6671 22 8.94851 21.5064 7.47086 20.6447L2.50516 22ZM8.89232 7.30833C9.0262 7.29892 9.16053 7.29748 9.29459 7.30402C9.34875 7.30758 9.40265 7.31384 9.45659 7.32007C9.61585 7.33846 9.79098 7.43545 9.84986 7.56894C10.1482 8.24536 10.4376 8.92565 10.7182 9.60963C10.7801 9.76062 10.7428 9.95633 10.625 10.1457C10.5652 10.2428 10.4713 10.379 10.3625 10.5183C10.2494 10.663 10.006 10.9291 10.006 10.9291C10.006 10.9291 9.90738 11.0473 9.94455 11.1944C9.95903 11.25 10.0052 11.331 10.0471 11.3991C10.0703 11.4368 10.0918 11.4705 10.1058 11.4938C10.3617 11.9211 10.7057 12.3543 11.1259 12.7616C11.2463 12.8783 11.3631 12.9974 11.4887 13.108C11.957 13.5209 12.4868 13.8583 13.059 14.1082L13.0641 14.1105C13.1486 14.1469 13.192 14.1668 13.3157 14.2193C13.3781 14.2457 13.4419 14.2685 13.5074 14.2858C13.5311 14.292 13.5554 14.2955 13.5798 14.2972C13.7415 14.3069 13.835 14.2032 13.8749 14.1555C14.5984 13.279 14.6646 13.2218 14.6696 13.2222V13.2238C14.7647 13.1236 14.9142 13.0888 15.0476 13.097C15.1085 13.1007 15.1691 13.1124 15.2245 13.1377C15.7563 13.3803 16.6258 13.7587 16.6258 13.7587L17.2073 14.0201C17.3047 14.0671 17.3936 14.1778 17.3979 14.2854C17.4005 14.3523 17.4077 14.4603 17.3838 14.6579C17.3525 14.9166 17.2738 15.2281 17.1956 15.3913C17.1406 15.5058 17.0694 15.6074 16.9866 15.6934C16.8743 15.81 16.7909 15.8808 16.6559 15.9814C16.5737 16.0426 16.5311 16.0714 16.5311 16.0714C16.3922 16.159 16.3139 16.2028 16.1484 16.2909C15.891 16.428 15.6066 16.5068 15.3153 16.5218C15.1296 16.5313 14.9444 16.5447 14.7589 16.5347C14.7507 16.5342 14.1907 16.4482 14.1907 16.4482C12.7688 16.0742 11.4538 15.3736 10.3503 14.402C10.1247 14.2034 9.9155 13.9885 9.70194 13.7759C8.81288 12.8908 8.13982 11.9364 7.73169 11.0336C7.53043 10.5884 7.40299 10.1116 7.40098 9.62098C7.39729 9.01405 7.59599 8.4232 7.96569 7.94186C8.03857 7.84697 8.10774 7.74855 8.22709 7.63586C8.35348 7.51651 8.43392 7.45244 8.52057 7.40811C8.63607 7.34902 8.76293 7.31742 8.89232 7.30833Z" fill="#5A727B"/>
                                                    </svg>
                                                    <div className="d-none d-md-block">{translate("whatsapp")}</div>
                                                    <span className="hidden-text-seo">whatsapp chat</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            }           

                            {/* <SimilerPropertySlider /> */}

                            {isReporteModal &&
                                <ReportPropertyModal show={handleReportProperty} onHide={() => setIsReporteModal(false)} propertyId={getPropData?.id} setIsReported={setIsReported} />
                            }
                        </div>
                    </div>
                </section>
            </Layout >

            {showModal &&
                <LoginModal isOpen={showModal} onClose={handleCloseModal} />
            }

        </Fragment>
    );
};

export default PropertyDetails;
