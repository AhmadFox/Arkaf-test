import { Fragment, useRef, useEffect } from "react";
import { translate } from "@/utils";

const inputStyle = `
	p-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]
`;

const InputText = ({ placeholder, label, onValueChange, value, className , type}) => {

	const nameElm = useRef(null);

	useEffect(() => {

		const handleInput = () => {
			let value = nameElm.current.value;
			const namePattern = type === 'url' ? new RegExp('https?://.+') : /^[a-zA-Z]+$/;
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
			{
				label && <label className='d-block mb-1 text-[#272835] text-sm'>{translate(label)}</label>
			}
			<input
				ref={nameElm} 
				type={type}
				value={value}
				className={` ${inputStyle} ${className}`}
				placeholder={translate(placeholder)}
				pattern= { type === 'url' ? 'https?://.+' : '^[a-zA-Z]+$'}
			/>
		</Fragment>
	)
}

export default InputText
