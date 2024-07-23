import { translate } from '@/utils';
import React, { useState } from 'react';

const listingBy = [
	{
		title: 'userAccount',
		subTitle: 'userAccountDisclamerText',
		icon: ''
	},
	{
		title: 'agentAccount',
		subTitle: 'agentAccountDisclamerText',
		icon: ''
	},
];

const UserType = ({ sendSelectedOption }) => {
	const [selectedOption, setSelectedOption] = useState(null);

	const handleRadioChange = (index) => {
		setSelectedOption(index);
		sendSelectedOption(index);
	};

	return (
		<div className="grid grid-cols-2 gap-3">
			{listingBy.map((item, idx) => (
				<label
					htmlFor={`option-${idx}`}
					key={idx}
					className={`p-2 cursor-pointer flex justify-between items-center border-2 rounded-xl ease-in-out duration-300 ${selectedOption === idx ? 'border-[#34484F] bg-[#34484F] text-white' : 'bg-white text-black'
						}`}
				>
					<div className="flex gap-3 items-center">
						<div className="w-10 h-10 rounded-full border flex justify-center items-center">
							{idx === 0 ? (
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
									<path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
								</svg>
							) : (
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
									<path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
									<path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
								</svg>
							)}
							{item.icon}
						</div>
						<div className="">
							<h1 className="font-medium text-[#]">{translate(item.title)}</h1>
							{/* <p className={`text-[#818898] text-sm me-2  ${selectedOption === idx ? 'text-slate-400' : 'text-[#818898]'}`}>{translate(item.subTitle)}</p> */}
						</div>
					</div>
					<input
						type="radio"
						name="option"
						id={`option-${idx}`}
						checked={selectedOption === idx}
						onChange={() => handleRadioChange(idx)}
						className={`form-radio outline-none shadow-none ring-0 h-5 w-5 text-[#34484F] ${selectedOption === idx ? 'checked:bg-[#547783]' : ''}`}
					/>
				</label>
			))}
		</div>
	);
};

export default UserType;
