import React, { useEffect, useState } from 'react';

import { formatPriceAbbreviated} from "@/utils";

const PriceRange = ({ setPriceRange, reset, min, max }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(min || '');
  const [maxPrice, setMaxPrice] = useState(max || '');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handelPriceRange = (e) => {
	const elem = e.target
	elem.name === 'min' ?
		setMinPrice(elem.value):
		setMaxPrice(elem.value)
  }

	useEffect(() => {

		if (reset) {
      setMinPrice('')
		  setMaxPrice('')
    }

	}, [reset])

	useEffect(() => {

		setPriceRange(minPrice, maxPrice)

	}, [minPrice, maxPrice])

  return (
    <div className="relative inline-block text-left w-full">
      <button
        type="button"
        className="inline-flex justify-between w-full rounded-md border border-gray-300 px-2.5 py-2.5 bg-white font-medium text-gray-700 hover:bg-gray-50"
        onClick={toggleDropdown}
      >
        <span>
			{
				minPrice !== '' ? '' :  'Price: '
			}
			{
				minPrice !== '' ? 
				<small>Min ({formatPriceAbbreviated(minPrice)}) - Max ({formatPriceAbbreviated(maxPrice)})</small> : ''
			}
		</span>
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-[300px] rounded-md shadow-lg bg-white">
          <div className="p-3 flex gap-3">
            <div className="">
              <label className="block text-sm font-medium text-center text-gray-700">Min Price</label>
              <input
                type="number"
				name="min"
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 text-center text-sm"
                value={minPrice}
                onChange={handelPriceRange}
                placeholder="Min Price"
              />
            </div>
            <div className="">
              <label className="block text-sm font-medium text-center text-gray-700">Max Price</label>
              <input
                type="number"
				name="max"
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 text-center text-sm"
                value={maxPrice}
                onChange={handelPriceRange}
                placeholder="Max Price"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceRange;
