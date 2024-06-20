import Link from "next/link";
import Meta from "@/Components/Seo/Meta";

import { translate } from "@/utils"

import AuthLayout from "@/Components/Layout/AuthLayout";
import ForgotPasswordForm from "@/Components/AuthForms/ForgotPasswordForm";

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
			<ForgotPasswordForm />
			<p className='text-center'>{translate('haveArkafaccount')} <Link href="/login" className='!underline'>{translate('login')}</Link></p>

        </AuthLayout>
    );
};

export default Index;
