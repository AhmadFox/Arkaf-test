"use client"
import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import { translate } from "@/utils";
import { userSignUpData } from "@/store/reducer/authSlice";
import { languageData } from "@/store/reducer/languageSlice";
import { settingsData } from "@/store/reducer/settingsSlice";
import { GetFacilitiesApi, PostProperty } from "@/store/actions/campaign";
import { categoriesCacheData, loadCategories } from "@/store/reducer/momentSlice";

import { useDropzone } from "react-dropzone";
import { Autocomplete } from "@react-google-maps/api";
import GoogleMapBox from "../Location/GoogleMapBox";

import SelectCategory from "../ui/SelectCategory";
import SelectOptions from "../ui/SelectOptions";
import InputNumber from "../ui/InputNumber";
import Datepicker from "../ui/Datepicker";
import LocationSearchBox from "../Location/LocationSearchBox";
import ImageDropZone from "../ui/ImageDropZone";
import ProperetyGellary from "./ProperetyGellary";
import SubmitButton from "../AuthForms/SubmitButton";

const inputStyle = `
    p-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]
`;

const AddProperty = () => {

    const router = useRouter();
	const [ showLoader, setShowLoader] = useState(false)
    const [formData, setFormData] = useState({});
    const categorydata = useSelector(categoriesCacheData);

    const handleInputChange = (field, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [field]: value,
        }));
    };

	const handelTitleImage = (value) => {
		setFormData(prevFormData => ({
            ...prevFormData,
            'titleImage': value,
        }));
	}
	
	const handelGellaryImage = (value) => {
		setFormData(prevFormData => ({
            ...prevFormData,
            'galleryImages': value,
        }));
	}
    const handleLocationSelected = value => handleInputChange('selectedLocation', value);
    const handleInputSize = value => handleInputChange('size', value);
    const handleInputCategory = value => handleInputChange('categoryId', value);
    const handleInputBeds = value => handleInputChange('beds', value);
    const handleInputBaths = value => handleInputChange('baths', value);
    const handleDateInput = value => handleInputChange('date', value);
    const handle360Viewer = value => handleInputChange('Viewer3D', value);
    const handleInputDescription = e => handleInputChange('description', e.target.value);
    const handleInputVideo = e => handleInputChange('video', e.target.value);
    const handleInputPrice = value => handleInputChange('price', value);

    useEffect(() => {
        loadCategories();
    }, []);
	

    const handlePostPropertyPublish = async (e) => {
        e.preventDefault();
		setShowLoader(true);
        console.log('Form selectedLocation ==>', formData.date);
		try {
			PostProperty({
				title: 'properety title',
				description: formData.description,
				city: formData.selectedLocation.city,
				latitude: formData.selectedLocation.lat,
				longitude: formData.selectedLocation.lng,
				country: formData.selectedLocation.country,
				address: formData.selectedLocation.formatted_address,
				price: formData.price,
				category_id: formData.categoryId,
				property_type: '1',
				parameters: [],
				title_image: formData.titleImage,
				gallery_images: formData.galleryImages,
				size: formData.size,
				threeD_image: formData.Viewer3D,
				rentduration: formData.date,
				video_link: formData.video,
				status: '1',
				onSuccess: async (response) => {
					toast.success(response.message);
					// router.push("/user/dashboard");
					setShowLoader(false);
				},
				onError: (error) => {
					toast.error(error);
					setShowLoader(false);
				}
			});
			
		} catch (error) {
			setShowLoader(false);
		    console.error("An error occurred:", error);
		    toast.error("An error occurred. Please try again later.");
		}
    };

	const handlePostPropertyDraft = async (e) => {
        e.preventDefault();
		setShowLoader(true);
        console.log('Form selectedLocation ==>', formData.date);
		try {
			PostProperty({
				title: 'properety title',
				description: formData.description,
				city: formData.selectedLocation.city,
				latitude: formData.selectedLocation.lat,
				longitude: formData.selectedLocation.lng,
				country: formData.selectedLocation.country,
				address: formData.selectedLocation.formatted_address,
				price: formData.price,
				category_id: formData.categoryId,
				property_type: '1',
				parameters: [],
				title_image: formData.titleImage,
				gallery_images: formData.galleryImages,
				size: formData.size,
				threeD_image: formData.Viewer3D,
				rentduration: formData.date,
				video_link: formData.video,
				status: '0',
				onSuccess: async (response) => {
					toast.success(response.message);
					// router.push("/user/dashboard");
					setShowLoader(false);
				},
				onError: (error) => {
					toast.error(error);
					setShowLoader(false);
				}
			});
			
		} catch (error) {
			setShowLoader(false);
		    console.error("An error occurred:", error);
		    toast.error("An error occurred. Please try again later.");
		}
    };

    return (
        <Fragment>
			<div className={`fixed w-full h-full z-[2] bg-white opacity-0 invisible ease-in-out duration-300 ${showLoader && '!visible !opacity-60'}`}></div>
            <div className='container mb-12 md:mb-20 xl:mb-32'>
                <div className="mb-12">
                    <ProperetyGellary
                        titleImageHandle={handelTitleImage}
                        galleryImageHandler={handelGellaryImage}
                    />
                </div>
                <form className="w-full">
                    <div className="grid grid-cols-3 gap-9">
                        <div className="col-span-3 xl:col-span-2 grid gap-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <InputNumber
                                        label={'sizeInputLabel'}
                                        placeholder={'Ex: 200'}
                                        onValueChange={handleInputSize}
                                    />
                                </div>
                                <div>
                                    <SelectCategory
                                        label={'type'}
                                        options={categorydata}
                                        onValueChange={handleInputCategory}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <SelectOptions
                                        label={'beds'}
                                        options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                                        onValueChange={handleInputBeds}
                                    />
                                </div>
                                <div>
                                    <SelectOptions
                                        label={'baths'}
                                        options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                                        onValueChange={handleInputBaths}
                                    />
                                </div>
                                <div>
                                    <Datepicker
										label="dateListing"
										onValueChange={handleDateInput}
									/>
                                </div>
                            </div>

                            <h2 className="text-2xl font-medium mb-2 mt-6">{translate('descriptionProperty')}</h2>
                            <div>
                                <textarea
                                    cols="30" rows="6"
                                    onChange={handleInputDescription}
                                    placeholder={translate('inputDescription')}
                                    className="w-full border outline-none shadow-none p-3 rounded-lg"
                                ></textarea>
                            </div>

                            <div className="flex justify-between items-center mt-6">
                                <h2 className="text-2xl font-medium mb-2">{translate('addContactInfo')}</h2>
                                <button className="tw-btn-outline !px-7 !text-sm">{translate('addContact')}</button>
                            </div>

                            <div>
                                <h2 className="text-2xl font-medium mb-2 mt-6">{translate('Address')}</h2>
                                <LocationSearchBox
                                    onLocationSelected={handleLocationSelected}
                                    initialLatitude={''}
                                    initialLongitude={''}
                                    className={inputStyle}
                                />
                            </div>

                            <div className="flex justify-between items-center mt-6">
                                <h2 className="text-2xl font-medium mb-2">{translate('addLayoutProperty')}</h2>
                                <button className="tw-btn-outline !px-7 !text-sm">{translate('addLayout')}</button>
                            </div>

                            <div className="my-6">
                                <h2 className="text-2xl font-medium mb-4">{translate('addVideo')}</h2>
                                <input
                                    type="url"
                                    onChange={handleInputVideo}
                                    className={inputStyle}
                                    placeholder={translate('youTubeLink')}
                                />
                            </div>

                            <div className="my-6">
                                <h2 className="text-2xl font-medium mb-4">{translate('add360TourView')}</h2>
                                <ImageDropZone
                                    onValueChange={handle360Viewer}
                                    btnDisclamer={true}
                                    height="min-h-[380px]"
                                />
                            </div>

                            <div className="flex justify-between items-center my-16">
                                <h2 className="text-2xl font-medium mb-2">{translate('propertyStagingService')}</h2>
                                <button className="tw-btn-outline !px-7 !text-sm">{translate('requestService')}</button>
                            </div>
                        </div>

                        <div className="col-span-3 xl:col-span-1">
                            <div className="sticky top-6 p-4 rounded-lg bg-[#F8FAFB]">
                                <InputNumber
                                    label={'price'}
                                    placeholder={'enterPriceProperty'}
                                    onValueChange={handleInputPrice}
                                    className="text-3xl font-medium border-0 bg-transparent ps-0"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="sticky bottom-0 bg-white border-t">
                <div className="container">
                    <div className="flex justify-between py-3">
                        <p className="flex items-center gap-2 text-[#272835]">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M3.46257 2.43262C5.21556 0.91688 7.5007 0 10 0C15.5228 0 20 4.47715 20 10C20 12.1361 19.3302 14.1158 18.1892 15.7406L15 10H18C18 5.58172 14.4183 2 10 2C7.84982 2 5.89777 2.84827 4.46023 4.22842L3.46257 2.43262ZM16.5374 17.5674C14.7844 19.0831 12.4993 20 10 20C4.47715 20 0 15.5228 0 10C0 7.86386 0.66979 5.88416 1.8108 4.25944L5 10H2C2 14.4183 5.58172 18 10 18C12.1502 18 14.1022 17.1517 15.5398 15.7716L16.5374 17.5674Z" fill="#272835" />
                            </svg>
                            {translate('lastSavedOn')} 14 February 2024 12:33 */}
                        </p>
                        <div className="flex gap-2">
							<SubmitButton
								caption="saveDraft"
								loading={showLoader}
								disabled={showLoader}
								className="tw-btn-outline w-40" 
								onClick={handlePostPropertyDraft}
							/>
							<SubmitButton
								caption="publish"
								loading={showLoader}
								disabled={showLoader}
								className="tw-btn-solid w-40" 
								onClick={handlePostPropertyPublish}
							/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default AddProperty;
