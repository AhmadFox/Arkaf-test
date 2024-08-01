import { translate } from '@/utils'

import { GetCitiesApi } from "@/store/actions/campaign";

import { useEffect, useState } from 'react';
import InputText from '../ui/InputText';
import SubmitButton from '../AuthForms/SubmitButton';

const inputStyle = `
	p-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]
`;

const SreachAgent = ({ handelSearchApplay }) => {
	
	const [cities, setCities] = useState([]);
	const [cityId, setCityId] = useState('');
	const [search, setSeach] = useState('');

	const handelLocation = (e) => {
		setCityId( e.target.value);
	}

	const handelAgentName = (valid, value) => {
		setSeach(value)
	}

	const handelApplaySearch = () => {
		handelSearchApplay(search, cityId)
	}

	useEffect(() => {
        GetCitiesApi(
            (response) => {
                setCities(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

	return (
		<div className='rounded-lg md:rounded-xl bg-white p-6'>
		<p className="font-medium text-lg xl:text-2xl mb-3 text-[#272835]">{translate('FindAnAgentAtRiyadh')}</p>
		<div className="grid grid-cols-12 gap-4 items-end">
			<div className="col-span-4 relative">
				<label className='d-block mb-1 text-[#272835] text-sm'>{translate('location')}</label>
				<select
					onChange={e => handelLocation(e)}
					className={`${inputStyle} ps-9`}
				>
					{cities.map((item, idx) => (
						<option
							value={item.id}
							key={idx}
						>{translate(item.name)}</option>
					))}
				</select>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute bottom-2.5 start-2">
					<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
				</svg>
			</div>
			<div className="col-span-5 relative">
				<InputText
					placeholder={'enterAnAgentOrAgency'}
					label={'agents'}
					onValueChange={handelAgentName}
					type="text"
					className={'ps-9'}
				/>
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="19" viewBox="0 0 14 19" fill="none" className='absolute bottom-3 mb-0.5 start-3'>
					<path d="M13.6654 18.3335H11.9987V16.6668C11.9987 15.2861 10.8794 14.1668 9.4987 14.1668H4.4987C3.11799 14.1668 1.9987 15.2861 1.9987 16.6668V18.3335H0.332031V16.6668C0.332031 14.3657 2.19751 12.5002 4.4987 12.5002H9.4987C11.7999 12.5002 13.6654 14.3657 13.6654 16.6668V18.3335ZM6.9987 10.8335C4.23727 10.8335 1.9987 8.59491 1.9987 5.8335C1.9987 3.07207 4.23727 0.833496 6.9987 0.833496C9.76011 0.833496 11.9987 3.07207 11.9987 5.8335C11.9987 8.59491 9.76011 10.8335 6.9987 10.8335ZM6.9987 9.16683C8.83961 9.16683 10.332 7.67445 10.332 5.8335C10.332 3.99255 8.83961 2.50016 6.9987 2.50016C5.15775 2.50016 3.66536 3.99255 3.66536 5.8335C3.66536 7.67445 5.15775 9.16683 6.9987 9.16683Z" fill="#272835"/>
				</svg>
			</div>
			<div className="col-span-3">
				<SubmitButton
					caption={'startExplore'}
					loading={false}
					className={'tw-btn-solid w-full'}
					disabled={false}
					onClick={handelApplaySearch}
				/>
			</div>
		</div>
		</div>
	)
}

export default SreachAgent
