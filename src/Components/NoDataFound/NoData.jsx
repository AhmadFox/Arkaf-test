import React from "react";
import NoDataFound from "../../assets/no_data_found_illustrator.svg";
import { placeholderImage, translate } from "@/utils";
import Image from "next/image";

const NoData = () => {
    return (
        <div className="flex flex-col gap-6 justify-center text-center">
            <Image loading="lazy" className="mx-auto" src={NoDataFound.src} alt="no_img" width={200} height={200}  onError={placeholderImage}/>
            <div className="">
                <h3 className="text-lg md:text-2xl font-semibold mb-2">{translate("noData")}</h3>
                <span className="text-slate-600">{translate("noDatatext")}</span>
            </div>
        </div>
    );
};

export default NoData;
