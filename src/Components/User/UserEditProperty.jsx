"use client"
import React, { useEffect } from "react";
import { translate } from "@/utils";
import { languageData } from "@/store/reducer/languageSlice";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic.js";

// const VerticleLayout = dynamic(() => import('../AdminLayout/VerticleLayout.jsx'), { ssr: false });

import UserLayout from "../Layout/UserLayout.jsx";
import EditProperty from "../EditProperty/EditProperty.jsx";

const UserEditProperty = () => {
    const lang = useSelector(languageData);

    useEffect(() => {}, [lang]);
    return (
        <UserLayout>
        <div className="container">
            <h3 className="text-2xl xl:text-4xl font-medium mt-8 mb-6">{translate("editProp")}</h3>
            {/* <div className="card" id="add_prop_tab">
                <AddPropertyTabs />
                
            </div> */}
        </div>
        <EditProperty />
        </UserLayout>
    );
};

export default UserEditProperty;
