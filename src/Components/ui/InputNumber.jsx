import { Fragment, useRef, useEffect } from "react";
import { translate } from "@/utils";

const inputStyle = `
  p-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]
`;

const InputNumber = ({ placeholder, label, onValueChange, value, className, minLength, maxLength }) => {
  
	const numberElm = useRef(null);

	useEffect(() => {

		const handleInput = () => {
			let value = numberElm.current.value;
			value = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
			
			if (maxLength && value.length > maxLength) {
			  value = value.slice(0, maxLength); // Truncate to maxLength
			}
			
			numberElm.current.value = value;
			onValueChange(true, value);
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
				type="number"
				value={value}
				className={`${inputStyle} ${className}`}
				placeholder={translate(placeholder)}
				minLength={minLength}
        		maxLength={maxLength}
			/>
		</Fragment>
	)
}

export default InputNumber;
