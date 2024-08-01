import React, { useState, useEffect } from 'react'
import Link from 'next/link';

import { translate } from '@/utils';
import { GetFeturedListingsApi } from "@/store/actions/campaign";

import VerticalCard from "../Cards/VerticleCard";
import VerticalCardSkeleton from "../Skeleton/VerticalCardSkeleton";
import ReactPagination from '../Pagination/ReactPagination';


const BoxList = ({ userId, propertyType }) => {

	const limit = 4;

	const [isLoading, setIsLoading] = useState(true);
	const [ total, setTotal ] = useState(0);
	const [ listing, setListing ] = useState([]);
	const [offsetdata, setOffsetdata] = useState(0);

	const handlePageChange = (selectedPage) => {
		const newOffset = selectedPage.selected * limit;
		setOffsetdata(newOffset);
		window.scrollTo(0, 300);
	};

	useEffect(() => {
        setIsLoading(true);
        GetFeturedListingsApi({
            offset: offsetdata.toString(),
            limit: limit.toString(),
			userid: userId,
			property_type: propertyType,
            onSuccess: (response) => {
                setTotal(response.total);
                setIsLoading(false);
                setListing(response.data);
            },
            onError: (error) => {
                setIsLoading(true);
                console.log(error);
            }
        }
        );
    }, [offsetdata]);

	if ( listing ) {
		return (
			<div className="mb-9">
				<p className="text-xl md:text-2xl font-medium mb-3 text-[#272835]">
					{propertyType === 0 ? translate('forRent') : propertyType === 1 ? translate('forSell') : translate('sold') }
					
					{` `} ({total})
				</p>
				<div className='border rounded-xl'>
					<div className="p-4 grid md:grid-cols-2 gap-3">
						{listing.map((ele, index) => (
							<Link target='_blank' href={`/properties-details/${ele.slug_id}`} key={index} >
								<VerticalCard ele={ele} horizontal={true} withButtons={false} />
							</Link>
						))}
					</div>
					{
						total / limit > 1 &&
						<div className="p-3 border-t">
							<ReactPagination pageCount={Math.ceil(total / limit)} onPageChange={handlePageChange} />
						</div>
					}
				</div>
			</div>
		)
	}
}

export default BoxList
