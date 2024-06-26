import { Fragment, useRef, useEffect } from "react";
import { translate } from "@/utils";

const inputStyle = `
  p-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]
`;

const InputNumber = ({ placeholder, label, onValueChange, value, className }) => {
  
	const numberElm = useRef(null);

	useEffect(() => {

		const handleInput = () => {
			let value = numberElm.current.value;
			onValueChange(value)
		};

		const currentNumberElm = numberElm.current;
		if (currentNumberElm) {
			currentNumberElm.addEventListener('input', handleInput);
		}

		return () => {
			if (currentNumberElm) {
				currentNumberElm.removeEventListener('input', handleInput);
			}
		};
	}, []);

	return (
		<Fragment>
			<label className='d-block mb-1 text-[#272835] text-sm'>{translate(label)}</label>
			<input
				ref={numberElm}
				type="text"
				value={value}
				className={`${inputStyle} ${className}`}
				placeholder={translate(placeholder)}
			/>
		</Fragment>
	)
}

export default InputNumber;
