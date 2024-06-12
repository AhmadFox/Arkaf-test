import React, { useState } from "react";
import arkafLogo from "@/assets/Logo_Color.png";
import { FiMail, FiPhone } from "react-icons/fi";
import { AiFillTwitterCircle, AiOutlineInstagram, AiOutlineLinkedin } from "react-icons/ai";
import { CiFacebook } from "react-icons/ci";
import { ImPinterest2 } from "react-icons/im";
import playstore from "../../assets/playStore.png";
import appstore from "../../assets/appStore.png";

import Link from "next/link";
import { useSelector } from "react-redux";
import { settingsData } from "@/store/reducer/settingsSlice";
import { placeholderImage, translate } from "@/utils";

import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    const systemData = useSelector(settingsData);
    const webdata = systemData && systemData;
    const currentYear = new Date().getFullYear();
    const settingData = useSelector(settingsData);

    const [email, setEmail] = useState();
    const handleSubmit = (event) => {
        event.preventDefault();
        // You can integrate with your backend or a service like Mailchimp here
        alert(`Subscription request sent for: ${email}`);
        setEmail(''); // Clear the input after submission
      };

    return (
        <section id="footer">
            <div className="container">

                {/* <div className="news-letter">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <p className="title">{translate("startYourJourney")} <br className="d-none d-md-block" /> {translate("andJoin")}</p>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 col-2xl-3 offset-lg-2 offset-2xl-3">
                            <form action="">
                                <div className="input-field">
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                        <path d="M1.50002 0.5H16.5C16.9603 0.5 17.3334 0.8731 17.3334 1.33333V14.6667C17.3334 15.1269 16.9603 15.5 16.5 15.5H1.50002C1.03979 15.5 0.666687 15.1269 0.666687 14.6667V1.33333C0.666687 0.8731 1.03979 0.5 1.50002 0.5ZM15.6667 4.0316L9.05985 9.94833L2.33335 4.01328V13.8333H15.6667V4.0316ZM2.75957 2.16667L9.0516 7.71833L15.2509 2.16667H2.75957Z" fill="#818898"/>
                                    </svg>

                                    <input placeholder={translate("enterYourEmail")} type="email"/>
                                </div>
                                <button className="button button-solid">{translate("send")}</button>
                            </form>
                        </div>
                    </div>
                </div> */}

                <div className="footer-widgets" id="footer_deatils">

                    <div className="widget-item" id="widget_logo">
                            <div id="footer_logo_section">
                                {webdata?.web_footer_logo &&
                                    <Link href="/">
                                        <Image
                                            loading="lazy"
                                            src={settingData?.web_logo ? settingData?.web_logo : arkafLogo}
                                            alt="eBroker_logo"
                                            width={350}
                                            height={157}
                                            className="footer_logo"
                                            onError={placeholderImage}
                                        />
                                    </Link>
                                }
                                {webdata && webdata.company_name &&
                                    <div className="download_app_desc">
                                        <span>{translate("Getthelatest")} {webdata?.company_name} {translate("Selectyourdevice")}</span>
                                    </div>
                                }
                                {/* {webdata && webdata.company_email &&
                                    <div className="footer_contact_us">
                                        <div>
                                            <FiMail size={25} />
                                        </div>
                                        <div className="footer_contactus_deatils">
                                            <span className="footer_span">{translate("email")}</span>
                                            <a href={`mailto:${webdata && webdata.company_email}`}>
                                                <span className="footer_span_value">{webdata && webdata.company_email}</span>
                                            </a>
                                        </div>
                                    </div>
                                }
                                {webdata && webdata.company_tel1 &&
                                    <div className="footer_contact_us">
                                        <div>
                                            <FiPhone size={25} />
                                        </div>
                                        <div className="footer_contactus_deatils">
                                            <span className="footer_span">{translate("contactOne")}</span>
                                            <a href={`tel:${webdata && webdata.company_tel1}`}>
                                                <span className="footer_span_value">{webdata && webdata.company_tel1}</span>
                                            </a>
                                        </div>
                                    </div>
                                }
                                {webdata && webdata.company_tel2 &&
                                    <div className="footer_contact_us">
                                        <div>
                                            <FiPhone size={25} />
                                        </div>
                                        <div className="footer_contactus_deatils">
                                            <span className="footer_span">{translate("contactTwo")}</span>
                                            <a href={`tel:${webdata && webdata.company_tel2}`}>
                                                <span className="footer_span_value">{webdata && webdata.company_tel2}</span>
                                            </a>
                                        </div>
                                    </div>
                                } */}
                                
                            </div>
                    </div>

                    <div className="widget-item">
                        <div id="footer_prop_section">
                            <div id="footer_headlines">
                                <span>{translate("about")}</span>
                            </div>
                            <div className="prop_links">
                                <Link href="/about-us">{translate("aboutUs")}</Link>
                            </div>
                            <div className="prop_links">
                                <Link href="/how-it-works">{translate("howItWorks")}</Link>
                            </div>
                            <div className="prop_links">
                                <Link href="/terms-of-use">{translate("termsOfUse")}</Link>
                            </div>

                            <div className="prop_links">
                                <Link href="/help">{translate("help")}</Link>
                            </div>
                        </div>
                    </div>

                    <div className="widget-item">
                        <div id="footer_page_section">
                            <div id="footer_headlines">
                                <span>{translate("services")}</span>
                            </div>
                            <div className="page_links">
                                <Link href="/professional-photography">{translate("professionalPhotography")}</Link>
                            </div>
                            <div className="page_links">
                                <Link href="/virtual-tour">{translate("virtualTour")}</Link>
                            </div>
                            <div className="page_links">
                                <Link href="/property-management">{translate("propertyManagement")}</Link>
                            </div>
                        </div>
                    </div>

                    <div className="widget-item">
                        <div id="footer_contact_section">
                            <div id="footer_headlines">
                                <span>{translate("contact")}</span>
                            </div>
                            <div className="page_links">
                                <Link href="/care">{translate("arkafCare")}</Link>
                            </div>
                            {webdata && webdata.company_tel1 &&
                                <div className="page_links">
                                    <Link href={`tel:${webdata && webdata.company_tel1}`}>
                                        <span className="footer_span_value">{webdata && webdata.company_tel1}</span>
                                    </Link>
                                </div>
                            }
                            {webdata && webdata.company_tel2 &&
                                <div className="page_links">
                                    <Link href={`tel:${webdata && webdata.company_tel2}`}>
                                        <span className="footer_span_value">{webdata && webdata.company_tel2}</span>
                                    </Link>
                                </div>
                            }
                            
                        </div>
                    </div>
                    
                    {/* <div className="col-12 col-md-6 col-lg-3">
                        <div id="footer_download_section">
                            <div id="footer_headlines">
                                <span>{translate("downloadApps")}</span>
                            </div>
                            

                            <div className="download_app_platforms">
                                {webdata?.playstore_id ? (
                                    <div id="playstore_logo">
                                        <a href={webdata?.playstore_id} target="_blank">
                                            <Image loading="lazy" src={playstore?.src} alt="no_img" className="platforms_imgs" width={0} height={0} style={{ width: "100%", height: "100%" }} onError={placeholderImage} />
                                        </a>
                                    </div>
                                ) : null}
                                {webdata?.appstore_id ? (
                                    <div id="appstore_logo">
                                        <a href={webdata?.appstore_id} target="_blank">
                                            <Image loading="lazy" src={appstore?.src} alt="no_img" className="platforms_imgs" width={0} height={0} style={{ width: "100%", height: "100%" }}  onError={placeholderImage}/>
                                        </a>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="rights_footer">
                    <p className="mb-0 order-2 order-md-1">{translate("copyright")} {currentYear} {webdata?.company_name}</p>
                    {webdata?.facebook_id || webdata?.instagram_id || webdata?.pintrest_id || webdata?.twitter_id ? (
                        <div id="follow_us" className="order-1 order-md-2">
                        {webdata?.facebook_id ? (
                            <Link href={webdata?.facebook_id} target="_blank" aria-label="facebook page">
                                <CiFacebook size={28} />
                                <span className="hidden-text-seo">facebook page</span>
                            </Link>
                        ) : null}
                        {webdata?.instagram_id ? (
                            <Link href={webdata?.instagram_id} target="_blank" aria-label="instagram page">
                                <AiOutlineInstagram size={28} />
                                <span className="hidden-text-seo">instagram profile</span>
                            </Link>
                        ) : null}
                        {webdata?.pintrest_id ? (
                            <Link href={webdata?.pintrest_id} target="_blank" aria-label="pintrest page">
                                <ImPinterest2 size={25} />
                                <span className="hidden-text-seo">pintrest page</span>
                            </Link>
                        ) : null}
                        {webdata?.twitter_id ? (
                            <Link href={webdata?.twitter_id} target="_blank"  aria-label="twitter page">
                                <FaXTwitter size={25}/>
                                <span className="hidden-text-seo">twitter page</span>
                            </Link>
                        ) : null}
                    </div>
                    ) : (null)}
                </div>
            </div>
        </section>
    );
};

export default Footer;
