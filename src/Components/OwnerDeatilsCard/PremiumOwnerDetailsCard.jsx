import { placeholderImage, translate } from '@/utils'
import Image from 'next/image'
import React, { Fragment, useState } from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { FiMail, FiMessageSquare, FiPhoneCall, FiThumbsUp } from 'react-icons/fi'
import { MdReport } from 'react-icons/md'
import { RiMailSendLine, RiThumbUpFill } from 'react-icons/ri'
import { FaArrowRight } from "react-icons/fa6";
import { useRouter } from 'next/router'
import { AddFavourite } from "@/store/actions/campaign";
import Swal from 'sweetalert2';
import { formatNumberWithCommas } from "@/utils";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Link from 'next/link'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

import {
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    FacebookMessengerShareButton,
    EmailShareButton,

    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
  } from 'next-share'
import { EmailIcon, LinkedinIcon } from 'react-share'

const PremiumOwnerDetailsCard = (
    {
        getPropData,
        CurrencySymbol,
        showChat,
        interested,
        isReported,
        handleInterested,
        handleNotInterested,
        isMessagingSupported,
        notificationPermissionGranted,
        handleChat,
        userCurrentId,
        handleReportProperty,
    }) => {


    // Initialize isDisliked as false
    const [isDisliked, setIsDisliked] = useState(false);
    const [isLiked, setIsLiked] = useState(getPropData && getPropData.is_favourite);
    const [openModal, setOpenModal] = useState(false)
    const router = useRouter();
    const { asPath } = router;
    const fullPath = `${process.env.NEXT_PUBLIC_WEB_URL}${asPath}`;

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleLike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (userCurrentId) {
            AddFavourite(
                getPropData.id,
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
            getPropData.id,
            "0",
            (response) => {
                setIsLiked(false);
                setIsDisliked(true);
                toast.success(response.message);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    // console.log('getPropData.mobile', getPropData.mobile);

    const mobile = getPropData.mobile.replace(/\s+/g, '');
    return (
        <Fragment>
            <div className="sticky-card-price">
                <div className="card p-4 d-flex flex-column rounded-4">
                    <span className="d-block mb-3 text-muted fs-5">{translate("price")}</span>
                    <span className="h2">
                            {formatNumberWithCommas(getPropData && getPropData.price)} {CurrencySymbol}
                    </span>
                    <hr className="mb-4" />
                    <Link href="/user/chat" className="enquiry-buttons button button-solid py-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M10 3H14C18.4183 3 22 6.58172 22 11C22 15.4183 18.4183 19 14 19V22.5C9 20.5 2 17.5 2 11C2 6.58172 5.58172 3 10 3ZM12 17H14C17.3137 17 20 14.3137 20 11C20 7.68629 17.3137 5 14 5H10C6.68629 5 4 7.68629 4 11C4 14.61 6.46208 16.9656 12 19.4798V17Z" fill="white"/>
                        </svg>
                        {translate("chat")}
                    </Link>
                    <br />
                    <Link target='_blank' href={`https://wa.me/${mobile}`} className="enquiry-buttons button button-outline button-whatsapp py-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 25 24">
                            <path d="M7.75361 18.4944L8.47834 18.917C9.68909 19.623 11.0651 20 12.501 20C16.9193 20 20.501 16.4183 20.501 12C20.501 7.58172 16.9193 4 12.501 4C8.0827 4 4.50098 7.58172 4.50098 12C4.50098 13.4363 4.87821 14.8128 5.58466 16.0238L6.00704 16.7478L5.35355 19.1494L7.75361 18.4944ZM2.50516 22L3.85712 17.0315C2.99494 15.5536 2.50098 13.8345 2.50098 12C2.50098 6.47715 6.97813 2 12.501 2C18.0238 2 22.501 6.47715 22.501 12C22.501 17.5228 18.0238 22 12.501 22C10.6671 22 8.94851 21.5064 7.47086 20.6447L2.50516 22ZM8.89232 7.30833C9.0262 7.29892 9.16053 7.29748 9.29459 7.30402C9.34875 7.30758 9.40265 7.31384 9.45659 7.32007C9.61585 7.33846 9.79098 7.43545 9.84986 7.56894C10.1482 8.24536 10.4376 8.92565 10.7182 9.60963C10.7801 9.76062 10.7428 9.95633 10.625 10.1457C10.5652 10.2428 10.4713 10.379 10.3625 10.5183C10.2494 10.663 10.006 10.9291 10.006 10.9291C10.006 10.9291 9.90738 11.0473 9.94455 11.1944C9.95903 11.25 10.0052 11.331 10.0471 11.3991C10.0703 11.4368 10.0918 11.4705 10.1058 11.4938C10.3617 11.9211 10.7057 12.3543 11.1259 12.7616C11.2463 12.8783 11.3631 12.9974 11.4887 13.108C11.957 13.5209 12.4868 13.8583 13.059 14.1082L13.0641 14.1105C13.1486 14.1469 13.192 14.1668 13.3157 14.2193C13.3781 14.2457 13.4419 14.2685 13.5074 14.2858C13.5311 14.292 13.5554 14.2955 13.5798 14.2972C13.7415 14.3069 13.835 14.2032 13.8749 14.1555C14.5984 13.279 14.6646 13.2218 14.6696 13.2222V13.2238C14.7647 13.1236 14.9142 13.0888 15.0476 13.097C15.1085 13.1007 15.1691 13.1124 15.2245 13.1377C15.7563 13.3803 16.6258 13.7587 16.6258 13.7587L17.2073 14.0201C17.3047 14.0671 17.3936 14.1778 17.3979 14.2854C17.4005 14.3523 17.4077 14.4603 17.3838 14.6579C17.3525 14.9166 17.2738 15.2281 17.1956 15.3913C17.1406 15.5058 17.0694 15.6074 16.9866 15.6934C16.8743 15.81 16.7909 15.8808 16.6559 15.9814C16.5737 16.0426 16.5311 16.0714 16.5311 16.0714C16.3922 16.159 16.3139 16.2028 16.1484 16.2909C15.891 16.428 15.6066 16.5068 15.3153 16.5218C15.1296 16.5313 14.9444 16.5447 14.7589 16.5347C14.7507 16.5342 14.1907 16.4482 14.1907 16.4482C12.7688 16.0742 11.4538 15.3736 10.3503 14.402C10.1247 14.2034 9.9155 13.9885 9.70194 13.7759C8.81288 12.8908 8.13982 11.9364 7.73169 11.0336C7.53043 10.5884 7.40299 10.1116 7.40098 9.62098C7.39729 9.01405 7.59599 8.4232 7.96569 7.94186C8.03857 7.84697 8.10774 7.74855 8.22709 7.63586C8.35348 7.51651 8.43392 7.45244 8.52057 7.40811C8.63607 7.34902 8.76293 7.31742 8.89232 7.30833Z" fill="currentColor"/>
                        </svg>
                        {translate("whatsapp")}
                    </Link>
                </div>
                <div className="d-flex gap-3 mt-3">
                    {isLiked ? (
                        <button onClick={handleDislike} className='button button-solid d-flex justify-content-center gap-1 w-50'>
                            {translate("save")}
                            <AiFillHeart size={21} className="liked_property text-white" />
                        </button>
                    ) : isDisliked ? (
                        <button onClick={handleLike} className='button button-outline d-flex justify-content-center gap-1 w-50'>
                            {translate("save")}
                            <AiOutlineHeart size={21} className="disliked_property" />
                        </button>
                    ) : (
                        <button onClick={handleLike} className='button button-outline d-flex justify-content-center gap-1 w-50'>
                            {translate("save")}
                            <AiOutlineHeart size={21} className='' />
                        </button>
                    )}
                    <button onClick={() => setOpenModal(true)} className="button button-outline d-flex justify-content-center gap-1 w-50">
                        {translate("share")}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '20px'}}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                    </button>
                </div>
            </div>
            <Dialog open={openModal} onClose={setOpenModal} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-4 sm:p-6 sm:pb-4">
                            <div className="">
                                <h1 className="font-medium text-xl">{translate('share')}</h1>
                                <p className="">{translate('Lorem Ipsum is simply dummy text of the printing and typesetting industry')}</p>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    <FacebookShareButton
                                        url={fullPath}
                                        quote={'sss'}
                                        hashtag={'#arkaf #property'}
                                        >
                                        <FacebookIcon size={40} borderRadius={'9px'} />
                                    </FacebookShareButton>
                                    <TwitterShareButton
                                        url={fullPath}
                                        title={getPropData.title}
                                        hashtag={'#arkaf #property'}
                                        >
                                        <TwitterIcon size={40} borderRadius={'9px'} />
                                    </TwitterShareButton>
                                    <LinkedinShareButton
                                        url={fullPath}
                                        quote={'sss'}
                                        hashtag={'#arkaf #property'}
                                        >
                                        <LinkedinIcon size={40} borderRadius={'9px'} />
                                    </LinkedinShareButton>
                                    <WhatsappShareButton
                                        url={fullPath}
                                        title={getPropData.title}
                                        separator=":: "
                                        blankTarget
                                        >
                                        <WhatsappIcon size={40} borderRadius={'9px'} />
                                    </WhatsappShareButton>
                                    <EmailShareButton
                                        url={fullPath}
                                        subject={`Checkout this properity ${getPropData.title}`}
                                        body=""
                                        >
                                        <EmailIcon size={40} borderRadius={'9px'} />
                                    </EmailShareButton>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => setOpenModal(false)}
                                className="tw-btn-outline bg-white hover:!bg-[#34484F] w-32 text-sm"
                            >
                                {translate('close')}
                            </button>
                        </div>
                    </DialogPanel>
                    </div>
                </div>
                </Dialog>
        </Fragment>
        
        // <>
        //     <div className="card" id="owner-deatils-card">
        //         <div className="card-header" id="card-owner-header">
        //             <div>
        //                 <Image loading="lazy" width={200} height={200} src={getPropData && getPropData.profile} onError={placeholderImage} className="owner-img" alt="no_img" />
        //             </div>
        //             <div className="owner-deatils">
        //                 <span className="owner-name"> {getPropData && getPropData.customer_name}</span>
        //                 {getPropData && getPropData.email &&
        //                     <span className="owner-add" onClick={handleCheckPremium}>
        //                         {" "}
        //                         <RiMailSendLine size={15} />
        //                         {getPropData && `${getPropData.email.slice(0, 2)}${'*'.repeat(getPropData.email.length - 2)}`}
        //                     </span>
        //                 }
        //             </div>
        //         </div>
        //         <div className="card-body">
        //             {/* <a href={`tel:${getPropData && getPropData.mobile}`}> */}
        //             <div className="owner-contact">
        //                 <div>
        //                     <FiPhoneCall id="call-o" size={60} />
        //                 </div>
        //                 <div className="deatilss">
        //                     <span className="o-d"> {translate("call")}</span>
        //                     <span className="value" onClick={handleCheckPremium}>
        //                         {getPropData && `${getPropData.mobile.slice(0, 4)}${'*'.repeat(getPropData.mobile.length - 4)}`}
        //                     </span>
        //                 </div>
        //             </div>
        //             {/* </a> */}
        //             <div className="owner-contact">
        //                 <div>
        //                     <CiLocationOn id="mail-o" size={60} />
        //                 </div>
        //                 <div className="deatilss">
        //                     <span className="o-d"> {translate("location")}</span>
        //                     <span className='value' onClick={handleCheckPremium}>
        //                         {getPropData && `${getPropData.client_address.slice(0, 2)}***********`}
        //                     </span>
        //                 </div>
        //             </div>
        //             {showChat && isMessagingSupported && notificationPermissionGranted && (
        //                 <div className='owner-contact' onClick={handleCheckPremium}>
        //                     <div>
        //                         <FiMessageSquare id='chat-o' size={60} />
        //                     </div>
        //                     <div className='details'>
        //                         <span className='o-d'> {translate("chat")}</span>
        //                         <p className='value'> {translate("startAChat")}</p>
        //                     </div>
        //                 </div>
        //             )}
        //             <div className="enquiry">
        //                 {!isReported && userCurrentId !== getPropData?.added_by ? (
        //                     <button className='enquiry-buttons' onClick={handleReportProperty}> <MdReport className='mx-1' size={20} />{translate("reportProp")}</button>
        //                 ) : null}

        //                 {interested || getPropData?.is_interested === 1 ? (
        //                     <button className="enquiry-buttons" onClick={handleNotInterested}>
        //                         <RiThumbUpFill className="mx-1" size={20} />
        //                         {translate("intrested")}
        //                     </button>
        //                 ) : (
        //                     <button className="enquiry-buttons" onClick={handleInterested}>
        //                         <FiThumbsUp className="mx-1" size={20} />
        //                         {translate("intrest")}
        //                     </button>
        //                 )}
        //             </div>

        //             <div className="is_premium_user">
        //                 <span>{translate("SubscribetoAccess")}</span>
        //                 <button onClick={handleNavigateSubScribe}>
        //                     <span>{translate("subscribeNow")}</span>
        //                     <span>
        //                         <FaArrowRight size={20} />
        //                     </span>
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </>
    )
}

export default PremiumOwnerDetailsCard
