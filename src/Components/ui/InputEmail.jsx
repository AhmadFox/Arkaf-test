import { Fragment, useRef, useEffect } from "react";
import { translate } from "@/utils";

const inputStyle = `
	p-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]
`;

const InputEmail = ({ placeholder, label, onValueChange }) => {

	const emailElm = useRef(null);

	useEffect(() => {

		const handleInput = () => {
			let value = emailElm.current.value;
			const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			emailPattern.test(value) ? onValueChange(true, value) : onValueChange(false, '')
		};

		const currentEmailElm = emailElm.current;
		if (currentEmailElm) {
			currentEmailElm.addEventListener('input', handleInput);
		}

		return () => {
			if (currentEmailElm) {
				currentEmailElm.removeEventListener('input', handleInput);
			}
		};
	}, []);

	return (
		<Fragment>
			<label className='d-block mb-1 text-[#272835] text-sm'>{translate(label)}</label>
			<input
				ref={emailElm} 
				type="email"
				className={inputStyle}
				placeholder={placeholder}
				pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
			/>
		</Fragment>
	)
}

export default InputEmail
