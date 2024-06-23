import React, { Fragment, Suspense } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import Link from "next/link";

import { useSelector } from "react-redux";
import { userSignUpData } from "@/store/reducer/authSlice";
import { settingsData } from "@/store/reducer/settingsSlice";

import { translate } from "@/utils"
import Loader from "../Loader/Loader";

import RegesterSwiper from "../RegesterSwiper/RegesterSwiper";
import arkafLogo from "@/assets/Logo_Color.png";
import SuccessBanner from "@/assets/successful_Create_banner.png";
import AuthSteps from "./AuthSteps";

const AuthLayout = ({ children }) => {

	const navigate = useRouter();
	const router = useRouter();
	const signupData = useSelector(userSignUpData);
	const settingData = useSelector(settingsData);
	const LanguageList = settingData && settingData.languages;
	const systemDefaultLanguageCode = settingData?.default_language;
	const currentYear = new Date().getFullYear();


	if(
		signupData?.data?.data &&
		signupData?.data?.data.profile === '' &&
		signupData?.data?.data.name === `user-${signupData?.data?.data.id}`
	) {
		navigate.push("/user/profile/")
		return
	} else {
		return (
			<Fragment>
				<Suspense fallback={<Loader />}>
					<div className={`grid  h-full
						${router.pathname === '/login' || router.pathname === '/register' || router.pathname === '/forgot-password' || router.pathname === '/reset-password' ? 'lg:grid-cols-2' : ''}
					`}>
						<div className={`h-full flex flex-col justify-between w-full mx-auto py-10 px-9 xl:px-0
							${router.pathname === '/login' || router.pathname === '/register' || router.pathname === '/forgot-password' || router.pathname === '/reset-password' ? 'max-w-[522px]' : 'container'}
						`}>
							<div className="flex flex-col md:flex-row gap-12 items-center justify-between">
								<Link className="navbar-brand" href="/">
									<Image loading="lazy" src={arkafLogo} alt="Arkaf Brand Logo" width={350} height={157} className="w-32 h-auto"/>
								</Link>
								
								{
									router.pathname === '/verify-account' || router.pathname === '/success-create-account' || router.pathname === '/user-register' ?
										<AuthSteps pathName={router.pathname} />
									: null
								}
							</div>
							<div>
								{
									router.pathname === '/login' || router.pathname === '/register' ?
									<div className="mb-8">
										<h1 className='text-4xl font-medium mb-2 text-[#272835]'>{translate('loginTitle')}</h1>
										<p className=''>{translate('loginSubTitle')}</p>
									</div>:
									router.pathname === '/forgot-password' ?
									<div className="mb-8">
										<h1 className='text-4xl font-medium mb-2 text-[#272835]'>{translate('forgotPasswordTitle')}</h1>
										<p className='text-sm'>{translate('forgotPasswordSubTitle')}</p>
									</div>:
									router.pathname === '/reset-password' ?
									<div className="mb-8">
										<h1 className='text-4xl font-medium mb-2 text-[#272835]'>{translate('resetPasswordTitle')}</h1>
										<p className='text-sm'>{translate('resetPasswordSubTitle')}</p>
									</div>:
									router.pathname === '/verify-account' ?
									<div className="mb-8 text-center">
										<h1 className='text-4xl font-medium mb-2 text-[#272835]'>{translate('verifyYourAccount')}</h1>
										<p className='text-sm'>{translate('otpCodeHints')}</p>
									</div>:
									router.pathname === '/user-register' ?
									'':
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
								router.pathname === '/login' || router.pathname === '/register' || router.pathname === '/forgot-password' || router.pathname === '/reset-password' ?
								<p className='text-center text-sm text-[#34484F]'>{translate('loginAnnaounsment')}</p> :
								<div className="flex justify-center items-end pt-6">
									<p>{translate("copyright")} {currentYear} Arkaf</p>
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
							router.pathname === '/login' || router.pathname === '/register' || router.pathname === '/forgot-password' || router.pathname === '/reset-password' ?
							<RegesterSwiper slideFor={router.pathname === "/login" ? 'login' : 'register'} /> : null
						}
					</div>
				</Suspense>
			</Fragment>
		);
	}
	
    
};

export default AuthLayout;
