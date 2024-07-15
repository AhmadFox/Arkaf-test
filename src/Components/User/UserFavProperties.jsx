"use client"
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetFavPropertyApi } from "@/store/actions/campaign";
import VerticalCardSkeleton from "@/Components/Skeleton/VerticalCardSkeleton";
import VerticalCard from "@/Components/Cards/VerticleCard";
import Link from "next/link";
import { languageData } from "@/store/reducer/languageSlice";
import { translate } from "@/utils";
import NoData from "@/Components/NoDataFound/NoData";
import dynamic from "next/dynamic.js";
import TablePagination from "../Pagination/TablePagination.jsx";
import ReactPagination from "@/Components/Pagination/ReactPagination";
import UserLayout from "../Layout/UserLayout.jsx";


const UserFavProperties = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [getFavProp, setGetFavProp] = useState([]);
    const [offsetdata, setOffsetdata] = useState(0);
    const limit = 8;
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
    const isLoggedIn = useSelector((state) => state.User_signup);
    const userCurrentId = isLoggedIn && isLoggedIn.data ? isLoggedIn.data.data.id : null;
    const lang = useSelector(languageData);

    useEffect(() => { }, [lang]);
    useEffect(() => {
        GetFavPropertyApi(
            offsetdata.toString(),
            limit.toString(),
            (response) => {
                setTotal(response.total);
                const favPropData = response.data;
                setIsLoading(false);
                setGetFavProp(favPropData);
                updateIndices(offsetdata, response.total);
            },
            (error) => {
                console.log(error);
            }
        );
    }, [offsetdata]);

    const removeCard = (cardId) => {
        const updatedFavProp = getFavProp.filter((ele) => ele.id !== cardId);
        setGetFavProp(updatedFavProp);
    };

    const handlePageChange = (selectedPage) => {
        const newOffset = selectedPage.selected * limit;
        setOffsetdata(newOffset);
        updateIndices(newOffset, total);
        window.scrollTo(0, 0);
    };
    const updateIndices = (newOffset, total) => {
        const newStartIndex = total > 0 ? newOffset * limit + 1 : 0;
        const newEndIndex = Math.min((newOffset + 1) * limit, total);
        setStartIndex(newStartIndex);
        setEndIndex(newEndIndex);
    };

    return (
        <UserLayout>
            <div className="container">
                <div className="border rounded-xl overflow-hidden">
                    <div className="border-b py-3 px-4">
                        <h3 className="text-xl md:text-2xl">{translate("favoriteList")}</h3>
                    </div>
                    <div className="py-4 px-4">
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {isLoading ? (
                                Array.from({ length: 6 }).map((_, index) => (
                                    <VerticalCardSkeleton key={index}/>
                                ))
                            ) : (
                                <Fragment>
                                    {getFavProp?.length > 0 ? (
                                        <Fragment>
                                            {getFavProp?.map((ele, index) => (
                                                <Link key={index} href="/properties-details/[slug]" as={`/properties-details/${ele.slug_id}`} passHref>
                                                    <VerticalCard ele={ele} removeCard={removeCard} />
                                                </Link>
                                            ))}
                                        </Fragment>
                                    ) : (
                                        <div className="col-span-3 my-12">
                                            <div className="flex justify-center">
                                                <NoData />
                                            </div>
                                        </div>
                                    )}
                                </Fragment>
                            )}
                        </div>
                    </div>
                    <div className="px-4 py-8 border-t">  
                        <ReactPagination pageCount={Math.ceil(total / limit)} onPageChange={handlePageChange} s />
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default UserFavProperties;
