"use client";
import React, { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { FiSearch } from "react-icons/fi";
import { translate } from "@/utils";
import PriceRange from "./priceRange";

const inputStyle = `
    p-2.5 shadow-none rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]
`;

const Filer = ({ onSelectFilter }) => {

    const autocompleteRef = useRef(null);
    const [searchText, setSearchText] = useState("");
    const [ resetPriceRange, setResetPriceRange ] = useState(false);
    const [filters, setFilters] = useState({ 
        type: "", 
        max_price: "", 
        min_price: "", 
        property_type: "", 
        search: "", 
        parameter_id: "", 
        price_sort: "", 
        userid: "", 
        filter_type: "", 
        addressInfo: {
            city_id: "",  
            lat: null, 
            lng: null,
            city: "", 
            state: "", 
        }
     });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleClearFilter = (e) => {
        e.preventDefault();
        setSearchText("");
        setFilters({
            type: "", 
            max_price: "", 
            min_price: "", 
            property_type: "", 
            search: "", 
            parameter_id: "", 
            price_sort: "", 
            userid: "", 
            filter_type: "", 
            addressInfo: {
            city_id: "",  
            lat: null, 
            lng: null,
            city: "", 
            state: "", 
        }
        });
        onSelectFilter({ 
            type: "", 
            max_price: "", 
            min_price: "", 
            property_type: "", 
            search: "", 
            parameter_id: "", 
            price_sort: "", 
            userid: "", 
            filter_type: "", 
            addressInfo: {
                city_id: "",  
                lat: null, 
                lng: null,
                city: "", 
                state: "", 
            }
        });
        setResetPriceRange(!resetPriceRange)
    };

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleLocationSelect = () => {
        if (autocompleteRef.current && searchText.trim() !== "") {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry) {
                console.log('place', place);
                const formatted_address = place.formatted_address || "Address not available";
                const { city, state } = extractCityFromGeocodeResult(place);
                const address = {
                    city,
                    state,
                    type:filters.type,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                 };
                setSearchText(formatted_address);
                setFilters({...filters, addressInfo: address});
            } else {
                console.error("No geometry available for selected place.");
            }
        }
    };

    const handleFilterSelect = () => {
        onSelectFilter(filters);
    };

    const extractCityFromGeocodeResult = (place) => {
        const addressComponents = place.address_components;
        let city = "";
        let state = "";

        for (let i = 0; i < addressComponents.length; i++) {
            const component = addressComponents[i];
            if (component.types.includes("locality")) {
                city = component.long_name;
            }
            if (component.types.includes("administrative_area_level_1")) {
                state = component.long_name;
            }
        }

        return { city, state };
    };

    const applayPriceRange = (min, max) => {
        setFilters({ ...filters, 
            min_price: min,
            max_price: max
        });
    }

    return (
        <nav className="col-span-12 sticky py-3 top-0 z-[3] border-b bg-white">
            <Autocomplete
                onLoad={(autocomplete) => {
                    autocompleteRef.current = autocomplete;
                }}
                onPlaceChanged={handleLocationSelect}
            >
                <div className="container max-w-full xl:px-9">
                    <div className="grid grid-cols-12 gap-4 flex-grow-1">
                        <div className="col-span-4 flex items-center border rounded-lg ps-1 pe-3">
                            <input
                                className="border-0 shadow-none w-full"
                                placeholder={translate("Search by city, country")}
                                name="search"
                                value={searchText}
                                onChange={handleSearchTextChange}
                            />
                            <FiSearch size={20} />
                        </div>
                        <div className="col-span-2">
                            <select
                                name="property_type"
                                className={inputStyle}
                                onChange={handleFilterChange}
                                value={filters.property_type}
                            >
                                <option value="">{translate("all")}</option>
                                <option value={0}>{translate("forSell")}</option>
                                <option value={1}>{translate("forRent")}</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <PriceRange reset={resetPriceRange} setPriceRange={applayPriceRange} />
                        </div>
                        <div className="col-span-2">
                            <select
                                name="parameter_id"
                                className={inputStyle}
                                onChange={handleFilterChange}
                                value={filters.parameter_id}
                            >
                                <option value="" disabled>{translate("Beds & Bath")}</option>
                                <option value="1">Bed</option>
                                <option value="2">Baths</option>
                            </select>
                        </div>
                        <div className="col-span-2 flex gap-3 items-center">
                            <button className="button button-outline w-[100px]" onClick={handleClearFilter}>
                                {translate("clear")}
                            </button>
                            <button className="button button-solid w-[100px]" onClick={handleFilterSelect}>
                                {translate("apply")}
                            </button>
                        </div>
                    </div>
                </div>
            </Autocomplete>
        </nav>
    );
};

export default Filer;
