import React, {Fragment, useState} from "react"; 
import Datepicker from "react-tailwindcss-datepicker";

import { translate } from "@/utils";

const inputStyle = `
	rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F] date-piker
`;

const DatePicker = ({ label, onValueChange, single, showShortcuts }) => {

	const [value, setValue] = useState({ 
			startDate: null,
			endDate: null 
		}); 

	const handleValueChange = (newValue) => {
	onValueChange(newValue)
	setValue(newValue); 
	}


	return (
		<Fragment>
			<label className='d-block mb-1 text-[#272835] text-sm'>{translate(label)}</label>
			<div className={inputStyle}>
				<Datepicker 
					asSingle={single} 
					primaryColor={"cyan"} 
					value={value} 
					onChange={handleValueChange} 
					showShortcuts={showShortcuts}
					placeholder={translate('enterDate')} 
					inputStyle={inputStyle}
				/> 
			</div>
		</Fragment>
	)
}

export default DatePicker

