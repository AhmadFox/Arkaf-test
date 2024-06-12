import React, { Fragment, Suspense } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import Link from "next/link";

import { useSelector } from "react-redux";
import { settingsData } from "@/store/reducer/settingsSlice";

import { translate } from "@/utils"
import Loader from "../Loader/Loader";

import RegesterSwiper from "../RegesterSwiper/RegesterSwiper";
import arkafLogo from "@/assets/Logo_Color.png";
import SuccessBanner from "@/assets/successful_Create_banner.png";

const AuthLayout = ({ children }) => {

	const router = useRouter();
	const settingData = useSelector(settingsData);
	const LanguageList = settingData && settingData.languages;
	const systemDefaultLanguageCode = settingData?.default_language;
	const currentYear = new Date().getFullYear();

    return (
        <Fragment>
            <Suspense fallback={<Loader />}>
				<div className={`grid  h-full
					${router.pathname === '/login' || router.pathname === '/register' ? 'lg:grid-cols-2' : ''}
				`}>
					<div className={`h-full flex flex-col justify-between w-full mx-auto py-10 px-9 xl:px-0
						${router.pathname === '/login' || router.pathname === '/register' ? 'max-w-[522px]' : 'container'}
					`}>
						<div className="flex flex-col md:flex-row gap-12 items-center justify-between">
							<Link className="navbar-brand" href="/">
								<Image loading="lazy" src={settingData?.web_logo ? settingData?.web_logo : arkafLogo} alt="Arkaf Brand Logo" width={350} height={157} className="w-32 h-auto"/>
							</Link>
							
							{
								router.pathname === '/verify-account' || router.pathname === '/success-create-account' ?
								<div className="grid grid-cols-3 gap-2 mb-12">
									<div className="flex items-center justify-center gap-2">
										<span className="w-full text-center rounded-full px-6 py-2 bg-[#34484F] text-white">{translate('email')}</span>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="size-4">
											<path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
										</svg>
									</div>
									<div className="flex items-center justify-center gap-2">
										<span className="w-full text-center rounded-full px-6 py-2 border-2 border-[#34484F] text-[#34484F]">{translate('verify')}</span>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="size-4 opacity-50">
											<path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
										</svg>
									</div>
									<div className="flex items-center justify-center gap-2 opacity-80">
										<span className="w-full text-center rounded-full px-6 border border-[#DFE1E7] py-2 text-[#818898]">{translate('complete')}</span>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="size-4 opacity-0">
											<path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
										</svg>
									</div>
								</div>: null
							}
						</div>
						<div>
							{
								router.pathname === '/login' || router.pathname === '/register' ?
								<div className="mb-8">
									<h1 className='text-4xl font-medium mb-2 text-[#272835]'>{translate('loginTitle')}</h1>
									<p className=''>{translate('loginSubTitle')}</p>
								</div>:
								router.pathname === '/verify-account' ?
								<div className="mb-8 text-center">
									<h1 className='text-4xl font-medium mb-2 text-[#272835]'>{translate('verifyYourAccount')}</h1>
									<p className='text-sm'>{translate('otpCodeHints')}</p>
								</div>: 
								<div className="mb-8 text-center">
									<h1 className='text-4xl font-medium mb-2 text-[#272835]'>{translate('successfulCreateAccountTitle')}</h1>
									<p className=''>{translate('successfulCreateAccountSubTitle')}</p>
									<div className="relative w-40 md:w-64 2xl:w-80 pb-40 md:pb-64 2xl:pb-80 mx-auto my-8">
										<Image 
											src={SuccessBanner}
											alt="Successful Create Account Banner"
											fill
										/>
									</div>
								</div>
							}
							{children}
						</div>
						{
							router.pathname === '/login' || router.pathname === '/register' ?
							<p className='text-center text-sm text-[#34484F]'>{translate('loginAnnaounsment')}</p> :
							<div className="flex justify-center items-end pt-6">
								<p>{translate("copyright")} {currentYear} {settingData?.company_name}</p>
								{
									router.pathname === '/verify-account' &&
									<button className="ms-auto border border-[#DFE1E7] py-2.5 px-4 rounded-md flex items-center gap-2 text-[#272835] hover:text-white hover:bg-[#34484F] ease-in-out duration-200">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
											<path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
										</svg>
										{translate('getHelp')}
									</button>
								}
							</div>
						}
					</div>
					{
						router.pathname === '/login' || router.pathname === '/register' ?
						<RegesterSwiper slideFor={router.pathname === "/login" ? 'login' : 'register'} /> : null
					}
				</div>
            </Suspense>
        </Fragment>
    );
};

export default AuthLayout;
