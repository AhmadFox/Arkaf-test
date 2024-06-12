import Link from "next/link";
import Meta from "@/Components/Seo/Meta";

import { translate } from "@/utils"

import AuthLayout from "@/Components/Layout/AuthLayout";
import LoginForm from "@/Components/AuthForms/LoginForm";

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
			<LoginForm />
            <p className='text-center'>{translate('dontHaveArkafaccount')} <Link href="/register" className='!underline'>{translate('register')}</Link></p>

        </AuthLayout>
    );
};

export default Index;
