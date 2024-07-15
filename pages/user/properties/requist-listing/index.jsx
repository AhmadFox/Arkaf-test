import { Fragment } from "react";
import Meta from "@/Components/Seo/Meta";
import UserLayout from "@/Components/Layout/UserLayout";

import ApplyRequest from "@/Components/Properties/ApplyRequest";

const Index = () => {

    return (
        <Fragment>
            <Meta
                title=""
                description=""
                keywords=""
                ogImage=""
                pathName="/user/properties/post-listing/"
            />
            <UserLayout>
				<ApplyRequest type="post" />
			</UserLayout>
        </Fragment>
    );
};

export default Index;
