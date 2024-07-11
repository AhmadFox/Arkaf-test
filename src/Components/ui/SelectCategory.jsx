import { Fragment, useEffect, useState } from "react";
import { translate } from "@/utils";

const inputStyle = `
	p-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]
`;

const SelectCategory = ({ label, onValueChange, value, className, options }) => {
	
	const [ selectedValue, setSelectedValue ] = useState(value)

	const handleSelect = (e) => {
		setSelectedValue(e.target.value)
		onValueChange(e.target.value);
	};

	return (
		<Fragment>
			<label className='d-block mb-1 text-[#272835] text-sm'>{translate(label)}</label>
			<select
				value={selectedValue}
				defaultValue={selectedValue}
				onChange={handleSelect}
				className={` ${inputStyle} ${className}`}
			>
				<option disabled value='0'>{translate('selectCategory')}</option>
				{options && options.map((item, idx) => (
					<option
						value={item.id}
						key={idx}
					>{translate(item.category)}</option>
				))}
			</select>
		</Fragment>
	);
};

export default SelectCategory;