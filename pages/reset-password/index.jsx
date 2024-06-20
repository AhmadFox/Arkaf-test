import Link from "next/link";
import Meta from "@/Components/Seo/Meta";

import { translate } from "@/utils"

import AuthLayout from "@/Components/Layout/AuthLayout";
import ResetPasswordForm from "@/Components/AuthForms/ResetPasswordForm";

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
			<ResetPasswordForm />
			<p className='text-center'>{translate('haveArkafaccount')} <Link href="/login" className='!underline'>{translate('login')}</Link></p>

        </AuthLayout>
    );
};

export default Index;
