import { useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useSelector } from "react-redux";

import { placeholderImage, translate } from "@/utils";
import { settingsData } from "@/store/reducer/settingsSlice";
import { userSignUpData } from "@/store/reducer/authSlice";

import { profileCacheData, loadProfile } from "@/store/reducer/momentSlice";

const tabItemStyle = `text-[#1B1B1B] opacity-25 px-2`;
const activeItemStyle = `relative font-medium text-[#34484F] opacity-100 after:absolute after:w-full after:h-[2px] after:bg-[#34484F] after:-bottom-[12px] after:left-0`

const UserInfo = () => {

	useEffect(() => {
        loadProfile();
    }, [])

	const router = useRouter()
	const signupData = useSelector(userSignUpData);
    const profileData = useSelector(profileCacheData);
	const SettingsData = useSelector(settingsData);
	const PlaceHolderImg = SettingsData?.web_placeholder_logo;
	const user = profileData

	const userFB = signupData?.data?.firebase_id;
	let userType = '';

	switch (userFB) {
		case userFB: 2
			userType = 'Home Finder'
			break;
		case userFB: 1
			userType = 'Agent'
		default:
			break;
	}

	
	return (
		<section className='mt-12'>
			<div className="container">
				{
					user && 
					<div className="flex flex-col lg:flex-row items-baseline justify-between gap-3">
						<div className="flex items-stretch gap-3">
							<figure className='overflow-hidden rounded-lg relative bg-[#B3CBD3] flex-shrink-0 w-32 pb-32'>
								<Image
									loading="lazy"
									src={ user.profile? user.profile : PlaceHolderImg}
									alt="user profile picture"
									fill
									sizes=""
									className="object-fit"
									onError={placeholderImage}
								/>
							</figure>
							<div className="flex flex-col justify-between">
								<div className="">
									<p className='font-medium text-2xl xl:text-3xl text-[#272835] mb-2'>{user.name}</p>
									<span className='text-slate-400 text-sm'>{userType}</span>
								</div>
								<ul className='flex flex-wrap gap-2'>
									{
										user.city ?
										<li className='flex items-center gap-1 rounded-full border px-3 py-1'>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
												<path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
												<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
											</svg>
											<span className='capitalize'>{translate(user.city)}</span>
										</li> : null
									}
									<li className='flex items-center gap-1 text-sm rounded-full border px-3 py-1.5'>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
											<path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
										</svg>

										<span>{user.email}</span>
									</li>
									{
										user.mobile ?
										<li className='flex items-center gap-1 text-sm rounded-full border px-3 py-1.5'>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
												<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
											</svg>
											<span>{user.mobile}</span>
										</li> : null
									}
								</ul>
							</div>
						</div>
						<div className="grid grid-cols-2 w-full md:w-auto md:flex items-center gap-x-2">
							<Link href="user/messages" className='tw-btn-outline !px-6'>{translate('messages')}</Link>
							<Link href="/request-service" className='tw-btn-solid !px-6'>{translate('requestService')}</Link>
						</div>
					</div>
				}
				<nav className='flex gap-x-6 border-b min-w-[700px] my-4 list-none'>
					<li className='mb-2'>
						<Link href="/user/current-listing" className={`${tabItemStyle} ${router.pathname === '/user/current-listing' && activeItemStyle }`}>{translate('currentListing')}</Link>
					</li>
					<li className='mb-2'>
						<Link href="/user/transaction-history" className={`${tabItemStyle} ${router.pathname === '/user/transaction-history' && activeItemStyle }`}>{translate('history')}</Link>
					</li>
					<li className='mb-2'>
						<Link href="/user/favorites-properties" className={`${tabItemStyle} ${router.pathname === '/user/favorites-properties' && activeItemStyle }`}>{translate('favoriteList')}</Link>
					</li>
					<li className='mb-2'>
						<Link href="/user/request-list" className={`${tabItemStyle} ${router.pathname === '/user/request-list' && activeItemStyle }`}>{translate('requestList')}</Link>
					</li>
					<li className='mb-2'>
						<Link href="/user/profile" className={`${tabItemStyle} ${router.pathname === '/user/profile' && activeItemStyle }`}>{translate('accountSettings')}</Link>
					</li>
				</nav>
			</div>
		</section>
	)
}

export default UserInfo
