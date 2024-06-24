import { Fragment, useRef, useEffect } from "react";
import { translate } from "@/utils";

const inputStyle = `
	p-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]
`;

const SelectCategory = ({ label, onValueChange, value, className, options }) => {

	const selectElm = useRef(null);

	useEffect(() => {

		const handleSelect = () => {
			let value = selectElm.current.value;
			onValueChange(value);
		};

		const currentSelectElm = selectElm.current;
		if (currentSelectElm) {
			currentSelectElm.addEventListener('input', handleSelect);
		}

		return () => {
			if (currentSelectElm) {
				currentSelectElm.removeEventListener('input', handleSelect);
			}
		};
	}, []);

	return (
		<Fragment>
			<label className='d-block mb-1 text-[#272835] text-sm'>{translate(label)}</label>
			<select
				ref={selectElm} 
				value={value}
				className={` ${inputStyle} ${className}`}
			>
				<option disabled selected>{translate('selectCategory')}</option>
				{options && options.map((item, idx) => (
					<option
						value={item.id}
						key={idx}
					>{translate(item.category)}</option>
				))}
			</select>
		</Fragment>
	)
}

export default SelectCategory
