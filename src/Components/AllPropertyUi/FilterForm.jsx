import React, { useEffect, useState } from "react";
import { translate } from "@/utils";
import { ButtonGroup } from "react-bootstrap";
import { RiSendPlane2Line } from "react-icons/ri";
import LocationSearchBox from "../Location/LocationSearchBox";
import { categoriesCacheData } from "@/store/reducer/momentSlice";

const FiletrForm = (props) => {


    return (
        <div className="border p-4 rounded-lg sticky top-24">
            <div className="flex justify-between items-center border-b pb-2" id="">
                <span className="font-medium text-lg">{translate("filter")}</span>
                <button className="tw-btn-outline py-2" onClick={props.handleClearFilter}>{translate("clear")}</button>
            </div>
            <div className="card-body">
                <div className="filter-button-box">
                    <ButtonGroup id="propertie_button_grup">
                        <ul className="nav nav-tabs" id="props-tabs">
                            <li className="">
                                <a className={`nav-link ${props.filterData.propType === 0 ? "bg-[#b9f2ff]" : ""}`} aria-current="page" id="prop-sellbutton" onClick={() => props.handleTabClick("0")}>
                                    {translate("forSell")}
                                </a>
                            </li>
                            <li className="">
                                <a className={`nav-link ${props.filterData.propType === 1 ? "active" : ""}`} onClick={() => props.handleTabClick("1")} aria-current="page" id="prop-rentbutton">
                                    {translate("forRent")}
                                </a>
                            </li>
                        </ul>
                    </ButtonGroup>
                </div>

                {!props.cateName && (
                    <div className="prop-type">
                        <span>{translate("propTypes")}</span>
                        <select className="form-select" aria-label="Default select" name="category" value={props.filterData.category} onChange={props.handleInputChange}>
                            <option value="">{translate("selectPropType")}</option>
                            {/* Add more options as needed */}
                            {props.getCategories &&
                                props.getCategories?.map((ele, index) => (
                                    <option key={index} value={ele.id}>
                                        {ele.category}
                                    </option>
                                ))}
                        </select>
                    </div>
                )}
                {!props.cityName && (
                    <div className="prop-location">
                        <span>{translate("selectYourLocation")}</span>
                        <LocationSearchBox onLocationSelected={props.handleLocationSelected} selectedLocation={props?.selectedLocation} clearfilterLocation={props?.clearfilterLocation}/>
                    </div>
                )}
                <div className="budget-price">
                    <span>{translate("budget")}</span>
                    <div className="budget-inputs">
                        <input className="price-input" type="number" placeholder="Min Price" name="minPrice" value={props.filterData.minPrice} onChange={props.handleInputChange} />
                        <input className="price-input" type="number" placeholder="Max Price" name="maxPrice" value={props.filterData.maxPrice} onChange={props.handleInputChange} />
                    </div>
                </div>
                <div className="posted-since">
                    <span>{translate("postedSince")}</span>
                    <div className="posted-duration">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="anytime" checked={props.filterData.postedSince === "anytime"} onChange={props.handlePostedSinceChange} />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                {translate("anytime")}
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="lastWeek" checked={props.filterData.postedSince === "lastWeek"} onChange={props.handlePostedSinceChange} />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                {translate("lastWeek")}
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="yesterday" checked={props.filterData.postedSince === "yesterday"} onChange={props.handlePostedSinceChange} />
                            <label className="form-check-label" htmlFor="flexRadioDefault3">
                                {translate("yesterday")}
                            </label>
                        </div>
                    </div>
                </div>
                <div className="apply-filter" onClick={props.handleApplyfilter}>
                    <RiSendPlane2Line size={25} />
                    <button id="apply-filter-button">{translate("applyFilter")}</button>
                </div>
            </div>
        </div>
    );
};

export default FiletrForm;
