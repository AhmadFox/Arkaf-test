import React, { useState } from 'react'
import UserLayout from '../Layout/UserLayout'
import { translate } from '@/utils'
import ReactPagination from '../Pagination/ReactPagination'
import NoData from '../NoDataFound/NoData'

const UserHistory = () => {

	const limit = 2;
	const [offsetdata, setOffsetdata] = useState(0);
	const handlePageChange = (selectedPage) => {
		const newOffset = selectedPage.selected * limit;
		setOffsetdata(newOffset);
		window.scrollTo(0, 300);
	};

	return (
		<UserLayout footer={true}>
			<div className="">
				<div className="container">
					<div className="border border-[#C1C7D0] rounded-lg xl:rounded-xl bg-white">

						{/* Page Title */}
						<div className="p-4 border-b">
							<span className="text-xl xl:text-2xl font-light">{translate("currentListing")}</span>
						</div>

						{/* Listiong */}
						<div className="p-3">

							{/* Return when no data found */}
							<div className="p-12">
								<NoData />
							</div>
						</div>

						{/* Pagenations */}
						<div className="p-3 border-t">
							<ReactPagination pageCount={Math.ceil(50 / limit)} onPageChange={handlePageChange} />
						</div>
					</div>
				</div>
			</div>
		</UserLayout>
	)
}

export default UserHistory
