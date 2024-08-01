import Image from 'next/image'

import { placeholderImage, translate } from "@/utils";
import { Fragment } from 'react';

const AgentInfo = ({ agent }) => {
  return (

	<Fragment>
		{
			agent ? 
				<div className='flex items-center gap-3'>
				<Image
					src={agent.profile}
					alt={'agent Profile Picture'}
					width={120}
					height={120}
					className='rounded-full'
					onError={placeholderImage} 
				/>
				<div className="">
					<p className="text-lg font-medium mb-2 text-[#272835]">{agent.name}</p>
					<div className="flex item-center gap-x-0.5 mb-2">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#EBD58B" className="size-6">
							<path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
						</svg>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#EBD58B" className="size-6">
							<path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
						</svg>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#EBD58B" className="size-6">
							<path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
						</svg>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#EBD58B" className="size-6">
							<path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
						</svg>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#EBD58B" className="size-6">
							<path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
						</svg>
						<small className='leading-6 ms-1'>(234 {translate('reviews')})</small>
					</div>
					<span className="border text-sm rounded-full mb-2 px-3 py-1 flex items-center gap-2 justify-center w-max">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
							<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
						</svg>
						{agent.mobile}
					</span>
					<span className="text-slate-400 text-sm">{agent.Agency_name}</span>
				</div>
				</div> : 'loading'
		}
	</Fragment>
  )
}

export default AgentInfo
