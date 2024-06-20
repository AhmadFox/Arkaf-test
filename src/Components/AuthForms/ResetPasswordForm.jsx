import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { userSignUpData, resetPasswordLoaded } from "@/store/reducer/authSlice";
import { translate } from "@/utils";
import InputOTP from "../ui/InputOTP";
import SubmitButton from "./SubmitButton";
import InputPassword from "../ui/InputPassword";

const ResetPasswordForm = () => {

	const navigate = useRouter();
	const userData = useSelector(userSignUpData);

	const [email, setEmail] = useState('');
	const [code, setCode] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
	const [formData, setFormData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const handleOTP = (valid, value) => {
		valid ? setCode(value) : setCode('');
	};

	const handlePassword1 = (valid, value) => {
		valid ? setPassword1(value) : setPassword1('');
	};

	const handlePassword2 = (valid, value) => {
		valid ? setPassword2(value) : setPassword2('');
	};

	useEffect(() => {
		if (userData && userData.data && userData.data.email) {
			setEmail(userData.data.email);
		}
	}, [userData]);

	useEffect(() => {

		password2 === password1 && email  && code ? 
			setIsButtonDisabled(false) :
			setIsButtonDisabled(true);

		setFormData({
			email,
			code,
            password1,
            password2,
        });

	}, [password1, password2, email, code])


	const handleSubmit = async (e) => {
        e.preventDefault();
		setIsLoading(true);

		try {
			resetPasswordLoaded(
				formData.email,
				formData.code,
				formData.password1,
				formData.password2,
				(res) => {
					setIsLoading(false);
					navigate.push("/login")
					toast.success(res.message);
				},
				(err) => {
					if (err === 'Invalid or expired verification code.') {
						setIsLoading(false);
						toast.error(translate("Invalid or expired verification code."));
					} else {
						toast.error(translate("SomthingWenWrong"));
					}
				}
			);
		} catch (error) {
			console.error(error);
		}
    };

	return (
		<form className='mb-4 grid gap-4' onSubmit={handleSubmit}>
			<div className="">
				<InputOTP
					inputType={2}
					onValueChange={handleOTP}
				/>
			</div>
			<div>
				<InputPassword
					rule
					label={'newPassword'}
					value={password1}
					placeholder={'passwordPlaceholder'}
					onValueChange={handlePassword1}
				/>
			</div>
			<div>
				<InputPassword
					label={'confermPassword'}
					value={password2}
					placeholder={'passwordPlaceholder'}
					onValueChange={handlePassword2}
				/>
				{
					password2 !== password1 &&
					<p className="text-sm text-red-400 mt-2">{translate('passwordMatchMessage')}</p>
				}
			</div>
			<SubmitButton
				caption={'save'}
				loading={isLoading}
				disabled={isButtonDisabled}
				className={'tw-btn-solid'}
			/>
		</form>
	);
};

export default ResetPasswordForm;
