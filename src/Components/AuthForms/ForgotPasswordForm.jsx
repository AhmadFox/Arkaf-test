import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';

import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { translate } from "@/utils";
import { forgotPasswordLoaded } from "@/store/reducer/authSlice";

import InputEmail from "../ui/InputEmail";
import SubmitButton from "./SubmitButton";

const ForgotPasswordForm = () => {

	const navigate = useRouter();

	const [email, setEmail] = useState('');
	const [formData, setFormData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const handleEmail = (valid, value) => {
		valid ? setEmail(value) : setEmail('');
	};

	useEffect(() => {

		email ? 
			setIsButtonDisabled(false) :
			setIsButtonDisabled(true);

		setFormData({
            email
        });

	}, [email]);

	const handleSubmit = (e) => {
        e.preventDefault();
		setIsLoading(true);

		try {
			forgotPasswordLoaded(
				formData.email,
				(res) => {
					console.log('res:', res);
					setIsLoading(false);
					navigate.push("/reset-password")
					toast.success(res.message);
				},
				(err) => {
					console.log('err:', err);
					if (err === 'Email not verified') {
						navigate.push("/verify-account")
					} else if (err === 'Invalid email or password') {
						toast.error('errorEmail');
						setIsLoading(false);
					} else {
						setIsLoading(false);
						toast.error(translate("SomthingWenWrong"));
					}
				}
			);
		} catch (error) {
			console.error('error:', error);
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
			<SubmitButton
				caption={'sendResetCode'}
				loading={isLoading}
				disabled={isButtonDisabled}
				className={'tw-btn-solid'}
			/>
		</form>
	)
}

export default ForgotPasswordForm

