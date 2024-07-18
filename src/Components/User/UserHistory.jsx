import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

import { translate } from '@/utils'
import { GetFeturedListingsApi, GetListingsApi } from '@/store/actions/campaign'

import ReactPagination from '../Pagination/ReactPagination'
import NoData from '../NoDataFound/NoData'
import UserLayout from '../Layout/UserLayout'
import TableListing from '../ui/TableListing'

const UserHistory = () => {

	const limit = 2;

	const [ total, setTotal ] = useState(0);
	const [ listing, setListing ] = useState([]);
	const [offsetdata, setOffsetdata] = useState(0);
	const isLoggedIn = useSelector((state) => state.User_signup);
    const userCurrentId = isLoggedIn && isLoggedIn?.data ? isLoggedIn?.data?.data?.id : null;


	const handlePageChange = (selectedPage) => {
		const newOffset = selectedPage.selected * limit;
		setOffsetdata(newOffset);
		window.scrollTo(0, 300);
	};

	// GET LISTING DATA
	useEffect(() => {
		// setIsLoading(true);
		if (isLoggedIn) {
			GetFeturedListingsApi({
				offset: offsetdata.toString(),
				limit: limit.toString(),
				filter_type: 1,
				userid: isLoggedIn ? userCurrentId : "",
				onSuccess: (response) => {
					setListing(response.data);
					setTotal(response.total)
					// setIsLoading(false);
				},
				onError: (error) => {
					console.log(error);
					// setIsLoading(true);
				}
			}
			);
		}
	}, [offsetdata]);

	return (
		<UserLayout footer={true}>
			<div className="">
				<div className="container">
					<div className="border border-[#C1C7D0] rounded-lg xl:rounded-xl bg-white">

						{/* Page Title */}
						<div className="p-4 border-b">
							<span className="text-xl xl:text-2xl font-light">{translate("currentListing")}</span>
						</div>

						{/* Listing */}
						<div className="">
							{
								total > 0 ?
								<TableListing data={listing} type="history" />:
								<div className="p-12">
									{/* Return when no data found */}
									<NoData data={listing} type={1} />
								</div>
							}
						</div>

						{/* Pagenations */}
						{
							total / limit > 1 &&
							<div className="p-3 border-t">
								<ReactPagination pageCount={Math.ceil(listing.total / limit)} onPageChange={handlePageChange} />
							</div>
						}
					</div>
				</div>
			</div>
		</UserLayout>
	)
}

export default UserHistory
