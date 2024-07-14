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
import verifiedBadge from "@/assets/verified_badge.png";

import { useRouter } from "next/router";

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

function MapCard({ ele, removeCard, onImageLoad }) {


	const router = useRouter()
	const lang = useSelector(languageData);
	useEffect(() => { }, [lang]);
	const language = store.getState().Language.languages;


	const priceSymbol = useSelector(settingsData);
	const CurrencySymbol = priceSymbol && priceSymbol.currency_symbol;

	const swiperRefNavg = useRef(null);

	// useEffect(() => {
	//   const handleClick = (event) => {
	//     event.preventDefault()
	//   };

	//   // Access the DOM element through the ref
	//   const element = swiperRefNavg.current;
	//   element.addEventListener('click', handleClick);

	//   // Clean up the event listener
	//   return () => {
	//     element.removeEventListener('click', handleClick);
	//   };
	// }, []);

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
				showCancelButton: true,
				allowOutsideClick: true,
				customClass: {
					confirmButton: 'Swal-confirm-buttons',
					cancelButton: "Swal-cancel-buttons"
				},
				confirmButtonText: "Ok",
			}).then((result) => {
				if (result.isConfirmed) {
					router.push('/login')
				}
			});
		}
	};

	const handleDislike = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (isLoggedIn && isLoggedIn.data && isLoggedIn.data.token) {
			AddFavourite(
				ele?.id,
				"0",
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
				showCancelButton: true,
				allowOutsideClick: true,
				customClass: {
					confirmButton: 'Swal-confirm-buttons',
					cancelButton: "Swal-cancel-buttons"
				},
				confirmButtonText: "Ok",
			}).then((result) => {
				if (result.isConfirmed) {
					router.push('/login')
				}
			});
		}
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
		<div className="overflow-hidden flex rounded-xl bg-white">
			<div className="relative w-60 h-60">
				<div className="verticle_card_img_div h-full">
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
						className="properity-card-gallery h-60"
					>
						{ele?.gallery ? (
							// Show skeleton loading when data is being fetched
							<Swiper
								dir={language.rtl === "1" ? "rtl" : "ltr"}
								slidesPerView={1}
								spaceBetween={1}
								freeMode={false}
								modules={[FreeMode, Pagination]}
								className="properity-card-gallery "
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
							<Image loading="lazy" className="absolute top-0 h-full w-full object-cover" id="verticle_card_img" src={ele?.title_image} alt="no_img" width={200} height={200} onLoad={handleImageLoad} onError={placeholderImage} />
						)}
					</Swiper>
				</div>

				<div className="absolute top-2 end-2 z-10">
					{ele?.promoted ? <span className="feature_tag">{translate("feature")}</span> : null}
					<span className="like_tag">
						{isLiked ? (
							<AiFillHeart size={25} className="liked-property" onClick={handleDislike} />
						) : isDisliked ? (
							<AiOutlineHeart size={25} className="disliked-property" onClick={handleLike} />
						) : (
							<AiOutlineHeart size={25} onClick={handleLike} />
						)}
					</span>
					{
						ele?.added_by === 0 &&
						<span className="verified_badge">
							By Arkaf
							<Image src={verifiedBadge} alt="verified Badge" width={24} height={24} />
						</span>
					}
				</div>
			</div>
			<div className="p-3 w-80">
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<span className="border rounded-full py-2 px-3"> {ele?.category && ele?.category.category} </span>
						<span>24 January 2024</span>
						{/* <TimeComponent timeAgo={ele?.post_created} /> */}
					</div>
					<span className="text-xl font-medium">
						{formatPriceAbbreviated(ele?.price)} {CurrencySymbol}
					</span>
					<p className="text-base">
						{ele?.city} {ele?.city ? "," : null} {ele?.state} {ele?.state ? "," : null} {ele?.country}
					</p>
				</div>


				{/*  */}
				<div className="d-flex gap-2 flex-wrap">
						{ele?.parameters &&
							ele?.parameters.slice(0, 4).map((elem, index) => (
								elem?.value !== "" && elem?.value !== "0" &&
								<div className="border px-3 py-2 rounded-full" key={index}>
									<div className="flex items-center gap-1">
										{themeEnabled ? (

											<ImageToSvg imageUrl={elem?.image} className="" />
										) : (
											<Image loading="lazy" src={elem?.image} alt="no_img" width={20} height={16} onError={placeholderImage} />
										)}
										<p className="text-sm">
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
				{/*  */}
			</div>
		</div >
	);
}

export default MapCard;
