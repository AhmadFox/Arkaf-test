import { useRef, useEffect, Fragment, useState } from "react";

import { toast } from "react-hot-toast";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { PhoneNumberUtil } from "google-libphonenumber";

import { translate } from "@/utils";

	const inputStyle = `
		px-2.5 py-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]
	`;
const InputTel = ({placeholder, label, onValueChange, className, value}) => {

	const telElm = useRef(null);
	const [ validation, setValidation ] = useState();
	const [ phone, setPhone ] = useState(value ? value : '');
	const phoneUtil = PhoneNumberUtil.getInstance();

	useEffect(() => {
		setPhone(value)
	}, [value])

	useEffect(() => {

		const checkPhoneValid = () => {
			let value = telElm.current.value;
			try {
				const phoneNumber = phoneUtil.parseAndKeepRawInput(value, 'ZZ');
				if (phoneUtil.isValidNumber(phoneNumber)) {
					toast.success(translate("validPhonenum"));
					onValueChange(true, value)
				}else {
					toast.error(translate("notValidPhonenum"));
					onValueChange(false, '')
				}
				setPhone(phoneNumber.values_[5]);
			} catch (error) {
				console.error("Error parsing phone number:", error);
			}
		}

		const currentTelElm = telElm.current;
		if (currentTelElm) {
			currentTelElm.addEventListener('input', checkPhoneValid);
		}

		return () => {
			if (currentTelElm) {
				currentTelElm.removeEventListener('input', checkPhoneValid);
			}
		};

	}, []);

	return (
		<Fragment>
			<label className='d-block mb-1 text-[#272835] text-sm'>{translate(label)}</label>
			<PhoneInput
				ref={telElm}
				defaultCountry={process.env.NEXT_PUBLIC_DEFAULT_COUNTRY}
				disabledCountryCode={true}
				countryCallingCodeEditable={true}
				international={true}
				placeholder={placeholder}
				value={phone}
				onChange={setValidation}
				className={`${inputStyle} ${className}`}
			/>
		</Fragment>
	)
}

export default InputTel
