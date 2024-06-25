import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

import { translate } from "@/utils";
import { signupLoaded } from "@/store/reducer/authSlice";

import InputTel from "../ui/InputTel";
import InputPassword from "../ui/InputPassword";
import InputEmail from "../ui/InputEmail";
import SubmitButton from "./SubmitButton";

const SignupForm = () => {

	const navigate = useRouter();

	const [phone, setPhone] = useState('');
	const [valedPhone, setValedPhone] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
	const [formData, setFormData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handlePhone = (valid, value) => {
		setPhone(value);
		setValedPhone(valid)
	};
	const handleEmail = (valid, value) => {
		valid ? setEmail(value) : setEmail('');
	};
	const handlePassword = (valid, value) => {
		valid ? setPassword(value) : setPassword('');
	};

	useEffect(() => {

		valedPhone && email && password ? 
			setIsButtonDisabled(false) :
			setIsButtonDisabled(true);

		setFormData({
            email,
            phone,
            password,
            password_confirmation: password,
			type: 0,
			firebase_id: 2
        });

	}, [phone, email, password, valedPhone])


	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
	
		try {
			signupLoaded(
				formData.email,
				formData.phone,
				formData.password,
				formData.password_confirmation,
				formData.type,
				formData.firebase_id,
				(res) => {
					setIsLoading(false);
					navigate.push("/verify-account");
					toast.success(res.message);
				},
				(error) => {
					console.log('Signup error:', error);
					setIsLoading(false);
					if (error.message === 'Account Deactivated by Administrative please connect to them') {
						Swal.fire({
							title: "Oops!",
							text: "Account Deactivated by Administrative please connect to them",
							icon: "warning",
							showCancelButton: false,
							customClass: {
								confirmButton: 'Swal-confirm-buttons',
								cancelButton: "Swal-cancel-buttons"
							},
							confirmButtonText: "Ok",
						}).then((result) => {
							if (result.isConfirmed) {
								navigate.push("/");
							}
						});
					} else if (error.message === 'validation.unique') {
						toast.error(translate("Email address already taken!"));
					} else {
						toast.error(translate("Something went wrong"));
					}
				}
			);
		} catch (error) {
			console.error('Unexpected error:', error);
			setIsLoading(false);
		}
	};
	

	return (
		<form className='mb-4 grid gap-4' onSubmit={handleSubmit}>
			<div>
				<InputTel
					code={'+966'}
					label={'phone'}
					value={phone}
					placeholder={'Ex: +966 000 000 000'}
					onValueChange={handlePhone}
				/>
			</div>
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
					rule={true}
					label={'password'}
					value={password}
					placeholder={'passwordPlaceholder'}
					onValueChange={handlePassword}
				/>
			</div>
			<SubmitButton
				caption={'register'}
				loading={isLoading}
				disabled={isButtonDisabled}
				className={'tw-btn-solid'}
			/>
		</form>
	);
};

export default SignupForm;
