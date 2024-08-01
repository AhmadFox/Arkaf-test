import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link';

import { getAgentApi } from '@/store/actions/campaign';

import Layout from '../Layout/Layout'
import AgentDetails from '../FindAgent/AgentDetails';
import { translate } from '@/utils';
import BoxList from './BoxList';

const Agent = ({ agentId }) => {

	
	const [ agent, setAagent ] = useState([]);
	const [expanded, setExpanded] = useState(false);

	const breadcrumbItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Find Agent', href: '/find-agents' },
		{ label: agent.name, href: null }
	];

    useEffect(() => {
        getAgentApi(
			agentId,
            (response) => {
                setAagent(response.data);
            },
            (error) => {
                console.log(error);
            }
        );


    }, []);
	
	console.log('agent data', agent);

	return (
		<Layout stikyNav={true}>
			<div className="container">
				
				{/* Breadcrumb */}
				<nav className="flex my-9" aria-label="Breadcrumb">
					<ol className="inline-flex items-center">
						{breadcrumbItems.map((item, index) => (
						<li key={index} className="inline-flex items-center">
							{index !== 0 && (
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#34484F" className="size-4 mx-2">
								<path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
							</svg>
							)}
							{item.href ? (
							<Link
								href={item.href}
								className="text-sm text-[#34484F] hover:text-gray-900"
							>
								{item.label}
							</Link>
							) : (
							<span className="text-sm text-[#AAAAAA] capitalize">
								{item.label}
							</span>
							)}
						</li>
						))}
					</ol>
				</nav>

				{/*  */}

				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-7">
						<AgentDetails data={agent} />

						<hr className='my-5 border-[#a0a3ad]' />

						<p className="text-xl md:text-2xl font-medium mb-3 text-[#272835]">{translate('aboutMe')}</p>
						<div className="border rounded-xl bg-[#F6F8FA] p-3 mb-6">
							<div className="flex justify-between items-center">
								<span className="text-[#272835]">{translate('experiences')}</span>
								<span className="bg-white border rounded-full px-3 py-1 flex gap-2 items-center justify-center w-max">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
										<path d="M13 18.1665H11.3333V17.3332H4.66667V18.1665H3V17.3332H2.16667C1.24619 17.3332 0.5 16.587 0.5 15.6665V4.83317C0.5 3.9127 1.24619 3.1665 2.16667 3.1665H4.66667V1.49984C4.66667 1.0396 5.03977 0.666504 5.5 0.666504H10.5C10.9602 0.666504 11.3333 1.0396 11.3333 1.49984V3.1665H13.8333C14.7538 3.1665 15.5 3.9127 15.5 4.83317V15.6665C15.5 16.587 14.7538 17.3332 13.8333 17.3332H13V18.1665ZM13.8333 4.83317H2.16667V15.6665H13.8333V4.83317ZM6.33333 6.49984V13.9998H4.66667V6.49984H6.33333ZM11.3333 6.49984V13.9998H9.66667V6.49984H11.3333ZM9.66667 2.33317H6.33333V3.1665H9.66667V2.33317Z" fill="#5A727B"/>
									</svg>
									{agent.experience} {` `} {translate('yearsExperience')}
								</span>
							</div>

							<hr className="my-4 border-[#b5b8bd]" />

							<div className="flex justify-between items-center">
								<span className="text-[#272835]">{translate('specialities')}</span>
								<div className="flex flex-wrap justify-end gap-2 w-8/12 ms-auto">
									{
										agent.specialties && JSON.parse(agent.specialties).map((item, idx) => (
											<span key={idx} className="bg-white border rounded-full px-3 py-1 flex gap-2 items-center justify-center w-max">{item.text}</span>
										))
									}
									{/* <span className="bg-white border rounded-full px-3 py-1 flex gap-2 items-center justify-center w-max">
										+5
									</span> */}
								</div>
							</div>
						</div>

						<div className="mb-9">
							{
								agent.about_me !== "null" &&
								<Fragment>
									<p style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: expanded ? 'none' : '6em', marginBottom: '0', whiteSpace: 'pre-wrap' }}>
										{agent.about_me}
									</p>

									<div className="flex justify-center">
										<button className="seemore-btn text-[#5A727B]" onClick={() => setExpanded(!expanded)} >
											{expanded ? translate("showLess") : translate("showMore")}
											{/* <AiOutlineArrowRight className="mx-2" size={18} /> */}
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
												<path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
											</svg>

										</button>
									</div>
								</Fragment>
							}
						</div>

						{/* For Sell */}
						<BoxList userId={123} propertyType={0} />

						{/* For Rent */}
						<BoxList userId={123} propertyType={1} />

						{/* Sold */}
						<BoxList userId={123} propertyType={2} />

					</div>

					<div className="col-span-5">
						<div className="flex flex-col gap-3 sticky top-24 mb-9">
							<div className="border rounded-xl p-4 flex flex-col gap-3">
								<p className="text-xl font-medium text-[#666D80] mb-2">{translate('contactInformation')}</p>
								<Link href="" className='tw-btn-solid flex justify-center gap-2 m-0'>
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M10 3H14C18.4183 3 22 6.58172 22 11C22 15.4183 18.4183 19 14 19V22.5C9 20.5 2 17.5 2 11C2 6.58172 5.58172 3 10 3ZM12 17H14C17.3137 17 20 14.3137 20 11C20 7.68629 17.3137 5 14 5H10C6.68629 5 4 7.68629 4 11C4 14.61 6.46208 16.9656 12 19.4798V17Z" fill="white"></path></svg>
									{translate('chat')}
								</Link>
								<Link target='_blank' href={`https://wa.me/${agent.mobile}`} className='tw-btn-outline flex justify-center gap-2 m-0'>
									<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 25 24"><path d="M7.75361 18.4944L8.47834 18.917C9.68909 19.623 11.0651 20 12.501 20C16.9193 20 20.501 16.4183 20.501 12C20.501 7.58172 16.9193 4 12.501 4C8.0827 4 4.50098 7.58172 4.50098 12C4.50098 13.4363 4.87821 14.8128 5.58466 16.0238L6.00704 16.7478L5.35355 19.1494L7.75361 18.4944ZM2.50516 22L3.85712 17.0315C2.99494 15.5536 2.50098 13.8345 2.50098 12C2.50098 6.47715 6.97813 2 12.501 2C18.0238 2 22.501 6.47715 22.501 12C22.501 17.5228 18.0238 22 12.501 22C10.6671 22 8.94851 21.5064 7.47086 20.6447L2.50516 22ZM8.89232 7.30833C9.0262 7.29892 9.16053 7.29748 9.29459 7.30402C9.34875 7.30758 9.40265 7.31384 9.45659 7.32007C9.61585 7.33846 9.79098 7.43545 9.84986 7.56894C10.1482 8.24536 10.4376 8.92565 10.7182 9.60963C10.7801 9.76062 10.7428 9.95633 10.625 10.1457C10.5652 10.2428 10.4713 10.379 10.3625 10.5183C10.2494 10.663 10.006 10.9291 10.006 10.9291C10.006 10.9291 9.90738 11.0473 9.94455 11.1944C9.95903 11.25 10.0052 11.331 10.0471 11.3991C10.0703 11.4368 10.0918 11.4705 10.1058 11.4938C10.3617 11.9211 10.7057 12.3543 11.1259 12.7616C11.2463 12.8783 11.3631 12.9974 11.4887 13.108C11.957 13.5209 12.4868 13.8583 13.059 14.1082L13.0641 14.1105C13.1486 14.1469 13.192 14.1668 13.3157 14.2193C13.3781 14.2457 13.4419 14.2685 13.5074 14.2858C13.5311 14.292 13.5554 14.2955 13.5798 14.2972C13.7415 14.3069 13.835 14.2032 13.8749 14.1555C14.5984 13.279 14.6646 13.2218 14.6696 13.2222V13.2238C14.7647 13.1236 14.9142 13.0888 15.0476 13.097C15.1085 13.1007 15.1691 13.1124 15.2245 13.1377C15.7563 13.3803 16.6258 13.7587 16.6258 13.7587L17.2073 14.0201C17.3047 14.0671 17.3936 14.1778 17.3979 14.2854C17.4005 14.3523 17.4077 14.4603 17.3838 14.6579C17.3525 14.9166 17.2738 15.2281 17.1956 15.3913C17.1406 15.5058 17.0694 15.6074 16.9866 15.6934C16.8743 15.81 16.7909 15.8808 16.6559 15.9814C16.5737 16.0426 16.5311 16.0714 16.5311 16.0714C16.3922 16.159 16.3139 16.2028 16.1484 16.2909C15.891 16.428 15.6066 16.5068 15.3153 16.5218C15.1296 16.5313 14.9444 16.5447 14.7589 16.5347C14.7507 16.5342 14.1907 16.4482 14.1907 16.4482C12.7688 16.0742 11.4538 15.3736 10.3503 14.402C10.1247 14.2034 9.9155 13.9885 9.70194 13.7759C8.81288 12.8908 8.13982 11.9364 7.73169 11.0336C7.53043 10.5884 7.40299 10.1116 7.40098 9.62098C7.39729 9.01405 7.59599 8.4232 7.96569 7.94186C8.03857 7.84697 8.10774 7.74855 8.22709 7.63586C8.35348 7.51651 8.43392 7.45244 8.52057 7.40811C8.63607 7.34902 8.76293 7.31742 8.89232 7.30833Z" fill="currentColor"></path></svg>
									{translate('whatsapp')}
								</Link>
							</div>
							<div className="border rounded-xl p-4 flex flex-col gap-3">
								<p className="text-xl font-medium text-[#666D80] mb-2">{translate('workTogetherWithUs')}</p>
								<p className="text-[#27283] mb-2">{translate('youCanContactThisAgent')}</p>
								<Link href="" className='tw-btn-outline flex justify-center gap-2 m-0'>
									{translate('AddAsYourAgent')}
								</Link>
							</div>
						</div>
					</div>
				</div>

			</div>
		</Layout>
	)
}

export default Agent
