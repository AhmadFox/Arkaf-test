import { translate } from '@/utils';
import React, { useState } from 'react';

const ToggleSwitch = ({ sendSwitchValu, id, isVisabile, disabled }) => {
  const [isChecked, setIsChecked] = useState(isVisabile);


  console.log('disabled ==>', disabled)

  const handleToggle = () => {
    setIsChecked(!isChecked);
	sendSwitchValu(id, !isChecked ? '1' : '0');
  };

  return (
	<div className="flex items-center">
		<div
			className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer duration-300 ease-in-out ${isChecked ? 'bg-green-400' : ''}`}
			onClick={handleToggle}
		>
			<div
			className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isChecked ? 'translate-x-6' : ''}`}
			></div>
		</div>
	</div>
  );
};

export default ToggleSwitch;
