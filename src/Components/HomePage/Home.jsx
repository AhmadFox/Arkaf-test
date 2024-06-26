"use client"
import React, { useEffect, useState, useRef, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

// Import 3th party packeges
import Skeleton from "react-loading-skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation } from "swiper/modules";

// Import Utils
import { 
    GetFeturedListingsApi,
    getUserRecommendationApi
} from "@/store/actions/campaign";
import { store } from "@/store/store";
import { languageData } from "@/store/reducer/languageSlice";
import { silderCacheData } from "@/store/reducer/momentSlice";
import { translate } from "@/utils";

// Import Dynamic Components
import Layout from "../Layout/Layout";
import LoginModal from "../LoginModal/LoginModal";

import MobileHeadline from "../MobileHeadlines/MobileHeadline";
import VerticalCard from "../Cards/VerticleCard";
import VerticalCardSkeleton from "../Skeleton/VerticalCardSkeleton";
import UserRecommendationCard from "../Cards/UserRecommendationCard";

// Import Component Block Section
import HeroHeader from "./HeroHeader";
import OurServices from "./OurServices";
import NearbyCityswiper from "../NearbyCitySwiper/NearbyCityswiper.jsx"

// import icons
import { BsArrowRight } from "react-icons/bs";

// Style import
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import 'swiper/css/navigation';
// import AOS animation style
import "aos/dist/aos.css";

// Import Static Images
import city_1 from "@/assets/citys/1.png";
import city_2 from "@/assets/citys/2.png";
import city_3 from "@/assets/citys/3.png";
import city_4 from "@/assets/citys/4.png";
import city_5 from "@/assets/citys/5.png";
import city_6 from "@/assets/citys/6.png";
import city_7 from "@/assets/citys/7.png";
import city_8 from "@/assets/citys/8.png";


const HomePage = () => {

    const lang = useSelector(languageData);
    useEffect(() => { }, [lang])

    const [isLoading, setIsLoading] = useState(true);

    const [nearbyCityData, setnearbyCityData] = useState()
    const [getFeaturedListing, setGetFeaturedListing] = useState();
    const [getMostViewedProp, setGetMostViewedProp] = useState();
    const [getMostFavProperties, setGetMostFavProperties] = useState();
    const [userRecommendationData, setUserRecommendationData] = useState();

    const isLoggedIn = useSelector((state) => state.User_signup);
    const userCurrentId = isLoggedIn && isLoggedIn?.data ? isLoggedIn?.data?.data?.id : null;
    const userCurrentLocation = isLoggedIn && isLoggedIn?.data ? isLoggedIn?.data?.data?.city : null;
    const language = store.getState().Language.languages;
    const sliderdata = useSelector(silderCacheData);

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const breakpoints = {
        0: {
            slidesPerView: 1,
        },
        375: {
            slidesPerView: 1.25,
            spaceBetween: 20
        },
        576: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        992: {
            slidesPerView: 2.5,
            spaceBetween: 20
        },
        1200: {
            slidesPerView: 3.5,
        },
        1400: {
            slidesPerView: 3.5,
        },
        1600: {
            slidesPerView: 3.5,
        },
    };

    const citys = [
        {
            name: "Riyadh",
            url: "cityes/riyadh/",
            image: city_1
        },
        {
            name: "Makkah",
            url: "cityes/makkah/",
            image: city_2
        },
        {
            name: "Madinah",
            url: "cityes/madinah/",
            image: city_3
        },
        {
            name: "Jeddah",
            url: "cityes/jeddah/",
            image: city_4
        },
        {
            name: "Dammam",
            url: "cityes/dammam/",
            image: city_5
        },
        {
            name: "Qaassim",
            url: "cityes/qaassim/",
            image: city_6
        },
        {
            name: "Khobar",
            url: "cityes/khobar/",
            image: city_7
        },
        {
            name: "Abha",
            url: "cityes/abha/",
            image: city_8
        },
    ];



    // GET NEARBY CITY DATA
    useEffect(() => {
        setIsLoading(true);
        if (userCurrentLocation) {
            GetFeturedListingsApi({
                city: userCurrentLocation,
                current_user: isLoggedIn ? userCurrentId : "",
                onSuccess: (response) => {
                    const cityData = response.data;
                    setIsLoading(false);
                    setnearbyCityData(cityData);
                },
                onError: (error) => {
                    console.log(error);
                    setIsLoading(true);
                }
            }
            );
        }
    }, [isLoggedIn, userCurrentLocation]);

    // GET FEATURED LISTINGS and
    // useEffect(() => {
    //     setIsLoading(true);

    //     GetFeturedListingsApi({
    //         promoted: "1",
    //         current_user: isLoggedIn ? userCurrentId : "",
    //         onSuccess: (response) => {
    //             const FeaturedListingData = response.data;
    //             setIsLoading(false);
    //             setGetFeaturedListing(FeaturedListingData);
    //         },
    //         onError: (error) => {
    //             console.log(error);
    //             setIsLoading(true);
    //         }
    //     }
    //     );
    // }, [isLoggedIn]);

    useEffect(() => {
        setIsLoading(true);

        GetFeturedListingsApi({
            is_featured: 1,
            current_user: isLoggedIn ? userCurrentId : "",
            onSuccess: (response) => {
                const FeaturedListingData = response.data;
                setIsLoading(false);
                setGetFeaturedListing(FeaturedListingData);
            },
            onError: (error) => {
                console.log(error);
                setIsLoading(true);
            }
        }
        );
    }, [isLoggedIn]);

    // GET MOST VIEWED PROPERTIES
    useEffect(() => {
        setIsLoading(true);

        GetFeturedListingsApi({
            top_rated: "2",
            current_user: isLoggedIn ? userCurrentId : "",
            onSuccess: (response) => {
                const MostViewed = response.data;
                setIsLoading(false);
                setGetMostViewedProp(MostViewed);
            },
            onError: (error) => {
                console.log(error);
                setIsLoading(true);
            }
        }
        );
    }, [isLoggedIn]);

    // GET MOST Fav PROPERTIES
    useEffect(() => {
        setIsLoading(true);

        GetFeturedListingsApi({
            most_liked: "1",
            current_user: isLoggedIn ? userCurrentId : "",
            onSuccess: (response) => {
                const MostFav = response.data;

                setIsLoading(false);
                setGetMostFavProperties(MostFav);
            },
            onError: (error) => {
                console.log(error);
            }
        }
        );
    }, [isLoggedIn]);

    // getUserRecommendationApi  
    useEffect(() => {
        if (isLoggedIn && userCurrentId) {
            getUserRecommendationApi({
                onSuccess: (res) => {
                    setUserRecommendationData(res.data)
                },
                onError: (err) => {
                    console.log(err)
                }
            })
        }
    }, [isLoggedIn])

    useEffect(() => {

    }, [nearbyCityData, userRecommendationData])

    const handleImageLoaded = () => {
        // Set isLoading to false when the image is loaded
        setIsLoading(false);
    };

    const swiperRef1 = useRef(null);
    const swiperRef2 = useRef(null);
    const swiperRef3 = useRef(null);

    useEffect(() => {
        if (!swiperRef1.current) return; // Ensure swiper instance is available
    
        const swiper = swiperRef1.current;
    
        const updateNavigation = () => {
          const prevButton = document.querySelector('.sw_prev_1');
          const nextButton = document.querySelector('.sw_next_1');
    
          if (swiper.isBeginning) {
            prevButton.classList.add('swiper-button-disabled');
          } else {
            prevButton.classList.remove('swiper-button-disabled');
          }
    
          if (swiper.isEnd) {
            nextButton.classList.add('swiper-button-disabled');
          } else {
            nextButton.classList.remove('swiper-button-disabled');
          }
        };
    
        // Add event listeners
        swiper.on('init', updateNavigation);
        swiper.on('slideChange', updateNavigation);
    
        // Perform initial navigation state update
        updateNavigation();
    
        // Cleanup event listeners when the component unmounts
        return () => {
          if (swiper) {
            swiper.off('init', updateNavigation);
            swiper.off('slideChange', updateNavigation);
          }
        };
    }, []);

    useEffect(() => {
    if (!swiperRef2.current) return; // Ensure swiper instance is available

    const swiper = swiperRef2.current;

    const updateNavigation = () => {
        const prevButton = document.querySelector('.sw_prev_2');
        const nextButton = document.querySelector('.sw_next_2');

        if (swiper.isBeginning) {
            prevButton.classList.add('swiper-button-disabled');
        } else {
            prevButton.classList.remove('swiper-button-disabled');
        }

        if (swiper.isEnd) {
            nextButton.classList.add('swiper-button-disabled');
        } else {
            nextButton.classList.remove('swiper-button-disabled');
        }
    };

    // Add event listeners
    swiper.on('init', updateNavigation);
    swiper.on('slideChange', updateNavigation);

    // Perform initial navigation state update
    updateNavigation();

    // Cleanup event listeners when the component unmounts
    return () => {
        if (swiper) {
        swiper.off('init', updateNavigation);
        swiper.off('slideChange', updateNavigation);
        }
    };
    }, []);

    useEffect(() => {
        if (!swiperRef3.current) return; // Ensure swiper instance is available
    
        const swiper = swiperRef3.current;
    
        const updateNavigation = () => {
            const prevButton = document.querySelector('.sw_prev_3');
            const nextButton = document.querySelector('.sw_next_3');
    
            if (swiper.isBeginning) {
                prevButton.classList.add('swiper-button-disabled');
            } else {
                prevButton.classList.remove('swiper-button-disabled');
            }
    
            if (swiper.isEnd) {
                nextButton.classList.add('swiper-button-disabled');
            } else {
                nextButton.classList.remove('swiper-button-disabled');
            }
        };
    
        // Add event listeners
        swiper.on('init', updateNavigation);
        swiper.on('slideChange', updateNavigation);
    
        // Perform initial navigation state update
        updateNavigation();
    
        // Cleanup event listeners when the component unmounts
        return () => {
            if (swiper) {
            swiper.off('init', updateNavigation);
            swiper.off('slideChange', updateNavigation);
            }
        };
        }, []);
    

    return (
        <Layout>

            {/* HERO HEADER SECTION  */}
            <HeroHeader />

            <div style={{ marginTop: sliderdata.length > 0 ? '0' : '0px' }}>

                {getFeaturedListing && getFeaturedListing.length > 0 ? (
                    <section id="main_properties">
                        <div className="container">
                            
                            <div className="most_fav_header">
                                <div className="mb-0 h3">{translate("discoverOur")} {translate("featured")} {translate("listings")}</div>
                                <div className="position-relative d-flex justify-content-center swiper-navigation-out d-none d-md-flex">
                                    <div className="swiper-button-prev sw_prev_3" onClick={() => swiperRef3.current.slidePrev()}></div>
                                    <div className="swiper-button-next sw_next_3" onClick={() => swiperRef3.current.slideNext()}></div>
                                </div>
                            </div>
                            <div className="mobile-headline-view">
                                <div className="text-center h3">{translate("discoverOur")} {translate("featured")} {translate("listings")}</div>
                                <div className="position-relative d-flex justify-content-center swiper-navigation-out d-none d-md-flex">
                                    <div className="swiper-button-prev sw_prev_3" onClick={() => swiperRef3.current.slidePrev()}></div>
                                    <div className="swiper-button-next sw_next_3" onClick={() => swiperRef3.current.slideNext()}></div>
                                </div>
                            </div>
                            <div id="most-view-properties" dir={language.rtl === "1" ? "rtl" : "ltr"}>
                                

                                <Swiper
                                    onSwiper={setSwiper => swiperRef3.current = setSwiper}
                                    slidesPerView={3.5}
                                    spaceBetween={30}
                                    freeMode={false}
                                    navigation={{
                                        prevEl: '.swiper-button-prev.sw_prev_3',
                                        nextEl: '.swiper-button-next.sw_next_3'
                                    }}
                                    onInit={(swiper) => {
                                        swiperRef3.current = swiper;
                                    }}
                                    pagination={true}
                                    modules={[FreeMode, Pagination, Navigation]}
                                    className="most-view-swiper"
                                    breakpoints={breakpoints}
                                >
                                    {isLoading ? (
                                        // Show skeleton loading when data is being fetched
                                        <Swiper
                                            dir={language.rtl === "1" ? "rtl" : "ltr"}
                                            slidesPerView={3.5}
                                            spaceBetween={30}
                                            freeMode={false}
                                            pagination={{
                                                clickable: true,
                                            }}
                                            modules={[FreeMode, Pagination, Navigation]}
                                            className="most-view-swiper"
                                            breakpoints={breakpoints}
                                        >
                                            {Array.from({ length: 6 }).map((_, index) => (
                                                <SwiperSlide>
                                                    <div className="loading_data">
                                                        <VerticalCardSkeleton />
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    ) : (
                                        getFeaturedListing?.map((ele, index) => (
                                            <SwiperSlide id="most-view-swiper-slider" key={index}>
                                                <Link target="_blank" href="/properties-details/[slug]" as={`/properties-details/${ele.slug_id}`} passHref>
                                                    <VerticalCard ele={ele} onImageLoad={handleImageLoaded} />
                                                </Link>
                                            </SwiperSlide>
                                        ))
                                    )}
                                </Swiper>
                            </div>
                            {/* {
                                getFeaturedListing?.slice(0, 8).map((ele, index) => (
                                    <div className="col-sm-12 col-md-6 col-lg-3" key={index}>
                                        <Link target="_blank" href="/properties-details/[slug]" as={`/properties-details/${ele.slug_id}`} passHref>
                                            <VerticalCard ele={ele} onImageLoad={handleImageLoaded} />
                                        </Link>
                                    </div>
                                ))
                            } */}
                            {/* <div id="">
                                <div>
                                    {isLoading ? (
                                        <Skeleton width="100%" height={20} />
                                    ) : (
                                        <Fragment>
                                            <div className="most_fav_header">
                                                <div className="mb-0 h3">{translate("discoverOur")} {translate("featured")} {translate("listings")}</div>
                                            </div>
                                            <div className="mobile-headline-view">
                                                <div className="text-center h3">{translate("discoverOur")} {translate("featured")} {translate("listings")}</div>
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                                <div className="feature-section-cards">
                                    <div id="feature_cards" className="row">
                                        {isLoading
                                            ? // Show skeleton loading when data is being fetched

                                            Array.from({ length: 8 }).map((_, index) => (
                                                <div className="col-sm-12 col-md-6 col-lg-3 loading_data" key={index}>
                                                    <VerticalCardSkeleton />
                                                </div>
                                            ))
                                            : )}
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </section>
                ) : (
                    null
                )}

                {getMostViewedProp && getMostViewedProp?.length > 0 ? (
                    <section id="main_properties">
                        <div className="container">
                            <div className="most_fav_header">
                                <div className="mb-0 h3">{translate("recommendedProperties")}</div>
                                <div className="position-relative d-flex justify-content-center swiper-navigation-out d-none d-md-flex">
                                    <div className="swiper-button-prev sw_prev_1" onClick={() => swiperRef1.current.slidePrev()}></div>
                                    <div className="swiper-button-next sw_next_1" onClick={() => swiperRef1.current.slideNext()}></div>
                                </div>
                            </div>
                            <div className="mobile-headline-view">
                                <div className="text-center h3">{translate("recommendedProperties")}</div>
                                <div className="position-relative d-flex justify-content-center swiper-navigation-out d-none d-md-flex">
                                    <div className="swiper-button-prev sw_prev_1" onClick={() => swiperRef1.current.slidePrev()}></div>
                                    <div className="swiper-button-next sw_next_1" onClick={() => swiperRef1.current.slideNext()}></div>
                                </div>
                            </div>
                            <div id="most-view-properties" dir={language.rtl === "1" ? "rtl" : "ltr"}>
                                

                                <Swiper
                                    onSwiper={setSwiper => swiperRef1.current = setSwiper}
                                    slidesPerView={3.5}
                                    spaceBetween={30}
                                    freeMode={false}
                                    navigation={{
                                        prevEl: '.swiper-button-prev.sw_prev_1',
                                        nextEl: '.swiper-button-next.sw_next_1'
                                    }}
                                    onInit={(swiper) => {
                                        swiperRef1.current = swiper;
                                    }}
                                    pagination={true}
                                    modules={[FreeMode, Pagination, Navigation]}
                                    className="most-view-swiper"
                                    breakpoints={breakpoints}
                                >
                                    {isLoading ? (
                                        // Show skeleton loading when data is being fetched
                                        <Swiper
                                            dir={language.rtl === "1" ? "rtl" : "ltr"}
                                            slidesPerView={3.5}
                                            spaceBetween={30}
                                            freeMode={false}
                                            pagination={{
                                                clickable: true,
                                            }}
                                            modules={[FreeMode, Pagination, Navigation]}
                                            className="most-view-swiper"
                                            breakpoints={breakpoints}
                                        >
                                            {Array.from({ length: 6 }).map((_, index) => (
                                                <SwiperSlide>
                                                    <div className="loading_data">
                                                        <VerticalCardSkeleton />
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    ) : (
                                        getMostFavProperties?.map((ele, index) => (
                                            <SwiperSlide id="most-view-swiper-slider" key={index}>
                                                <Link target="_blank" href="/properties-details/[slug]" as={`/properties-details/${ele.slug_id}`} passHref>
                                                    <VerticalCard ele={ele} />
                                                </Link>
                                            </SwiperSlide>
                                        ))
                                    )}
                                </Swiper>
                            </div>

                        </div>
                    </section>
                ) : null}


                {/* user recommendation section  */}
                {userRecommendationData && userRecommendationData?.length > 0 ? (
                    <section id="personalize_feed">
                        <div className="container">
                            <div className="personalize_feed_header">
                                <div>
                                    <h3>
                                        <span className="highlight">
                                            {" "} {translate("personalize")}
                                        </span>
                                        {" "}
                                        <span>
                                            <span >{translate("feed")}</span>
                                        </span>{" "}
                                    </h3>
                                </div>
                                <div className="rightside_personalize_feed">
                                    <Link href="/all-personalized-feeds">
                                        <button className="learn-more" id="viewall">
                                            <span aria-hidden="true" className="circle">
                                                <div className="icon_div">
                                                    <span className="icon arrow">
                                                        <BsArrowRight />
                                                    </span>
                                                </div>
                                            </span>
                                            <span className="button-text">{translate("seeAllProp")}</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="mobile-headline-view">
                                <MobileHeadline
                                    data={{
                                        start: translate("personalize"),
                                        center: translate("feed"),
                                        link: "/all-personalized-feeds",
                                    }}
                                />
                            </div>
                            <div id="personalize_feed_properties" dir={language.rtl === "1" ? "rtl" : "ltr"}>
                                <Swiper
                                    slidesPerView={3.5}
                                    spaceBetween={30}
                                    freeMode={false}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[FreeMode, Pagination]}
                                    className="personalize_feed_swiper"
                                    breakpoints={breakpoints}
                                >
                                    {isLoading ? (
                                        // Show skeleton loading when data is being fetched
                                        <Swiper
                                            dir={language.rtl === "1" ? "rtl" : "ltr"}
                                            slidesPerView={3.5}
                                            spaceBetween={30}
                                            freeMode={false}
                                            pagination={{
                                                clickable: true,
                                            }}
                                            modules={[FreeMode, Pagination]}
                                            className="personalize_feed_swiper"
                                            breakpoints={breakpoints}
                                        >
                                            {Array.from({ length: 6 }).map((_, index) => (
                                                <SwiperSlide>
                                                    <div className="loading_data">
                                                        <VerticalCardSkeleton />
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    ) : (
                                        userRecommendationData?.map((ele, index) => (
                                            <SwiperSlide id="most-view-swiper-slider" key={index}>
                                                <Link href="/properties-details/[slug]" as={`/properties-details/${ele.slug_id}`} passHref>
                                                    <UserRecommendationCard ele={ele} />
                                                </Link>
                                            </SwiperSlide>
                                        ))
                                    )}
                                </Swiper>
                            </div>

                        </div>
                    </section>
                ) : null}
                

                {/* ===== Find Your Preferances SECTION =======  */}
                {getMostFavProperties && getMostFavProperties?.length > 0 ? (
                    <section id="most_fav">
                        <div className="container">
                            <div className="most_fav_header">
                                <div className="mb-0 h3">{translate("findyourpreferences")}</div>
                                <div className="position-relative d-flex justify-content-center swiper-navigation-out d-none d-md-flex">
                                    <div className="swiper-button-prev sw_prev_2" onClick={() => swiperRef2?.current?.slidePrev()}></div>
                                    <div className="swiper-button-next sw_next_2" onClick={() => swiperRef2?.current?.slideNext()}></div>
                                </div>
                                {/* <div className="rightside_most_fav_header">
                                    <Link href="/most-favorite-properties">
                                        <button className="learn-more" id="viewall">
                                            <span aria-hidden="true" className="circle">
                                                <div className="icon_div">
                                                    <span className="icon arrow">
                                                        <BsArrowRight />
                                                    </span>
                                                </div>
                                            </span>
                                            <span className="button-text">{translate("seeAllProp")}</span>
                                        </button>
                                    </Link>
                                </div> */}
                            </div>
                            <div className="mobile-headline-view">
                                <div className="text-center h3">{translate("findyourpreferences")}</div>
                                <div className="position-relative d-flex justify-content-center swiper-navigation-out d-none d-md-flex">
                                    <div className="swiper-button-prev sw_prev_2" onClick={() => swiperRef2?.current?.slidePrev()}></div>
                                    <div className="swiper-button-next sw_next_2" onClick={() => swiperRef2?.current?.slideNext()}></div>
                                </div>
                            </div>
                            <div id="most-view-properties" dir={language.rtl === "1" ? "rtl" : "ltr"}>
                                
                                {/* Nearby City Section  */}
                                {userCurrentLocation && nearbyCityData?.length > 0 ? (
                                    <Swiper
                                    onSwiper={setSwiper => swiperRef2.current = setSwiper}
                                    slidesPerView={3.5}
                                    spaceBetween={30}
                                    freeMode={false}
                                    navigation={{
                                        prevEl: '.swiper-button-prev.sw_prev_2',
                                        nextEl: '.swiper-button-next.sw_next_2'
                                    }}
                                    onInit={(swiper) => {
                                        swiperRef2.current = swiper;
                                    }}
                                    pagination={false}
                                    modules={[FreeMode, Pagination, Navigation]}
                                    className="most-view-swiper"
                                    breakpoints={breakpoints}
                                    
                                >
                                    {isLoading ? (
                                        // Show skeleton loading when data is being fetched
                                        <Swiper
                                            dir={language.rtl === "1" ? "rtl" : "ltr"}
                                            slidesPerView={3.5}
                                            spaceBetween={30}
                                            freeMode={false}
                                            pagination={{
                                                clickable: true,
                                            }}
                                            modules={[FreeMode, Pagination, Navigation]}
                                            className="most-view-swiper"
                                            breakpoints={breakpoints}
                                        >
                                            {Array.from({ length: 6 }).map((_, index) => (
                                                <SwiperSlide>
                                                    <div className="loading_data">
                                                        <VerticalCardSkeleton />
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    ) : (
                                        nearbyCityData?.map((ele, index) => (
                                            <SwiperSlide id="most-view-swiper-slider" key={index}>
                                                <Link  target="_blank" href="/properties-details/[slug]" as={`/properties-details/${ele.slug_id}`} passHref>
                                                    <VerticalCard ele={ele} />
                                                </Link>
                                            </SwiperSlide>
                                        ))
                                    )}
                                </Swiper>
                                ):
                                <Swiper
                                    onSwiper={setSwiper => swiperRef2.current = setSwiper}
                                    slidesPerView={3.5}
                                    spaceBetween={30}
                                    freeMode={false}
                                    navigation={{
                                        prevEl: '.swiper-button-prev.sw_prev_2',
                                        nextEl: '.swiper-button-next.sw_next_2'
                                    }}
                                    onInit={(swiper) => {
                                        swiperRef2.current = swiper;
                                    }}
                                    pagination={false}
                                    modules={[FreeMode, Pagination, Navigation]}
                                    className="most-view-swiper"
                                    breakpoints={breakpoints}
                                    
                                >
                                    {isLoading ? (
                                        // Show skeleton loading when data is being fetched
                                        <Swiper
                                            dir={language.rtl === "1" ? "rtl" : "ltr"}
                                            slidesPerView={3.5}
                                            spaceBetween={30}
                                            freeMode={false}
                                            pagination={{
                                                clickable: true,
                                            }}
                                            modules={[FreeMode, Pagination, Navigation]}
                                            className="most-view-swiper"
                                            breakpoints={breakpoints}
                                        >
                                            {Array.from({ length: 6 }).map((_, index) => (
                                                <SwiperSlide>
                                                    <div className="loading_data">
                                                        <VerticalCardSkeleton />
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    ) : (
                                        getMostFavProperties?.map((ele, index) => (
                                            <SwiperSlide id="most-view-swiper-slider" key={index}>
                                                <Link  target="_blank" href="/properties-details/[slug]" as={`/properties-details/${ele.slug_id}`} passHref>
                                                    <VerticalCard ele={ele} />
                                                </Link>
                                            </SwiperSlide>
                                        ))
                                    )}
                                </Swiper>
                                }
                            </div>

                        </div>
                    </section>
                ) : null}
            
               {/* ===== BEST PLACES ON EACH CITY =======  */}                                 
                {
                    !isLoading &&
                    <section id="best_place">
                        <div className="container">
                            <div className="most_fav_header">
                                <p className="mb-0 h3">{translate("bestPlacesOnEachCity")}</p>
                            </div>

                            <div className="mobile-headline-view">
                                <p className="text-center h3">{translate("bestPlacesOnEachCity")}</p>
                            </div>
                        
                            <div className="citys_grid">
                                {
                                    citys.map((item, idx) => (
                                        <Link href={item.url} key={idx}>
                                            <figure>
                                                <Image 
                                                    loading="lazy"
                                                    src={item.image}
                                                    alt={`best place in ${item.name} city`}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            </figure>
                                            <figcaption>{item.name}</figcaption>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </section>
                }

                {/* ===== OUR SERVICES SECTION SECTION =======  */}
                {
                    !isLoading &&
                    <OurServices/>
                }

            </div>
            
            {
                showModal &&
                <LoginModal isOpen={showModal} onClose={handleCloseModal} />
            }
        </Layout >
    );
};

export default HomePage;
