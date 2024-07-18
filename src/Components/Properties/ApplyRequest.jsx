'use client'
import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { translate } from "@/utils";
import { PostAdditionRequest, PostPropertyRequest } from "@/store/actions/campaign";
import { categoriesCacheData, loadCategories } from "@/store/reducer/momentSlice";

import RadioRow from "../ui/RadioRow";
import InputText from "../ui/InputText";
import ButtonGroup from "../ui/ButtonGroup";
import InputTel from "../ui/InputTel";
import InputNumber from "../ui/InputNumber";
import SelectCategory from "../ui/SelectCategory";
import LocationSearchBox from "../Location/LocationSearchBox";
import GoogleMapBox from "../Location/GoogleMapBox";
import SubmitButton from "../AuthForms/SubmitButton";

import RequistBanner from "@/assets/request_banner.png"
import SuccessBanner from "@/assets/Images/success_requist.png"
import SelectOptions from "../ui/SelectOptions";

const ApplyRequest = ({ type }) => {

	// Init Google Map
	const GoogleMapApi = process.env.NEXT_PUBLIC_GOOGLE_API;

	// Handiling UI 
	const router = useRouter();
	const [ selectedOption, setSelectedOption ] = useState('sell');
	const [ loading, setLoading ] = useState(false);
	const [ disabled, setDisabled ] = useState(true);
	const [ back, setBack ] = useState(true);
	const [tab, setTab] = useState(
		type === 'post' ? 1 :
		type === 'request' ? 2 : 3
	);

	const handelContinue = async (e) => {
		switch (true) {
			case formData.requistBy === 3:
				router.push('/user/properties/');
				return;
	
			case tab === 1:
				setTab(2);
				setBack(false);
				return;
	
			case tab === 3:
				router.push('/');
				return;
	
			default:
				break;
		}
	
		setLoading(true);
		setDisabled(true);
	
		try {
			switch (type) {
				case "post":
					await PostAdditionRequest({
						category_id: formData.categoryId,
						property_type: formData.requistType === 'sell' ? '0' : '1',
						size: formData.size,
						full_name: formData.name,
						phone_number: formData.phone,
						rentduration: formData.duration,
						address: formData.location.city,
						latitude: formData.location.lat,
						longitude: formData.location.lng,
						onSuccess: async (response) => {
							toast.success(response.message);
							setTab(3);
							setLoading(false);
						},
						onError: (error) => {
							toast.error(error);
							setLoading(false);
							setDisabled(false);
						}
					});
					break;
	
				case "request":
					await PostPropertyRequest({
						category_id: formData.categoryId,
						property_type: formData.requistType === 'sell' ? '0' : '1',
						size: formData.size,
						full_name: formData.name,
						phone_number: formData.phone,
						rentduration: formData.duration,
						address: formData.location.city,
						max_price: formData.maxPrice,
						onSuccess: async (response) => {
							toast.success(response.message);
							setTab(3);
							setLoading(false);
							setDisabled(false);
						},
						onError: (error) => {
							toast.error(error);
							setLoading(false);
							setDisabled(false);
						}
					});
					break;
	
				default:
					setLoading(false);
					setDisabled(false);
					toast.error("Invalid request property");
					break;
			}
		} catch (error) {
			setLoading(false);
			setDisabled(false);
			toast.error("An error occurred. Please try again later.");
		}
	};
	

	const handelBack = () => {
		setTab(1);
		setBack(true)
	}

	// Handeling api
	const categorydata = useSelector(categoriesCacheData);
	const [ formData, setFormData] = useState({
		requistType: 'sell',
		location: {
			lat: "",
			lng: "",
			city: "",
			state: "",
			country: "",
			address: ""
		}
	});

	const handelFormData = (field, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [field]: value,
        }));
		field !== 'requistBy' ? setDisabled(false): null
    };

	const handleLocationSelect = (address) => {
		setFormData(prevData => ({
			...prevData,
			location: {
				lat: address?.lat,
				lng: address?.lng,
				city: address?.city,
				state: address?.state,
				country: address?.country,
				address: address?.address
			}
		}));
	}

	const handelName = (isValid, value) => handelFormData('name', value);
	const handelMaxPrice = (isValid, value) => handelFormData('maxPrice', value);
	const handelSize = (isValid, value) => handelFormData('size', value);
	const handelPhone = (isValid, value) => handelFormData('phone', value);
	const handelRequestBy = value => handelFormData('requistBy', value);
	const handleCategory = value => handelFormData('categoryId', value);
	const handleInputDuration = value => handelFormData('duration', value);

	const handelRequestType = (value) => {
		setSelectedOption(value)
		handelFormData('requistType', value);
	}

	// Effect for load categorys
    useEffect(() => {
        loadCategories();
    }, []);

	// Effect for change button disabled state
	useEffect(() => {

		formData.requistBy && setDisabled(false)
		tab === 2 && setDisabled(true)

    }, [formData.requistBy, tab]);


	return (
		<Fragment>
			<div className="grid grid-cols-12" style={{ height: tab === 3 && '100%' }}>
				<div className={`h-full ${tab === 3 ? 'col-span-12' : 'col-span-8'} w-8/12 mx-auto`}>
					<div className="container h-full">
						<div className="py-12 mt-9 h-full">
							<div className={`${tab === 1 ? '' : 'hidden'}`}>
								<h1 className="text-3xl font-medium text-center mb-2">{translate('choosePost')}</h1>
								<p className="text-center text-lg">{translate('addAnotherAccount')}</p>
								<div className="my-9">
									<RadioRow type={type} sendSelectedOption={handelRequestBy} />
								</div>
							</div>
							<div className={`${tab === 2 ? '' : 'hidden'}`}>
								<h1 className="text-3xl font-medium text-center mb-2">{translate('applyRequest')}</h1>
								<p className="text-center text-lg">{translate('addAnotherAccount')}</p>
								<div className="grid grid-cols-2 gap-4 my-9">
									<div className="col-span-2">
										<ButtonGroup
											label="propertyType"
											options={['sell', 'rent']}
											name="example"
											selectedOption={formData.requistType}
											onChange={handelRequestType}
										/>
									</div>
									{
										selectedOption === 'rent' &&
										<div className="col-span-2">
											<SelectOptions
												label={'duration'}
												options={['daily', 'monthly', 'yearly', 'qruarterly']}
												onValueChange={handleInputDuration}
											/>
										</div>
									}
									<div className="">
										<InputText
											label={'fullName'}
											onValueChange={handelName}
											placeholder={'Ex: Zuko Karlsfeni'}
										/>
									</div>
									<div className="">
										<InputTel
											label={'phoneNumber'}
											onValueChange={handelPhone}
											className='py-1'
											placeholder={'Ex: Zuko Karlsfeni'}
										/>
									</div>
									<div className="">
										<InputNumber
											label={'Size (sqm)'}
											onValueChange={handelSize}
											placeholder={'Ex:200'}
										/>
									</div>
									<div className="">
										<SelectCategory
											label={'type'}
											value={0}
											options={categorydata}
											onValueChange={handleCategory}
										/>
									</div>
									{
										type === 'request' &&
										<div className="">
											<InputNumber
												label={'maxPrice'}
												onValueChange={handelMaxPrice}
												placeholder={'Ex:20,000'}
											/>
										</div>
									}
								
									<Fragment>
										<div className={`${type === 'request' ? 'col-span-1' : 'col-span-2'}`}>
											<label className='d-block mb-1 text-[#272835] text-sm'>{translate('location')}</label>
											<LocationSearchBox
												placeholder={'CityNeighborhood'}
												onLocationSelected={handleLocationSelect}
												initialLatitude={formData.location.lat}
												initialLongitude={formData.location.lng}
											/>
										</div>
										{ type === 'post' ?
											<div className="col-span-2">
												<GoogleMapBox
													apiKey={GoogleMapApi}
													onSelectLocation={handleLocationSelect}
													latitude={formData.location.lat}
													longitude={formData.location.lng}
												/>
											</div>: null
										}
									</Fragment>
									
								</div>
							</div>
							<div className={`h-full ${tab === 3 ? '' : 'hidden'}`}>
								<div className="flex flex-col gap-3 items-center justify-center">
									<Image
										src={SuccessBanner}
										alt="Success requist banner"
										width={''}
										height={''}
									/>
									<div className="text-center">
										<h1 className="font-medium text-3xl mb-2">
											{	
											type === "post" ?
												translate('Success Post Listing'):
												translate('Success Property Request')
											}
										</h1>
										<p className="opacity-50">{translate('Let’s start for next step with agents who contact you')}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={`col-span-4 relative ${tab === 3 && 'hidden'}`}>
					<div className="sticky top-20 right-0 w-full min-h-[80vh]">
						<Image
							src={RequistBanner}
							alt="Banner properties on bove"
							fill
							sizes=""
							className="object-cover"
						/>
						<div className="absolute top-0 left-0 h-full w-full flex flex-col justify-around">
							<div className="border rounded-xl bg-white shadow-xl flex gap-3 p-3 w-fit self-end -translate-x-12 sticky top-0">
								<div className="rounded-full bg-[#5A727B] shadow-xl w-12 h-12 flex items-center justify-center">
									<LineSvg />
								</div>
								<div className="">
									<p className="text-[#1E1E1E]">{translate('findTheHome')}</p>
									<p className="text-sm text-[#666D80]">{translate('easySearch')}</p>

								</div>
							</div>
							<div className="border rounded-xl bg-white shadow-xl flex gap-3 p-3 w-fit self-start -translate-x-12 sticky top-0">
								<div className="rounded-full bg-[#5A727B] shadow-xl w-12 h-12 flex items-center justify-center">
									<PropertySvg />
								</div>
								<div className="">
									<p className="text-[#1E1E1E]">{translate('findTheHome')}</p>
									<p className="text-sm text-[#666D80]">{translate('easySearch')}</p>

								</div>
							</div>
							<div className="border rounded-xl bg-white shadow-xl flex gap-3 p-3 w-fit self-end -translate-x-12 sticky top-0">
								<div className="rounded-full bg-[#5A727B] shadow-xl w-12 h-12 flex items-center justify-center">
									<RequistSvg />
								</div>
								<div className="">
									<p className="text-[#1E1E1E]">{translate('findTheHome')}</p>
									<p className="text-sm text-[#666D80]">{translate('easySearch')}</p>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="sticky bg-white bottom-0 py-3">
				<div className="h-[1px] w-full bg-slate-200 absolute top-0">
					<span className={`h-[1px] left-0 bg-[#34484F] absolute top-0 ease-in-out duration-200 ${tab === 1 ? 'w-1/3' : tab === 2 ? 'w-2/3' : 'w-full'}`}></span>
				</div>
				<div className="container">
					<div className="flex justify-between">
						<SubmitButton 
							caption="back"
							disabled={back}
							className="tw-btn-outline w-40"
							onClick={handelBack}
						/>
						<SubmitButton 
							caption="continue"
							loading={loading}
							disabled={disabled}
							className="tw-btn-solid w-40"
							onClick={handelContinue}
						/>
					</div>
				</div>
			</div>
		</Fragment>


	)
}

