import Link from "next/link";
import Meta from "@/Components/Seo/Meta";

import { translate } from "@/utils"

import AuthLayout from "@/Components/Layout/AuthLayout";

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
			<div className="flex flex-col items-center gap-3 w-full max-w-[500px] mx-auto">
                <Link href="/" className='w-full py-2.5 px-4 rounded-[8px] bg-[#34484F] font-semibold capitalize hover:bg-[#405861] text-white text-center ease-out duration-300'>{translate('continue')}</Link>
                <div className="flex relative w-full items-center justify-center gap-2">
                    <span className="left-0 absolute w-full h-[1px] bg-[#E0E0E0]"></span>
                    <span className="bg-white text-[#616161] relative z-[2] px-2">{translate('or')}</span>
                </div>
                <p className="text-[#616161]">{translate('compleateMoreSteps')}</p>
                <Link href="/complete-account" className="border border-[#DFE1E7] py-2.5 px-4 rounded-md flex items-center gap-2 text-[#272835] hover:text-white hover:bg-[#34484F] ease-in-out duration-200">
                    {translate('finishUp')}
                </Link>
            </div>
            

        </AuthLayout>
    );
};

export default Index;
