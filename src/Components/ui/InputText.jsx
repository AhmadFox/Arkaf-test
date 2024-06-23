import { Fragment, useRef, useEffect } from "react";
import { translate } from "@/utils";

const inputStyle = `
	p-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]
`;

const InputText = ({ placeholder, label, onValueChange, value, className }) => {

	const nameElm = useRef(null);

	useEffect(() => {

		const handleInput = () => {
			let value = nameElm.current.value;
			const namePattern = /^[a-zA-Z]+$/;
			namePattern.test(value) ? onValueChange(true, value) : onValueChange(false, '')
		};

		const currentNameElm = nameElm.current;
		if (currentNameElm) {
			currentNameElm.addEventListener('input', handleInput);
		}

		return () => {
			if (currentNameElm) {
				currentNameElm.removeEventListener('input', handleInput);
			}
		};
	}, []);

	return (
		<Fragment>
			<label className='d-block mb-1 text-[#272835] text-sm'>{translate(label)}</label>
			<input
				ref={nameElm} 
				type="text"
				value={value}
				className={` ${inputStyle} ${className}`}
				placeholder={translate(placeholder)}
				pattern="^[a-zA-Z]+$"
			/>
		</Fragment>
	)
}

export default InputText
