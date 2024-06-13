import { AddFavourite } from "@/store/actions/campaign";
import { settingsData } from "@/store/reducer/settingsSlice";
import { store } from "@/store/store";
import { formatPriceAbbreviated, isThemeEnabled, placeholderImage, translate } from "@/utils";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import Image from "next/image";
import { ImageToSvg } from "./ImageToSvg";
import Swal from "sweetalert2";
import LoginModal from "../LoginModal/LoginModal";
import verifiedBadge from "@/assets/verified_badge.png";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import "swiper/css";
import { FreeMode, Pagination, Navigation } from "swiper/modules";

import { languageData } from "@/store/reducer/languageSlice";
import TimeComponent from "./TimeComponent";

function VerticalCard({ ele, removeCard, onImageLoad }) {

    const lang = useSelector(languageData);
    useEffect(() => { }, [lang]);
    const language = store.getState().Language.languages;


    const priceSymbol = useSelector(settingsData);
    const CurrencySymbol = priceSymbol && priceSymbol.currency_symbol;

    const swiperRefNavg = useRef(null);

    useEffect(() => {
      const handleClick = (event) => {
        event.preventDefault()
      };
  
      // Access the DOM element through the ref
      const element = swiperRefNavg.current;
      element.addEventListener('click', handleClick);
  
      // Clean up the event listener
      return () => {
        element.removeEventListener('click', handleClick);
      };
    }, []);

    const isLoggedIn = useSelector((state) => state.User_signup);

    const handleImageLoad = () => {
        if (onImageLoad) {
            onImageLoad();
        }
    };
    // Initialize isLiked based on ele?.is_favourite
    const [isLiked, setIsLiked] = useState(ele?.is_favourite === 1);

    // Initialize isDisliked as false
    const [isDisliked, setIsDisliked] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleLike = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (isLoggedIn && isLoggedIn.data && isLoggedIn.data.token) {
            AddFavourite(
                ele?.id,
                "1",
                (response) => {
                    setIsLiked(true);
                    setIsDisliked(false);
                    toast.success(response.message);
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            Swal.fire({
                title: translate("plzLogFirst"),
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

    const handleDislike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        AddFavourite(
            ele?.id,
            "0",
            (response) => {
                setIsLiked(false);
                setIsDisliked(true);
                toast.success(response.message);
                if (removeCard) {
                    setIsLiked(true);

                    removeCard(ele?.id);
                }
            },
            (error) => {
                console.log(error);
            }
        );
    };

    useEffect(() => {
        // Update the state based on ele?.is_favourite when the component mounts
        setIsLiked(ele?.is_favourite === 1);
        setIsDisliked(false);
    }, [ele?.is_favourite]);

    const DummyImgData = useSelector(settingsData);
    const PlaceHolderImg = DummyImgData?.web_placeholder_logo;
    const themeEnabled = isThemeEnabled();

    return (
        <div className="verticle_card">
            <div className="card verticle_main_card">
                <div className="verticle_card_img_div">
                <Swiper
                    ref={swiperRefNavg}
                    slidesPerView={1}
                    spaceBetween={0}
                    freeMode={false}
                    allowTouchMove={false}
                    simulateTouch={false}
                    touchMoveStopPropagation={false}
                    pagination={{
                        clickable: false,
                    }}
                    navigation={true}
                    modules={[FreeMode, Pagination, Navigation]}
                    className="properity-card-gallery"
                >
                    {ele?.gallery ? (
                        // Show skeleton loading when data is being fetched
                        <Swiper
                            dir={language.rtl === "1" ? "rtl" : "ltr"}
                            slidesPerView={1}
                            spaceBetween={1}
                            freeMode={false}
                            modules={[FreeMode, Pagination]}
                            className="properity-card-gallery"
                        >
                            <SwiperSlide>
                                <div className="loading_data">
                                    <Image loading="lazy" className="properity-card-gallery-image" src={ele?.title_image} alt="no_img" width={200} height={200} onLoad={handleImageLoad} onError={placeholderImage} />
                                </div>
                            </SwiperSlide>
                            {ele?.gallery.slice(0, 4).map((img, index) => (
                                <SwiperSlide key={index}>
                                    <div className="loading_data">
                                        <Image loading="lazy" className="properity-card-gallery-image" src={img?.image_url ? img?.image_url : PlaceHolderImg} alt="no_img" width={200} height={200} onLoad={handleImageLoad} onError={placeholderImage} />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                      <Image loading="lazy" className="card-img" id="verticle_card_img" src={ele?.title_image} alt="no_img" width={200} height={200} onLoad={handleImageLoad} onError={placeholderImage} />
                    )}
                </Swiper>
                    
                </div>
                <div className="card-img-overlay">
                    {ele?.promoted ? <span className="feature_tag">{translate("feature")}</span> : null}

                    <span className="like_tag">
                        {isLiked ? (
                            <AiFillHeart size={25} className="liked_property" onClick={handleDislike} />
                        ) : isDisliked ? (
                            <AiOutlineHeart size={25} className="disliked_property" onClick={handleLike} />
                        ) : (
                            <AiOutlineHeart size={25} onClick={handleLike} />
                        )}
                    </span>
                    {
                        ele?.added_by === 0 &&
                        <span className="verified_badge">
                            By Arkaf
                            <Image src={verifiedBadge} alt="verified Badge" width={24} height={24}  />
                        </span>
                    }
                </div>


                <div className="card-body">
                    {/* <span className="sell_teg">{ele?.property_type}</span> */}
                    
                    <div className="feature_card_mainbody">
                        {/* <div className="cate_image">
                            {themeEnabled ? (

                                <ImageToSvg imageUrl={ele?.category && ele?.category.image} className="custom-svg" />
                            ) : (
                                <Image loading="lazy" src={ele?.category && ele?.category.image} alt="no_img" width={20} height={20} onError={placeholderImage} />
                            )}

                        </div> */}
                        <span className="feature_body_title"> {ele?.category && ele?.category.category} </span>
                        <TimeComponent timeAgo={ele?.post_created} />
                    </div>

                    <div className="feature_card_middletext">
                        {/* <span>{ele?.title}</span> */}
                        <span className="price_teg">
                             {formatPriceAbbreviated(ele?.price)} {CurrencySymbol}
                        </span>
                        <p className="address_teg">
                            {ele?.city} {ele?.city ? "," : null} {ele?.state} {ele?.state ? "," : null} {ele?.country}
                        </p>
                    </div>
                </div>

                <div className="card-footer" id="feature_card_footer">
                    <div className="">

                        <div className="d-flex gap-2 flex-wrap">
                            {ele?.parameters &&
                                ele?.parameters.slice(0, 4).map((elem, index) => (
                                    elem?.value !== "" && elem?.value !== "0" &&
                                    <div className="footer_content" key={index}>
                                        <div className="footer_img_value">
                                            {themeEnabled ? (

                                                <ImageToSvg imageUrl={elem?.image} className="custom-svg" />
                                            ) : (
                                                <Image loading="lazy" src={elem?.image} alt="no_img" width={20} height={16} onError={placeholderImage} />
                                            )}
                                            <p className="text_footer">
                                                {Array.isArray(elem?.value) ? elem.value.slice(0, 2).join(', ') : elem.value}
                                                {
                                                    elem?.name !== 'Size' &&
                                                    <span> {elem?.name}</span>
                                                }
                                            </p>
                                        </div>
                                        
                                    </div>

                            ))}
                        </div>
                        
                        <div className="card_footer_button mt-3">
                            <button onClick={(event) => event.preventDefault()} className="button button-outline">{translate('contactAgent')}</button>
                            <button onClick={(event) => event.preventDefault()} className="button button-outline">{translate('whatsapp')}</button>
                        </div>
                    </div>
                </div>
            </div>
            {
                showModal &&
                <LoginModal isOpen={showModal} onClose={handleCloseModal} />
            }
        </div >
    );
}

export default VerticalCard;
