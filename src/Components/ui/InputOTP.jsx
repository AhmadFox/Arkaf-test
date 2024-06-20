import { useRef, useEffect } from "react";

import { translate } from "@/utils";

const inputStyle = `
	px-3 py-3 rounded-[8px] border border-[#DFE1E7] outline-none focus:border-[#34484F] text-center text-2xl input-otp
`;

const inputStyleType = `
	px-2 py-2 rounded-[6px] border border-[#DFE1E7] outline-none focus:border-[#34484F] text-center text-lg input-otp
`;

const InputOTP = ({ onValueChange, inputType }) => {
	const inputRefs = useRef([]);

	const handleInputChange = (e, index) => {
		const value = e.target.value;

		if (value.length > 1) {
			const values = value.split('');
			values.forEach((digit, i) => {
				if (i + index < 6) {
					inputRefs.current[i + index].value = digit;
				}
			});
			inputRefs.current[Math.min(index + values.length, 5)].focus();
		} else if (value.length === 1) {
			inputRefs.current[Math.min(index + 1, 5)].focus();
		}

		checkIfAllFieldsFilled();
	};

	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace" && !e.target.value) {
			inputRefs.current[Math.max(index - 1, 0)].focus();
		}
	};

	const checkIfAllFieldsFilled = () => {
		const allFilled = inputRefs.current.every((input) => input.value);
		if (allFilled) {
			const otpMergeCodeVariable = inputRefs.current.map(input => input.value).join('');
			onValueChange(true, otpMergeCodeVariable);
		} else {
			onValueChange(false, '');
		}
	};

	useEffect(() => {
		checkIfAllFieldsFilled();
	}, []);

	return (
		<div className="">
			{
				inputType === 2 &&
				<label className='d-block mb-1 text-[#272835] text-sm'>{translate('otpCode')}</label>
			}
			<div className={`grid gap-3 ${inputType === 2 ? 'grid-cols-8': 'grid-cols-6 px-4'}`}>
				
				{Array.from({ length: 6 }).map((_, index) => (
					<input
						key={index}
						type="number"
						className={inputType === 2 ? inputStyleType : inputStyle}
						ref={(el) => (inputRefs.current[index] = el)}
						onChange={(e) => handleInputChange(e, index)}
						onKeyDown={(e) => handleKeyDown(e, index)}
						maxLength={1}
						pattern="\d*"
					/>
				))}
			</div>
		</div>
	)
}

export default InputOTP;