const LineSvg = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
			<path d="M6.09209 4.61717C4.71644 6.16825 3.15684 8.40565 1.80788 11.1036C1.60205 11.5152 1.10149 11.6821 0.689847 11.4762C0.278197 11.2704 0.111338 10.7698 0.317163 10.3582C1.72683 7.5389 3.36645 5.17857 4.8452 3.51127C5.58326 2.6791 6.29542 2.0035 6.93309 1.52824C7.25167 1.29073 7.56642 1.0922 7.86875 0.950115C8.16175 0.812432 8.49651 0.702148 8.84034 0.702148C9.02034 0.702148 9.21834 0.746732 9.40151 0.864449C9.58176 0.98024 9.69809 1.13486 9.77026 1.27784C9.90117 1.53727 9.91567 1.81442 9.91242 2.00163C9.90551 2.39924 9.79959 2.89615 9.66367 3.40194C9.38517 4.43813 8.89517 5.81135 8.40809 7.1669L8.33975 7.35698C7.86825 8.66865 7.40409 9.9599 7.10234 10.991C7.02109 11.2688 6.95451 11.5181 6.90351 11.7366C7.48192 11.2717 8.19409 10.5733 8.95067 9.82998L8.97534 9.80573C9.71 9.0839 10.4872 8.32032 11.1429 7.79607C11.4683 7.53598 11.8192 7.28882 12.1572 7.14565C12.441 7.02532 13.0909 6.82982 13.5963 7.33515C13.9166 7.65548 14.0055 8.07198 14.0285 8.38248C14.0526 8.70748 14.0148 9.05773 13.9561 9.39057C13.8386 10.057 13.6026 10.8346 13.3868 11.5362L13.3522 11.6488C13.1594 12.275 12.9875 12.8336 12.8895 13.2826C13.1064 13.0648 13.3735 12.7201 13.6853 12.2113C13.9257 11.8188 14.4388 11.6956 14.8312 11.936C15.2236 12.1764 15.3468 12.6895 15.1064 13.0819C14.6539 13.8206 14.1857 14.4206 13.6889 14.7931C13.1693 15.183 12.4891 15.4027 11.8009 15.0586C11.2939 14.8051 11.1788 14.2999 11.1533 14.0204C11.1256 13.7181 11.1693 13.3882 11.2273 13.0911C11.3363 12.5308 11.5481 11.8436 11.7482 11.1944L11.7938 11.0462C12.0163 10.3231 12.2184 9.64715 12.3147 9.10123C12.3221 9.05915 12.3287 9.01898 12.3345 8.98057C12.2871 9.01632 12.2368 9.0554 12.1836 9.0979C11.6021 9.56282 10.8832 10.2678 10.1188 11.0188L10.0941 11.0431C9.35951 11.7648 8.58234 12.5284 7.92659 13.0526C7.60117 13.3128 7.25026 13.5599 6.91234 13.7031C6.62851 13.8234 5.97856 14.0189 5.47326 13.5136C5.21592 13.2563 5.15001 12.9316 5.12877 12.734C5.10526 12.5151 5.11985 12.2831 5.14791 12.0647C5.20451 11.6246 5.33679 11.0901 5.5028 10.5229C5.81925 9.44148 6.29917 8.10648 6.76326 6.81565L6.83959 6.60332C7.33426 5.22657 7.79734 3.92498 8.05409 2.96943C8.07667 2.88522 8.09717 2.80577 8.11551 2.73105C8.05601 2.77182 7.99384 2.81627 7.92909 2.86456C7.41009 3.25137 6.78126 3.84014 6.09209 4.61717Z" fill="white"/>
		</svg>
	)
}

