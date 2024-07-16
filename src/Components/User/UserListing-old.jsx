"use client"
import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import { useSelector } from "react-redux";
import { GetFeturedListingsApi, GetLimitsApi } from "@/store/actions/campaign";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Menu, Dropdown, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { settingsData } from "@/store/reducer/settingsSlice";
import { useRouter } from "next/router";
import { BsThreeDotsVertical } from "react-icons/bs";
import ReactPagination from "../../../src/Components/Pagination/ReactPagination.jsx";
import { deletePropertyApi } from "@/store/actions/campaign";
import Loader from "../../../src/Components/Loader/Loader.jsx";
import toast from "react-hot-toast";
import { FaCrown } from "react-icons/fa";
import { MdOutlineSell } from "react-icons/md";
import FeatureModal from "@/Components/FeatureModal/FeatureModal.jsx";
import ChangeStatusModal from "@/Components/ChangeStatusModal/ChangeStatusModal.jsx";
import { placeholderImage, translate } from "@/utils/index.js";
import { languageData } from "@/store/reducer/languageSlice.js";
import Swal from "sweetalert2";
import Image from "next/image";
import dynamic from "next/dynamic.js";
import { FaRegEye } from "react-icons/fa";
import Link from "next/link.js";
import TablePagination from "../Pagination/TablePagination.jsx";
import UserLayout from "../Layout/UserLayout.jsx";

