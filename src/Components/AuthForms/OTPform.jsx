import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

import { userSignUpData, verifyLoaded, resendCodeLoaded } from "@/store/reducer/authSlice";
import { translate } from "@/utils";

import SubmitButton from "./SubmitButton";
import InputOTP from "../ui/InputOTP";

const OTPform = () => {

	const navigate = useRouter();
	const userData = useSelector(userSignUpData);

	const [code, setCode] = useState('');
	const [email, setEmail] = useState('');
	const [formData, setFormData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const handleOTP = (valid, value) => {
		valid ? setCode(value) : setCode('');
	};


	useEffect(() => {
		if (userData && userData.data && userData.data.email) {
			setEmail(userData.data.email);
		}
	}, [userData]);

	useEffect(() => {
		setIsButtonDisabled(!code);

		setFormData({
			email,
			code
		});
	}, [code, email]);

	const handleSubmit = async (e) => {
        e.preventDefault();
		setIsLoading(true);

		try {
			verifyLoaded(
				formData.email,
				formData.code,
				(res) => {
					setIsLoading(false);
					navigate.push("/success-create-account")
					toast.success(res.message);
				},
				(err) => {
					if (err === 'Invalid or expired verification code.') {
						Swal.fire({
							title: "Opps!",
							text: "Invalid or expired verification code.",
							icon: "warning",
							showCancelButton: false,
							customClass: {
								confirmButton: 'Swal-confirm-buttons',
								cancelButton: "Swal-cancel-buttons"
							},
							confirmButtonText: "Ok",
						});
					} else {
						toast.error(translate("SomthingWenWrong"));
					}
				}
			);
		} catch (error) {
			console.error(error);
		}
    };

	const handleResendCode = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			resendCodeLoaded(
				formData.email,
				(res) => {
					setIsLoading(false);
					toast.success(res.message);
				},
				(err) => {
					toast.error(translate("SomthingWenWrong"));
					console.log('err:', err);
				}
			);
		} catch (error) {
			console.error(error);
		}
	}
	
	return (
		<Fragment>
			<form className="grid gap-4 w-full max-w-[453px] mx-auto" onSubmit={handleSubmit}>
				<InputOTP onValueChange={handleOTP} />
				<p className="flex gap-2 items-center justify-center">
					{translate('weSendItTo')}
					<span className="text-[#3785c4]">{email}.</span>
					<Link href="/register" className="!underline text-[#343434]">{translate('change')}</Link>
				</p>
				<SubmitButton
					caption={'continue'}
					loading={isLoading}
					disabled={isButtonDisabled}
					className={'tw-btn-solid'}
				/>
			</form>
			<div className="text-center mt-4">
				<button className='!underline' onClick={handleResendCode}>{translate('dontReceiveOTP')}</button>
			</div>
		</Fragment>
	);
};

export default OTPform;
