import React, { useState, useEffect } from "react";
import axios from "axios";
import { GET_SEO_SETTINGS } from "@/utils/api";
import Meta from "@/Components/Seo/Meta";
import Layout from "@/Components/Layout/Layout";
import { translate } from "@/utils";
import VerticalCard from "@/Components/Cards/VerticleCard";
import Link from "next/link";
import { getNearbyPropertiesApi } from "@/store/actions/campaign";
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

const Index = ({ seoData, currentURL, initialProperties }) => {
	const GoogleMapApi = process.env.NEXT_PUBLIC_GOOGLE_API;

	const [properties, setProperties] = useState(initialProperties || []);
	const [locationFilters, setLocationFilters] = useState({ city: "", state: "", type: "" });

	const fetchProperties = async (filters) => {
		try {
			const fetchedProperties = await getNearbyPropertiesApi(filters);
			setProperties(fetchedProperties.filter(property => property !== undefined));
		} catch (error) {
			console.error("Error fetching nearby properties:", error);
			setProperties([]);
		}
	};

	const handleLocationSelect = (filters) => {
		// console.log('filters', filters);
		setLocationFilters(filters);
		fetchProperties(filters);
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
					<Filer onSelectLocation={handleLocationSelect} />
					<div className="col-span-7">
						<div className="sticky top-[77px]">
							<PropertiesOnMap
								apiKey={GoogleMapApi}
								data={properties}
								latitude={locationFilters.lat}
								longitude={locationFilters.lng}
							/>
						</div>
					</div>
					<div className="col-span-5 p-4 pt-0">
						<div className="flex flex-col gap-2 sticky pt-4 top-[77px] bg-white z-[2] mb-3 border-b">
							<ul className="flex gap-2 flex-wrap">
								<li className="py-2 px-3 border rounded-3xl text-sm">{translate('all')}</li>
								<li className="py-2 px-3 border rounded-3xl text-sm">{translate('Top Villa')}(255)</li>
								<li className="py-2 px-3 border rounded-3xl text-sm">{translate('Free Cancelation')}(10)</li>
							</ul>
							<div className="flex justify-between items-center">
								<span>{properties.length} {translate('result')}</span>
								<div className="flex items-center gap-1">
									<label htmlFor="">{translate('sort')} : </label>
									<select name="" id="" className="border-0 shadow-none">
										<option value="">Homes for You</option>
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
	const { city = "", state = "", type = "" } = context.query;

	let seoData = null;
	let currentURL = null;

	if (process.env.NEXT_PUBLIC_SEO === "true") {
		const { req } = context;
		currentURL = `${process.env.NEXT_PUBLIC_WEB_URL}/properties-on-map/`;
		seoData = await fetchDataFromSeo(req.url);
	}

	let properties = [];
	try {
		properties = await getNearbyPropertiesApi({ city, state, type });
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
		},
	};
}

export default Index;
