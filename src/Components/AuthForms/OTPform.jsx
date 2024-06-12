import { useState, useRef } from "react";
import { translate } from "@/utils";
import Link from "next/link";

const OTPform = () => {

	return (
		<form className='grid gap-4 w-full max-w-[353px] mx-auto'>
			<div className="grid grid-cols-4 gap-3 px-4">
				<input type="number" className='px-3 py-3 rounded-[8px] border border-[#DFE1E7] outline-none focus:border-[#34484F] text-center text-2xl input-otp'/>
				<input type="number" className='px-3 py-3 rounded-[8px] border border-[#DFE1E7] outline-none focus:border-[#34484F] text-center text-2xl input-otp'/>
				<input type="number" className='px-3 py-3 rounded-[8px] border border-[#DFE1E7] outline-none focus:border-[#34484F] text-center text-2xl input-otp'/>
				<input type="number" className='px-3 py-3 rounded-[8px] border border-[#DFE1E7] outline-none focus:border-[#34484F] text-center text-2xl input-otp'/>
			</div>
			<p className="flex gap-2 items-center justify-center">
				{translate('weSendItTo')} +1623913990393.
				<Link href="/success-create-account" className="!underline text-[#343434]">{translate('change')}</Link>
			</p>
			<button className='mt-2 py-3 px-4 rounded-[8px] bg-[#34484F] font-semibold capitalize hover:bg-[#405861] text-white text-center ease-out duration-300'>{translate('continue')}</button>
		</form>
	)
}

export default OTPform
