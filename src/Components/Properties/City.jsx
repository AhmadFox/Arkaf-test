"use client"
import React, { useState, useEffect } from 'react'
import Link from "next/link";
import Breadcrumb from "@/Components/Breadcrumb/Breadcrumb";
import VerticalCard from "@/Components/Cards/VerticleCard";
import FilterForm from "@/Components/AllPropertyUi/FilterForm";
import { useRouter } from "next/router";
import GridCard from "@/Components/AllPropertyUi/GridCard";
import AllPropertieCard from "@/Components/AllPropertyUi/AllPropertieCard";
import { GetFeturedListingsApi } from "@/store/actions/campaign";
import CustomHorizontalSkeleton from "@/Components/Skeleton/CustomHorizontalSkeleton";
import { languageData } from "@/store/reducer/languageSlice";
import { useSelector } from "react-redux";
import Pagination from "@/Components/Pagination/ReactPagination";
import NoData from "@/Components/NoDataFound/NoData";
import { categoriesCacheData } from "@/store/reducer/momentSlice";
import Layout from '../Layout/Layout';

const City = () => {

    const [grid, setGrid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [CategoryListByPropertyData, setCategoryListByPropertyData] = useState();

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

    const router = useRouter();

    const city = router.query;
    const isLoggedIn = useSelector((state) => state.User_signup);
    const userCurrentId = isLoggedIn && isLoggedIn.data ? isLoggedIn.data.data.id : null;

    const lang = useSelector(languageData);
    const Categorydata = useSelector(categoriesCacheData);

    useEffect(() => { }, [lang]);
    useEffect(() => { }, [grid]);

    useEffect(() => {
        setIsLoading(true);

        GetFeturedListingsApi({
            city_id: city.slug,
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
                setIsLoading(false);
                console.log(error);
            }
        });
    }, [offsetdata, isLoggedIn]);

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

    const handleApplyfilter = (e) => {
        e.preventDefault();

        // Determine the value for the postedSince parameter based on filterData.postedSince
        let postedSinceValue = "";
        if (filterData.postedSince === "yesterday") {
            postedSinceValue = "0";
        } else if (filterData.postedSince === "lastWeek") {
            postedSinceValue = "1";
        }

        GetFeturedListingsApi({
            category_id: filterData ? filterData?.category : "",
            city: city,
            offset: offsetdata.toString(),
            limit: limit.toString(),
            current_user: isLoggedIn ? userCurrentId : "",
            property_type: filterData ? filterData?.propType : "",
            max_price: filterData ? filterData?.maxPrice : "",
            min_price: filterData ? filterData?.minPrice : "",
            posted_since: postedSinceValue,
            onSuccess: (response) => {
                setTotal(response.total);
                const propertyData = response.data;
                setCategoryListByPropertyData(propertyData);
                setIsLoading(false);
                // handleClearFilter()
            },
            onError: (error) => {
                setIsLoading(false);
                console.log(error);
            }
        });
    };
    const handleClearFilter = () => {
        setFilterData({
            propType: "",
            category: "",
            minPrice: "",
            maxPrice: "",
            postedSince: "",
            selectedLocation: null,
        });
        GetFeturedListingsApi({
            city_id: city.slug,
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
                setIsLoading(false);
                console.log(error);
            }
        }
        );
    };

    return (
        <Layout stikyNav={true}>
            {/* <Breadcrumb title={city.slug ? `Properties Listed in ${city.slug} ` : `No Properties in ${city.slug}`} /> */}

            <div id="" className='py-12'>
                <div className="container">
                    <div className="grid grid-cols-12 gap-9">
                        <div className="col-span-3">
                            <FilterForm
                                filterData={filterData}
                                getCategories={Categorydata}
                                handleInputChange={handleInputChange}
                                handleTabClick={handleTabClick}
                                handlePostedSinceChange={handlePostedSinceChange}
                                cityName={city.slug}
                                handleApplyfilter={handleApplyfilter}
                                handleClearFilter={handleClearFilter}
                            />
                        </div>
                        <div className="col-span-9">
                            <div className="all-prop-rightside">
                               <div className="border-b pb-3"> {CategoryListByPropertyData && CategoryListByPropertyData.length > 0 ? `${total} Properties found` : ''}</div>
                                {CategoryListByPropertyData && CategoryListByPropertyData.length > 0 ? (
                                    <div id="columnCards">
                                        <div className="row" id="all-prop-col-cards">
                                            {CategoryListByPropertyData.map((ele, index) => (
                                                <div className="col-12 col-md-6 col-lg-4" key={index}>
                                                    <Link href="/properties-details/[slug]" as={`/properties-details/${ele.slug_id}`} passHref>
                                                        <VerticalCard ele={ele} />
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="noDataFoundDiv">
                                        <NoData />
                                    </div>
                                )}

                                {total > limit ? (
                                    <div className="col-12">
                                        <Pagination pageCount={Math.ceil(total / limit)} onPageChange={handlePageChange} />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default City
