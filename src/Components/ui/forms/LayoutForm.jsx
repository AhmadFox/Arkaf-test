import { translate } from '@/utils';
import React, { useEffect, useState } from 'react';
import ImageDropZone from '../ImageDropZone';
import InputText from '../InputText';
import InputNumber from '../InputNumber';

const inputStyle = `
    p-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]
`;

const LayoutForm = ({ availableparameter, itemId, removeLayoutItem, onValueChange }) => {

	const removeItem = (e, id) => {
		e.preventDefault();
		removeLayoutItem(id)
	}

	const [ layoutData, SetLayoutData ] = useState({
		image: '',
		name: '',
		price: '',
		size: '',
		parameters: []
	})
	const [parameter, setParametersData] = useState({
        parameters: []
    });

	const handleLayoutChange = (field, value) => {
        SetLayoutData(prevLayoutData => ({
            ...prevLayoutData,
            [field]: value,
        }));
    };

	const handelImage = value => handleLayoutChange('image', value);
	const handelName = (valid, value) => handleLayoutChange('name', value);
	const handleSize = (valid, value)  => handleLayoutChange('size', value);
	const handlePrice = (valid, value)  => handleLayoutChange('price', value);

	const handleParametersChange = (e, parameterId) => {
        const select = e.target.value;
        // Find the index of the parameter with the same parameter_id
        const existingIndex = parameter.parameters.findIndex(param => param.parameter_id === parameterId);
    
        // Create a new parameters array with the updated or added parameter
        const newParameters = [...parameter.parameters];
        if (existingIndex !== -1) {
            // Update an existing parameter
            newParameters[existingIndex] = { parameter_id: parameterId, value: select };
        } else {
            // Add a new parameter
            newParameters.push({ parameter_id: parameterId, value: select });
        }
    
        // Update the parameter state with the new parameters array
        setParametersData(prevParameter => ({
            ...prevParameter,
            parameters: newParameters
        }));

		handleLayoutChange('parameters', newParameters);
		
    };

	useEffect(() => {
		onValueChange(itemId, [layoutData]);
	}, [layoutData])

	return (
		<div className='lg:flex items-start gap-2 justify-between border-t pt-4 mt-3 relative'>
			<div className="w-full min-w-36 max-w-36 lg:max-w-full h-40 border rounded-md me-2 mb-3 lg:my-auto">
				<ImageDropZone
					fileInputId={itemId}
					height='h-full'
					size='xs'
					object="contain"
					editIcon={true}
					onValueChange={handelImage}
				/>
			</div>
			<div className="grid gap-3 flex-shrink-0 ">
				<div className="grid gap-3 grid-cols-3">
					<div className="">
						<InputText
							label={'layoutName'}
							onValueChange={handelName}
						/>
					</div>
					<div className="">
						<InputNumber
							label={'sizeInputLabel'}
							placeholder={'Ex: 200'}
							onValueChange={handleSize}
						/>
					</div>
					<div className="">
						<InputNumber
							label={'price'}
							placeholder={''}
							onValueChange={handlePrice}
						/>
					</div>
				</div>
				<div className={`grid gap-3 grid-cols-3`}>
					{availableparameter
						.filter(item => item.name !== 'Size')
						.map((item, idx) => (
							<div key={idx}>
								<label className='d-block mb-1 text-[#272835] text-sm'>{translate(item.name)}</label>
								<select
									className={inputStyle}
									onChange={(e) => handleParametersChange(e, item.id)}
								>
									<option disabled selected>{translate('Select')} {translate(item.name)}</option>
									<option value={1}>1</option>
									<option value={2}>2</option>
									<option value={3}>3</option>
									<option value={4}>4</option>
									<option value={5}>5</option>
									<option value={6}>6</option>
									<option value={7}>7</option>
									<option value={8}>8</option>
									<option value={9}>9</option>
									<option value={10}>10</option>
								</select>
							</div>
						))}
				</div>
			</div>
			<div className="mb-auto absolute lg:static top-3 right-3">
				<button
					onClick={(e) => removeItem(e, itemId)}
				>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="size-6 stroke-red-500">
					<path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
				</svg>
				</button>
			</div>
		</div>
	)
}

export default LayoutForm
