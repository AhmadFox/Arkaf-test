"use client"
import { translate } from "@/utils";
import dynamic from "next/dynamic.js";
import React from "react";

// import VerticleLayout from "@/Components/AdminLayout/VerticleLayout";
import AddPropertyTabs from "@/Components/AddPropertyTabs/AddPropertyTabs";
import AddProperty from "../AddProperty/AddProperty.jsx";

const VerticleLayout = dynamic(() => import('../AdminLayout/VerticleLayout.jsx'), { ssr: false })

import UserLayout from "../Layout/UserLayout.jsx";

const UserAddProperty = () => {
   
    return (
        <UserLayout>
            <div className="container">
                <h3 className="text-2xl xl:text-4xl font-medium mt-8 mb-6">{translate("addNewListing")}</h3>
                {/* <div className="card" id="add_prop_tab">
                    <AddPropertyTabs />
                    
                </div> */}
            </div>
            <AddProperty />
        </UserLayout>
    );
};

export default UserAddProperty;
