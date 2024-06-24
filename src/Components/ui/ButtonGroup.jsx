import { Fragment } from 'react';
import { translate } from '@/utils';

const ButtonGroup = ({ label, options, name, selectedOption, onChange }) => {
	return (
		<Fragment>
			<label className='d-block mb-2 text-[#272835] text-sm'>{translate(label)}</label>
			<div className="flex gap-2">
				{options.map((option) => (
					<label key={option} className={`text-center px-3 py-2 border rounded-full w-20 cursor-pointer ${selectedOption === option && 'bg-[#EBFAFF]'}`}>
						<input
							type="radio"
							name={name}
							value={option}
							checked={selectedOption === option}
							onChange={() => onChange(option)}
							className="absolute opacity-0 invisible"
						/>
						<span>{translate(option)}</span>
					</label>
				))}
			</div>
		</Fragment>
	);
};

export default ButtonGroup;

