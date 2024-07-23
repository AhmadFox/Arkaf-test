import React, { useState, useEffect } from "react";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

import { translate } from "@/utils";
import { GET_SEO_SETTINGS } from "@/utils/api";

import { getNearbyPropertiesApi } from "@/store/actions/campaign";

import Meta from "@/Components/Seo/Meta";
import Layout from "@/Components/Layout/Layout";
import VerticalCard from "@/Components/Cards/VerticleCard";
import PropertiesOnLocationMap from "@/Components/Location/PropertiesOnLocationMap";
import Filer from "@/Components/Navbar/Filer";
import PropertiesOnMap from "@/Components/Location/PropertiesOnMap";

// This is seo api
const fetchDataFromSeo = async (page) => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_END_POINT}${GET_SEO_SETTINGS}?page=properties-on-map`
		);

		const SEOData = response.data;

		return SEOData;
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
};

const Index = ({ seoData, currentURL, initialProperties, initialFilters }) => {

    const router = useRouter();
    const GoogleMapApi = process.env.NEXT_PUBLIC_GOOGLE_API;
    
    const [properties, setProperties] = useState(initialProperties || []);
    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        fetchProperties(filters);
    }, [filters]);

	useEffect(() => {
		setFilters(initialFilters)
	}, [initialFilters])

    const fetchProperties = async (filters) => {
        try {
            const fetchedProperties = await getNearbyPropertiesApi(filters);
            setProperties(fetchedProperties.filter(property => property !== undefined));
        } catch (error) {
            console.error("Error fetching nearby properties:", error);
        }
    };

    const handleFiltersSelect = (filters) => {
        setFilters(filters);
        router.push({
            pathname: '/properties-on-map',
            query: filters
        });
    };

    return (
        <>
            <Meta
                title={seoData?.data && seoData.data.length > 0 && seoData.data[0]?.meta_title}
                description={seoData?.data && seoData.data.length > 0 && seoData.data[0]?.meta_description}
                keywords={seoData?.data && seoData.data.length > 0 && seoData.data[0]?.meta_keywords}
                ogImage={seoData?.data && seoData.data.length > 0 && seoData.data[0]?.meta_image}
                pathName={currentURL}
            />

            <Layout stikyNav={false}>
                <div className="grid grid-cols-12">
                    <Filer onSelectFilter={handleFiltersSelect} initialFilters={initialFilters} />
                    <div className="col-span-7">
                        <div className="sticky top-[77px]">
                            <PropertiesOnMap
                                apiKey={GoogleMapApi}
                                data={properties}
                                latitude={filters.lat}
                                longitude={filters.lng}
                            />
                        </div>
                    </div>
                    <div className="col-span-5 p-4 pt-0">
                        <div className="flex flex-col gap-2 sticky pt-4 top-[77px] bg-white z-[2] mb-3 border-b">
                            <div className="flex justify-between items-center">
                                <span>{properties.length} {translate('result')}</span>
                                <div className="flex items-center gap-1">
                                    <label htmlFor="">{translate('sort')} : </label>
                                    <select name="" id="" className="border-0 shadow-none" value={filters.price_sort} onChange={(e) => setFilters({ ...filters, price_sort: e.target.value })}>
                                        <option value="asc">Price high to low</option>
                                        <option value="desc">Price low to high</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            {properties.map((ele, index) => (
                                <Link key={index} target="_blank" href="/properties-details/[slug]" as={`/properties-details/${ele.slug_id}`} passHref>
                                    <VerticalCard ele={ele} horizontal={true} withButtons={false} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};


export async function getServerSideProps(context) {
    const { 
		city = "", 
		type = "", 
		max_price = "", 
		min_price = "", 
		property_type = "", 
		search = "", 
		parameter_id = "", 
		price_sort = "desc", 
		userid = "", 
		filter_type = "", 
		city_id = "", 
	 } = context.query;

    let seoData = null;
    let currentURL = null;

    if (process.env.NEXT_PUBLIC_SEO === "true") {
        const { req } = context;
        currentURL = `${process.env.NEXT_PUBLIC_WEB_URL}properties-on-map/`;
        seoData = await fetchDataFromSeo(req.url);
    }

    let properties = [];
    try {
        properties = await getNearbyPropertiesApi({ 
			city,
			type,
			max_price,
			min_price,
			property_type,
			search,
			parameter_id,
			price_sort,
			userid,
			filter_type,
			city_id,
		 });
    } catch (error) {
        console.error("Error fetching nearby properties:", error);
        properties = [];
    }

    properties = properties.filter(property => property !== undefined);

    return {
        props: {
            seoData: seoData || null,
            currentURL: currentURL || '',
            initialProperties: properties,
            initialFilters: { 
				city,
				type,
				max_price,
				min_price,
				property_type,
				search,
				parameter_id,
				price_sort,
				userid,
				filter_type,
				city_id,
			 },
        },
    };
}


export default Index;