const UserDashboard = () => {

    const limit = 8;

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [getFeaturedListing, setGetFeaturedListing] = useState([]);
    const [total, setTotal] = useState(0);
    const [view, setView] = useState(0);
    const [offsetdata, setOffsetdata] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [propertyIdToDelete, setPropertyIdToDelete] = useState(null);
    const [propertyId, setPropertyId] = useState(null);
    const [propertyType, setPropertyType] = useState(null);
    const [changeStatus, setChangeStatus] = useState(false);
    const [isFeatureModalVisible, setIsFeatureModalVisible] = useState(false);
    const [changestatusModal, setChangestatusModal] = useState(false);

    const startIndex = total > 0 ? (offsetdata * limit) + 1 : 0;
    const endIndex = Math.min((offsetdata + 1) * limit, total);
    const SettingsData = useSelector(settingsData);


    const lang = useSelector(languageData);

    useEffect(() => { }, [lang]);

    const handleClickEdit = (propertyId) => {
        router.push(`/user/edit-property/${propertyId}`);
    };
    const handleClickDelete = (propertyId) => {
        if (SettingsData.demo_mode === true) {
            Swal.fire({
                title: "Opps!",
                text: "This Action is Not Allowed in Demo Mode",
                icon: "warning",
                showCancelButton: false,
                customClass: {
                    confirmButton: 'Swal-confirm-buttons',
                    cancelButton: "Swal-cancel-buttons"
                },
                confirmButtonText: "OK",
            });
            return false;
        }
        setPropertyIdToDelete(propertyId);
        setIsLoading(true);
        deletePropertyApi(
            propertyId,
            (response) => {
                setIsLoading(true);
                toast.success(response.message);

                GetFeturedListingsApi({
                    offset: offsetdata.toString(),
                    limit: limit.toString(),
                    userid: isLoggedIn ? userCurrentId : "",
                    filter_type: 0,
                    onSuccess: (response) => {
                        setTotal(response.total);
                        setView(response.total_clicks);
                        const FeaturedListingData = response.data;
                        setIsLoading(false);
                        setGetFeaturedListing(FeaturedListingData);
                    },
                    onError: (error) => {
                        setIsLoading(false);
                        console.log(error);
                    }
                }
                );
            },
            (error) => {
                setIsLoading(false);
                toast.error(error);
            }
        );
    };

    const handleFeatureClick = (propertyId) => {
        if (SettingsData.demo_mode === true) {
            Swal.fire({
                title: "Opps!",
                text: "This Action is Not Allowed in Demo Mode",
                icon: "warning",
                showCancelButton: false,
                customClass: {
                    confirmButton: 'Swal-buttons',
                },
                cancelButtonColor: "#d33",
                confirmButtonText: "OK",
            });
            return false;
        }
        GetLimitsApi(
            "advertisement",
            (response) => {
                if (response.message === "Please Subscribe for Advertisement") {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Your Package Limit is Over. Please Purchase Package.",
                        allowOutsideClick: false,
                        customClass: {
                            confirmButton: 'Swal-confirm-buttons',
                        },

                    }).then((result) => {
                        if (result.isConfirmed) {
                            router.push("/subscription-plan"); // Redirect to the subscription page
                        }
                    });

                } else {
                    setPropertyId(propertyId);
                    setIsFeatureModalVisible(true);
                }
            },
            (error) => {
                console.log("API Error:", error);
            }

        )
    };
    const handleChangeStatusClick = (propertyId, propertyType) => {
        if (SettingsData.demo_mode === true) {
            Swal.fire({
                title: "Opps!",
                text: "This Action is Not Allowed in Demo Mode",
                icon: "warning",
                showCancelButton: false,
                customClass: {
                    confirmButton: 'Swal-buttons',
                },
                cancelButtonColor: "#d33",
                confirmButtonText: "OK",
            });
            return false;
        }
        setPropertyId(propertyId);
        setPropertyType(propertyType);
        setChangestatusModal(true);
    };


    const priceSymbol = useSelector(settingsData);
    const CurrencySymbol = priceSymbol && priceSymbol.currency_symbol;
    const isLoggedIn = useSelector((state) => state.User_signup);
    const userCurrentId = isLoggedIn && isLoggedIn.data ? isLoggedIn.data.data.id : null;
    const userData = isLoggedIn && isLoggedIn?.data?.data?.name;

    useEffect(() => {
        setIsLoading(true);
        GetFeturedListingsApi({
            offset: offsetdata.toString(),
            limit: limit.toString(),
            userid: isLoggedIn ? userCurrentId : "",
            filter_type: 0,
            onSuccess: (response) => {
                setTotal(response.total);
                setView(response.total_clicks);
                const FeaturedListingData = response.data;
                setIsLoading(false);
                setGetFeaturedListing(FeaturedListingData);
            },
            onError: (error) => {
                setIsLoading(false);
                console.log(error);
            }
        }
        );
    }, [offsetdata, isLoggedIn, propertyIdToDelete, changeStatus]);

    useEffect(() => { }, [propertyId, propertyIdToDelete, propertyType, changeStatus]);
    useEffect(() => {
        setChangeStatus(false)
    }, [changeStatus]);

    const handlePageChange = (selectedPage) => {
        const newOffset = selectedPage.selected * limit;
        setOffsetdata(newOffset);
        window.scrollTo(0, 0);
    };
    const handleShowIntrestedUser = (slug_id) => {
        router.push(`/user/intrested/${slug_id}`);
    }


	console.log('getFeaturedListing', getFeaturedListing);
    return (
        <UserLayout footer={true}>
            <div className="container">
                <div className="border rounded-xl overflow-hidden" id="dashboard_top_card">
				<div className="border-b py-3 px-4">
                        <h3 className="text-xl md:text-2xl">{translate("currentListing")}</h3>
                    </div>
                    <div className="">
                        <div className="">
                            <TableContainer
							className="p-0"
                                component={Paper}
                                sx={{
                                    background: "#fff",
                                    padding: "0px",
                                }}
                            >
                                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                                    <TableHead
                                       
                                    >
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: "400" }}>{translate("listing")}</TableCell>
                                            {/* <TableCell sx={{ fontWeight: "600" }} align="center">
                                                {translate("category")}
                                            </TableCell> */}
                                            <TableCell sx={{ fontWeight: "400" }} align="center">
                                                {translate("stats")}
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: "400" }} align="center">
                                                {translate("status")}
                                            </TableCell>
                                            {/* <TableCell sx={{ fontWeight: "600" }} align="center">
                                                {translate("intrestedUsers")}
                                            </TableCell> */}
                                            {/* <TableCell sx={{ fontWeight: "600" }} align="center">
                                                {translate("postedOn")}
                                            </TableCell> */}
                                            <TableCell sx={{ fontWeight: "400" }} align="center">
                                                {/* {translate("action")} */}
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {isLoading ? (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center">
                                                    <div>
                                                        <Loader />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : getFeaturedListing && getFeaturedListing.length > 0 ? (
                                            getFeaturedListing.map((elem, index) => (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row" sx={{ width: "40%" }}>
                                                        <div className="" id="listing_card">
                                                            <div className="listing_card_img h-32 w-64 relative overflow-hidden">
                                                                <Image loading="lazy" src={elem.title_image} alt="no_img" id="main_listing_img" fill onError={placeholderImage}/>
                                                                <span className="absolute z-[3] top-2 left-2 rounded-full capitalize bg-amber-300 py-1 px-3 text--white font-medium text-xs">{elem.property_type}</span>
                                                            </div>
                                                            <div className="listing_card_body ps-3">
																<span className="rounded-full border px-3 py-1 w-min">{elem.category.category}</span>
																<span className="listing_prop_pirce">
                                                                     {elem.price} {CurrencySymbol}
                                                                </span>
                                                                <span className="listing_prop_loc">
                                                                    {elem.city} {elem.state} {elem.country}
                                                                </span>                                                                
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    {/* <TableCell align="center">{elem.category.category}</TableCell> */}
                                                    {/* <TableCell align="center">{elem.total_view}</TableCell> */}
                                                    <TableCell align="center" onClick={() => handleShowIntrestedUser(elem.slug_id)}>
                                                        <div className="intrested_users">
                                                            <span>
                                                                <FaRegEye size={20} />
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    {/* <TableCell align="center">{elem.post_created}</TableCell> */}
                                                    <TableCell align="center">{elem.status === 1 ? <span className="inactive_status bg-green-100 text-green-600 border-green-600">{translate("active")}</span> : <span className="inactive_status">{translate("inactive")}</span>}</TableCell>
                                                    <TableCell align="center">
                                                        <Dropdown
                                                            visible={anchorEl === index}
                                                            onVisibleChange={(visible) => {
                                                                if (visible) {
                                                                    setAnchorEl(index);
                                                                } else {
                                                                    setAnchorEl(null);
                                                                }
                                                            }}
                                                            overlay={
                                                                <Menu>
                                                                    <Menu.Item key="edit" onClick={() => handleClickEdit(elem.slug_id)}>
                                                                        <Button type="text" icon={<EditOutlined />}>
                                                                            {translate("edit")}
                                                                        </Button>
                                                                    </Menu.Item>
                                                                    {elem.status === 1 && elem.promoted === false ? (
                                                                        <Menu.Item key="feature" onClick={() => handleFeatureClick(elem.id)}>
                                                                            <Button type="text" icon={<FaCrown />} >
                                                                                {translate("feature")}
                                                                            </Button>
                                                                        </Menu.Item>
                                                                    ) : null}

                                                                    {elem.status === 1 && elem.property_type !== 'sold' ? (
                                                                        <Menu.Item key="change_status" onClick={() => handleChangeStatusClick(elem.id, elem.property_type)}>
                                                                            <Button type="text" icon={<MdOutlineSell />}>
                                                                                {translate("change status")}
                                                                            </Button>
                                                                        </Menu.Item>
                                                                    ) : null}


                                                                    <Menu.Item key="delete" onClick={() => handleClickDelete(elem.id)}>
                                                                        <Button type="text" icon={<DeleteOutlined />} >
                                                                            {translate("delete")}
                                                                        </Button>
                                                                    </Menu.Item>
                                                                </Menu>
                                                            }
                                                        >
                                                            <Button id="simple-menu">
                                                                Actions <BsThreeDotsVertical />
                                                            </Button>
                                                        </Dropdown>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center">
                                                    <div className="text-center pb-4">
                                                        <p className="text-xl font-medium text-slate-700 mb-4" >{translate("noDataAvailabe")}</p>
                                                        <Link href="/user/properties" className="tw-btn-solid !px-12">{translate('addProp')}</Link>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <FeatureModal show={isFeatureModalVisible} onHide={() => setIsFeatureModalVisible(false)} propertyId={propertyId} />

                            <ChangeStatusModal show={changestatusModal} onHide={() => setChangestatusModal(false)} propertyId={propertyId} propertyType={propertyType} setChangeStatus={setChangeStatus} />

                            {getFeaturedListing && getFeaturedListing.length > 0 ? (
                                <div className="py-12">

                                    <ReactPagination pageCount={Math.ceil(total / limit)} onPageChange={handlePageChange} />
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>

    )
}

export default UserDashboard
