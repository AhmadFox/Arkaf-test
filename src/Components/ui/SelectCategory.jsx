import { Fragment, useState, useEffect } from 'react'
import Image from 'next/image';

import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { translate } from "@/utils";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const inputStyle = `
	p-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]
`;


export default function SelectCategory ({ label, onValueChange, options }) {

	const [selected, setSelected] = useState(options ? options[0] : []);

	useEffect(() => {

		onValueChange(selected.id)

	}, [selected]);

	return (
		<Fragment>
			<Listbox value={selected} onChange={setSelected}>
				{({ open }) => (
					<>
					<Label className="d-block mb-1 text-[#272835] text-sm">{translate(label)}</Label>
					<div className="relative">
						<ListboxButton className={inputStyle}>
							<span className="flex items-center">
								<Image 
									src={selected?.image}
									alt={`Catefory ${selected?.category} icon`}
									width={20}
									height={20}
									className="h-5 w-5 flex-shrink-0 rounded-full bg-slate-200"
								/>
								<span className="ml-3 block truncate">{selected?.category}</span>
							</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
								<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
							</span>
						</ListboxButton>

						<ListboxOptions
						transition
						className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
						>
						{options.map((item) => (
							<ListboxOption
							key={item.id}
							className={({ focus }) =>
								classNames(
								focus ? 'bg-indigo-600 text-white' : '',
								!focus ? 'text-gray-900' : '',
								'relative cursor-default select-none py-2 pl-3 pr-9',
								)
							}
							value={item}
							>
							{({ selected, focus }) => (
								<>
								<div className="flex items-center">
									<img src={item.image} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
									<span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
										{item.category}
									</span>
								</div>

								{selected ? (
									<span
									className={classNames(
										focus ? 'text-white' : 'text-indigo-600',
										'absolute inset-y-0 right-0 flex items-center pr-4',
									)}
									>
									<CheckIcon className="h-5 w-5" aria-hidden="true" />
									</span>
								) : null}
								</>
							)}
							</ListboxOption>
						))}
						</ListboxOptions>
					</div>
					</>
				)}
			</Listbox>
		</Fragment>
	)
}