const PropertySvg = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
			<path d="M16.229 15.7021H1.22896C0.76873 15.7021 0.39563 15.3291 0.39563 14.8688V8.60782C0.39563 8.36698 0.499805 8.1379 0.681313 7.97965L3.72896 5.32244V1.53548C3.72896 1.07525 4.10206 0.702148 4.5623 0.702148H16.229C16.6892 0.702148 17.0623 1.07525 17.0623 1.53548V14.8688C17.0623 15.3291 16.6892 15.7021 16.229 15.7021ZM6.22896 14.0355H8.72896V8.98681L5.39563 6.0805L2.0623 8.98681V14.0355H4.5623V10.7021H6.22896V14.0355ZM10.3956 14.0355H15.3956V2.36882H5.39563V4.14156C5.591 4.14156 5.78636 4.20996 5.94328 4.34677L10.11 7.97965C10.2915 8.1379 10.3956 8.36698 10.3956 8.60782V14.0355ZM12.0623 7.36881H13.729V9.03548H12.0623V7.36881ZM12.0623 10.7021H13.729V12.3688H12.0623V10.7021ZM12.0623 4.03548H13.729V5.70215H12.0623V4.03548ZM8.72896 4.03548H10.3956V5.70215H8.72896V4.03548Z" fill="white"/>
		</svg>
	)
}

const RequistSvg = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
			<path d="M5.229 2.53532L2.729 0.868652L0.229004 2.53532V15.0353C0.229004 16.4161 1.3483 17.5353 2.729 17.5353H14.3957C15.7764 17.5353 16.8957 16.4161 16.8957 15.0353V12.5353H15.229V2.53532L12.729 0.868652L10.229 2.53532L7.729 0.868652L5.229 2.53532ZM13.5623 12.5353H3.56234V15.0353C3.56234 15.4956 3.18924 15.8687 2.729 15.8687C2.26877 15.8687 1.89567 15.4956 1.89567 15.0353V3.42729L2.729 2.87174L5.229 4.5384L7.729 2.87174L10.229 4.5384L12.729 2.87174L13.5623 3.42729V12.5353ZM14.3957 15.8687H5.08675C5.17888 15.608 5.229 15.3275 5.229 15.0353V14.202H15.229V15.0353C15.229 15.4956 14.8559 15.8687 14.3957 15.8687Z" fill="white"/>
		</svg>
	)
}

export default ApplyRequest
