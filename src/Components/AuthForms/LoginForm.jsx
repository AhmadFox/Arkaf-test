import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';

import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { translate } from "@/utils";
import { loginLoaded } from "@/store/reducer/authSlice";

import InputPassword from "../ui/InputPassword";
import InputEmail from "../ui/InputEmail";
import SubmitButton from "./SubmitButton";

const LoginForm = () => {

	const navigate = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [formData, setFormData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const handleEmail = (valid, value) => {
		valid ? setEmail(value) : setEmail('');
	};
	const handlePassword = (valid, value) => {
		valid ? setPassword(value) : setPassword('');
	};

	useEffect(() => {

		email && password ? 
			setIsButtonDisabled(false) :
			setIsButtonDisabled(true);

		setFormData({
            email,
            password
        });

	}, [email, password]);

	const handleSubmit = (e) => {
        e.preventDefault();
		setIsLoading(true);

		try {
			loginLoaded(
				formData.email,
				formData.password,
				(res) => {
					setIsLoading(false);
					navigate.push("/user-register")
					toast.success(res.message);
				},
				(err) => {
					console.log('err:', err);
					if (err === 'Email not verified') {
						navigate.push("/verify-account")
					} else if (err === 'Invalid email or password') {
						toast.error('invalidLogin');
						setIsLoading(false);
					} else {
						setIsLoading(false);
						toast.error(translate("SomthingWenWrong"));
					}
				}
			);
		} catch (error) {
			console.error(error);
		}
    };


	return (
		<form className='mb-4 grid gap-4'  onSubmit={handleSubmit}>
			<div>
				<InputEmail 
					label={'email'}
					value={email}
					placeholder={'Ex: username@afkaf.com'}
					onValueChange={handleEmail}
				/>
			</div>
			<div>
				<InputPassword
					rule={false}
					label={'password'}
					value={password}
					placeholder={'passwordPlaceholder'}
					onValueChange={handlePassword}
				/>
			</div>
			<div className="flex justify-between items-center">
				<div className="flex gap-2">
					<input type='checkbox' id="rememberMe" className='cursor-pointer' />
					<label htmlFor="rememberMe" className='text-[#616161] cursor-pointer'>{translate('rememberMe')}</label>
				</div>
				<Link href="/forgot-password" className='!underline'>{translate('forgotPassword')}</Link>
			</div>
			<SubmitButton
				caption={'login'}
				loading={isLoading}
				disabled={isButtonDisabled}
				className={'tw-btn-solid'}
			/>
		</form>
	)
}

export default LoginForm

