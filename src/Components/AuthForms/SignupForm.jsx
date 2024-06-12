import { useState, useRef } from "react";
import { translate } from "@/utils";

const SignupForm = () => {

	const [ showPassword, setShowPassword ] = useState(true);
	const passwordElem = useRef()

	const showPasswordToggel = (e) => {
		e.preventDefault();
		setShowPassword(!showPassword);
		showPassword ? passwordElem.current.type = 'text' : passwordElem.current.type = 'password'
	}

	return (
		<form className='mb-4 grid gap-4'>
			<div className="">
				<label className='d-block mb-1 text-[#272835] text-sm'>{translate('phone')}</label>
				<input type="tel" className='p-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]' placeholder='Ex:2831713123'/>
			</div>
			<div className="">
				<label className='d-block mb-1 text-[#272835] text-sm'>{translate('email')}</label>
				<input type="email" className='p-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]' placeholder='Ex:arkaf@gmail.com'/>
			</div>
			<div className="">
				<label className='d-block mb-1 text-[#272835] text-sm'>{translate('password')}</label>
				<div className="relative">
					<input ref={passwordElem} type="password" className='p-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]' placeholder={translate('passwordPlaceholder')}/>
					<button onClick={(e) => showPasswordToggel(e)} className="absolute top-1/2 -translate-y-1/2 end-2">
						{
							showPassword ?
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#818898" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
								<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
							</svg>:
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#818898" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
							</svg>
						  
						}
						<span className="sr-only">hide/show Password</span>
					</button>
				</div>
				
				{/* Password Role */}
				<div className="flex flex-col gap-3 mt-2">
					<p className="text-sm text-[#818898]">{translate('passwordRole')}</p>
					<div className="grid grid-cols-4 gap-2">
						<span className="w-full h-[8px] rounded-[8px] relative overflow-hidden bg-[#ECEFF3]" style={{ backgroundColor: '' }}></span>
						<span className="w-full h-[8px] rounded-[8px] relative overflow-hidden bg-[#ECEFF3]" style={{ backgroundColor: '' }}></span>
						<span className="w-full h-[8px] rounded-[8px] relative overflow-hidden bg-[#ECEFF3]" style={{ backgroundColor: '' }}></span>
						<span className="w-full h-[8px] rounded-[8px] relative overflow-hidden bg-[#ECEFF3]" style={{ backgroundColor: '' }}></span>
					</div>
				</div>
			</div>
			<button className='mt-2 py-3 px-4 rounded-[8px] bg-[#34484F] font-semibold capitalize hover:bg-[#405861] text-white text-center ease-out duration-300'>{translate('register')}</button>
		</form>
	)
}

export default SignupForm
