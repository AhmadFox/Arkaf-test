import Link from "next/link";
import Meta from "@/Components/Seo/Meta";

import { translate } from "@/utils"

import AuthLayout from "@/Components/Layout/AuthLayout";
import SignupForm from "@/Components/AuthForms/SignupForm";

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
			<SignupForm />
            <p className='text-center'>{translate('haveArkafaccount')} <Link href="/login" className='!underline'>{translate('login')}</Link></p>

        </AuthLayout>
    );
};

export default Index;
