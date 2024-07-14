"use client";
import React, { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { FiSearch } from "react-icons/fi";
import { translate } from "@/utils";

const inputStyle = `
    p-2.5 shadow-none rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]
`;

const Filer = ({ onSelectLocation }) => {
    const [filters, setFilters] = useState({ city: "", state: "", type: "", lat: null, lng: null });
    const autocompleteRef = useRef(null);
    const [searchText, setSearchText] = useState("");

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleClearLocation = (e) => {
        e.preventDefault();
        setSearchText("");
        setFilters({ city: "", state: "", type: "", lat: null, lng: null });
        onSelectLocation({ city: "", state: "", type: "", lat: null, lng: null });
    };

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    };

    const handlePlaceSelect = () => {
        if (autocompleteRef.current && searchText.trim() !== "") {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry) {
                const formatted_address = place.formatted_address || "Address not available";
                const { city, state } = extractCityFromGeocodeResult(place);
                const updatedLocation = {
                    city,
                    state,
                    type: filters.type,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                setSearchText(formatted_address);
                setFilters(updatedLocation);
                onSelectLocation(updatedLocation);
            } else {
                console.error("No geometry available for selected place.");
            }
        } else {
            onSelectLocation(filters);
        }
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

    return (
        <nav className="col-span-12 sticky py-3 top-0 z-[3] border-b bg-white">
            <Autocomplete
                onLoad={(autocomplete) => {
                    autocompleteRef.current = autocomplete;
                }}
                onPlaceChanged={handlePlaceSelect}
            >
                <div className="container max-w-full xl:px-9">
                    <div className="grid grid-cols-12 gap-4 flex-grow-1">
                        <div className="col-span-4 flex items-center border rounded-lg ps-1 pe-3">
                            <input
                                className="border-0 shadow-none w-full"
                                placeholder={translate("Search by city, country")}
                                name="propertySearch"
                                value={searchText}
                                onChange={handleSearchTextChange}
                            />
                            <FiSearch size={20} />
                        </div>
                        <div className="col-span-2">
                            <select
                                name="type"
                                className={inputStyle}
                                onChange={handleFilterChange}
                                value={filters.type}
                            >
                                <option value="">{translate("all")}</option>
                                <option value="forSell">{translate("forSell")}</option>
                                <option value="forRent">{translate("forRent")}</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <select
                                name="price"
                                className={inputStyle}
                                onChange={handleFilterChange}
                                value={filters.price}
                            >
                                <option value="">{translate("price")}</option>
                                <option value="0-1000">$0 - $1000</option>
                                <option value="1000-2000">$1000 - $2000</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <select
                                name="bedsAndBaths"
                                className={inputStyle}
                                onChange={handleFilterChange}
                                value={filters.bedsAndBaths}
                            >
                                <option value="">{translate("Beds & Bath")}</option>
                                <option value="1-1">1 Bed, 1 Bath</option>
                                <option value="2-2">2 Beds, 2 Baths</option>
                            </select>
                        </div>
                        <div className="col-span-2 flex gap-3 items-center">
                            <button className="button button-outline w-[100px]" onClick={handleClearLocation}>
                                {translate("clear")}
                            </button>
                            <button className="button button-solid w-[100px]" onClick={handlePlaceSelect}>
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
