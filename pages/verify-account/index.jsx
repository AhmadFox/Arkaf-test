import Link from "next/link";
import Meta from "@/Components/Seo/Meta";

import { translate } from "@/utils"

import AuthLayout from "@/Components/Layout/AuthLayout";
import OTPform from "@/Components/AuthForms/OTPform";

const Index = ({ seoData, currentURL }) => {

    return (
        <AuthLayout>
            <Meta
                title={''}
                description={''}
                keywords={''}
                ogImage={''}
                pathName={''}
            />
			<OTPform />

        </AuthLayout>
    );
};

export default Index;
