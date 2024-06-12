import { useState, useRef } from "react";
import Link from 'next/link';
import { translate } from "@/utils";

const LoginForm = () => {

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
			</div>
			<div className="flex justify-between items-center">
				<div className="flex gap-2">
					<input type='checkbox' id="rememberMe" className='cursor-pointer' />
					<label htmlFor="rememberMe" className='text-[#616161] cursor-pointer'>{translate('rememberMe')}</label>
				</div>
				<Link href="/verify-account" className='!underline'>{translate('forgotPassword')}</Link>
			</div>
			<button className='mt-2 py-3 px-4 rounded-[8px] bg-[#34484F] font-semibold capitalize hover:bg-[#405861] text-white text-center ease-out duration-300'>{translate('login')}</button>
		</form>
	)
}

export default LoginForm

