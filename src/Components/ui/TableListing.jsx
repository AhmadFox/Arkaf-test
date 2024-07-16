import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import { deletePropertyApi } from "@/store/actions/campaign";
import { translate, formatPriceAbbreviated } from "@/utils";

import ListingCard from '../Cards/ListingCard'
import Badeg from './Badeg'

const TableListing = ({ data, type }) => {

	const handelDeleteItem = () => {
		deletePropertyApi(
            data.id,
            (response) => {
                toast.success(response.message);
            },
            (error) => {
                toast.error(error);
            }
        );
	}

	return (
		<table class="table-auto w-full">
			<thead>
				<tr className='text-lg xl:text-xl font-light border-b text-[#4D4D4D]'>
					<td className='py-3 px-4'>{translate('listing')}</td>
					<td className='py-3 px-4 text-center'>{translate('stats')}</td>
					<td className='py-3 px-4'>{translate('status')}</td>
					<td className='py-3 px-4'></td>
				</tr>
			</thead>
			<tbody>
				{
					data.map((item, idx) => (
						<tr key={idx}>
							{/* Listing component data */}
							<td className='py-3 px-4'>
								<ListingCard data={item} />
							</td>
							<td className='py-3 px-4'>
								<div className="flex flex-col justify-center space-y-3">
									<Badeg
										icon="eye"
										count={formatPriceAbbreviated(item.total_view)}
										type={'default'}
									/>
									<Badeg
										icon="hert"
										count={formatPriceAbbreviated(item.total_favourite_users)}
										type={'default'}
									/>
									<Badeg
										icon="share"
										count={'0'}
										type={'default'}
									/>
								</div>
							</td>
							<td className='py-3 px-4'>
								<div className="flex flex-col justify-center space-y-3">
									<Badeg
										count={'Solid'}
										type={'solid'}
									/>
									{/* <Badeg
										count={'Available'}
										type={'Available'}
									/>
									<Badeg
										count={'On Agent'}
										type={'On Agent'}
									/>
									<Badeg
										count={'Unavailable'}
										type={'Unavailable'}
									/> */}
								</div>
							</td>
							<td className='py-3 px-4'>
								<div className="w-full h-full flex justify-end">
									<Menu as="div" className="relative inline-block">
										<div>
											<MenuButton className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md ps-4 pe-3 py-2.5 text-gray-900 border">
												{translate('actions')}
												<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
													<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
												</svg>

												{/* <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" /> */}
											</MenuButton>
										</div>

										<MenuItems
											transition
											className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
										>
											<div className="p-1.5">
												<MenuItem>
													<button
														className="flex rounded-md w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 ease-in-out duration-200"
													>
														<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
															<path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
														</svg>

														{translate('Listing Again')}
													</button>
												</MenuItem>

												<MenuItem>
													<button
														onClick={handelDeleteItem}
														className="flex rounded-md w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-100 ease-in-out duration-200"
													>
														<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}className="size-4 stroke-red-500">
															<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
														</svg>

														{translate('delete')}
													</button>
												</MenuItem>

											</div>
										</MenuItems>
									</Menu>
								</div>
							</td>
						</tr>
					))
				}
			</tbody>
		</table>
	)
}

export default TableListing
