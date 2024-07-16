"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Breadcrumb from "@/Components/Breadcrumb/Breadcrumb";
import VerticalCard from "@/Components/Cards/VerticleCard";
import FilterForm from "@/Components/AllPropertyUi/FilterForm";
import GridCard from "@/Components/AllPropertyUi/GridCard";
import AllPropertieCard from "@/Components/AllPropertyUi/AllPropertieCard";
import { GetFeturedListingsApi } from "@/store/actions/campaign";
import CustomHorizontalSkeleton from "@/Components/Skeleton/CustomHorizontalSkeleton";
import { useSelector } from "react-redux";
import { translate } from "@/utils";
import { languageData } from "@/store/reducer/languageSlice";
import Pagination from "@/Components/Pagination/ReactPagination";
import NoData from "@/Components/NoDataFound/NoData";
import { categoriesCacheData } from "@/store/reducer/momentSlice";
import Layout from '../Layout/Layout';


const Rent = () => {

	const [grid, setGrid] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [CategoryListByPropertyData, setCategoryListByPropertyData] = useState();
	const [clearfilterLocation, setClearFilerLocation] = useState(false);

	const [filterData, setFilterData] = useState({
		propType: "",
		category: "",
		minPrice: "",
		maxPrice: "",
		postedSince: "",
		selectedLocation: null,
	});
	const [total, setTotal] = useState();
	const [offsetdata, setOffsetdata] = useState(0);
	const limit = 8;

	const isLoggedIn = useSelector((state) => state.User_signup);
	const userCurrentId = isLoggedIn && isLoggedIn.data ? isLoggedIn.data.data.id : null;

	const lang = useSelector(languageData);
	const Categorydata = useSelector(categoriesCacheData);

	useEffect(() => { }, [lang]);
	useEffect(() => { }, [grid]);


	const handlePageChange = (selectedPage) => {
		const newOffset = selectedPage.selected * limit;
		setOffsetdata(newOffset);
		window.scrollTo(0, 0);
	};

	const handleInputChange = (e) => {
		const { name, value, type } = e.target;
		// Ensure that the input value is a positive number
		if (type === "number") {
			const sanitizedValue = Math.max(0, parseInt(value));
			setFilterData({
				...filterData,
				[name]: sanitizedValue,
			});
		} else {
			setFilterData({
				...filterData,
				[name]: value,
			});
		}
	};

	const handleTabClick = (tab) => {
		const propTypeValue = tab === "sell" ? 0 : 1;
		setFilterData({
			...filterData,
			propType: propTypeValue,
		});
	};
	const handlePostedSinceChange = (e) => {
		setFilterData({
			...filterData,
			postedSince: e.target.value,
		});
	};

	const handleLocationSelected = (locationData) => {
		setFilterData({
			...filterData,
			selectedLocation: locationData,
		});
	};

	useEffect(() => {
		setIsLoading(true);

		GetFeturedListingsApi({
			offset: offsetdata.toString(),
			limit: limit.toString(),
			current_user: isLoggedIn ? userCurrentId : "",
			property_type: '1',
			onSuccess: (response) => {
				setTotal(response.total);
				const propertyData = response.data;
				setIsLoading(false);
				setCategoryListByPropertyData(propertyData);
			},
			onError: (error) => {
				setIsLoading(false);
				console.log(error);
			}
		}
		);
	}, [offsetdata, isLoggedIn]);
	const handleApplyfilter = (e) => {
		e.preventDefault();

		// Determine the value for the postedSince parameter based on filterData.postedSince
		let postedSinceValue = "";
		if (filterData.postedSince === "yesterday") {
			postedSinceValue = "0";
		} else if (filterData.postedSince === "lastWeek") {
			postedSinceValue = "1";
		}
		setIsLoading(true)
		GetFeturedListingsApi({
			category_id: filterData ? filterData?.category : "",
			city: filterData ? filterData?.selectedLocation?.city : "",
			offset: offsetdata.toString(),
			limit: limit.toString(),
			current_user: isLoggedIn ? userCurrentId : "",
			property_type: filterData ? filterData?.propType : "",
			max_price: filterData ? filterData?.maxPrice : "",
			min_price: filterData ? filterData?.minPrice : "",
			posted_since: postedSinceValue, // Set the postedSince parameter
			state: filterData ? filterData?.selectedLocation?.state : "",
			country: filterData ? filterData?.selectedLocation?.country : "",
			onSuccess: (response) => {
				setTotal(response.total);
				const propertyData = response.data;

				setCategoryListByPropertyData(propertyData);
				setIsLoading(false);
			},
			onError: (error) => {
				setIsLoading(false);
				console.log(error);
			}
		});
	};
	const handleClearFilter = () => {
		setClearFilerLocation(true)
		setFilterData({
			propType: "",
			category: "",
			minPrice: "",
			maxPrice: "",
			postedSince: "",
			selectedLocation: null,
		});
		setIsLoading(true)
		GetFeturedListingsApi({
			offset: offsetdata.toString(),
			limit: limit.toString(),
			current_user: isLoggedIn ? userCurrentId : "",
			onSuccess: (response) => {
				setTotal(response.total);
				const propertyData = response.data;
				setIsLoading(false);
				setCategoryListByPropertyData(propertyData);
			},
			onError: (error) => {
				setIsLoading(true);
				console.log(error);
			}
		}
		);
	};

	useEffect(() => {

	}, [clearfilterLocation])

	return (
		<Layout stikyNav={true}>
			<div className="my-12">
				<div className="container">
					<h1 className='capitalize text-2xl xl:text-3xl mb-9'>properties for rent</h1>

					<span className="border-b mt-6">
						{/* {CategoryListByPropertyData.length} Data Found */}
					</span>
					{/* {CategoryListByPropertyData && CategoryListByPropertyData.length > 0 ? <GridCard total={total} setGrid={setGrid} /> : null} */}


					{CategoryListByPropertyData ? (
						// Data is available
						CategoryListByPropertyData.length > 0 ? (
							<div className="grid grid-cols-4  gap-4">
								{CategoryListByPropertyData.map((ele, index) => (
									<div className="" key={index}>
										<Link href="/properties-details/[slug]" as={`/properties-details/${ele.slug_id}`} passHref>
											<VerticalCard ele={ele} />
										</Link>
									</div>
								))}
							</div>
						) : (
							// No data found
							<div className="noDataFoundDiv">
								<NoData />
							</div>
						)
					) : (
						// Data is still loading
						<div className="p text-center my-12">Loading ...</div>
					)}

					{total > limit ? (
						<div className="col-12">
							<Pagination pageCount={Math.ceil(total / limit)} onPageChange={handlePageChange} />
						</div>
					) : null}
				</div>
			</div>
		</Layout>
	)
}

export default Rent
