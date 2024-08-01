import Image from 'next/image'

import { placeholderImage, translate } from "@/utils";

const AgentDetails = ({ data }) => {
  return (
	<div className='flex items-center gap-4'>
	  <Image
	  	src={data.profile}
		alt={`agent ${data.name} Profile Picture`}
		width={196}
		height={196}
		className='rounded-full'
		onError={placeholderImage} 
	  />
	  <div className="">
		<small className="text-slate-400 mb-2 block">Lead of The Anwar Group Real Estate</small>
		<p className="text-xl md:text-2xl xl:text-3xl font-medium mb-2 text-[#272835] capitalize">{data.name}</p>
		<span className="text-[#272835] mb-2 block capitalize">{data.Agency_name}</span>
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
			<svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
				<path d="M2.16667 0.5V13.8333H15.5V15.5H0.5V0.5H2.16667ZM14.9107 3.24408L16.0892 4.42259L11.3333 9.1785L8.83333 6.67917L5.25593 10.2559L4.07741 9.07742L8.83333 4.32149L11.3333 6.82083L14.9107 3.24408Z" fill="#272835"/>
			</svg>
			502 {translate('salesInLast')} 12 {translate('months')}
		</span>
	  </div>
	</div>
  )
}

export default AgentDetails
