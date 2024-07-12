// Layout.jsx
import { Fragment, Suspense, useEffect, useRef, useState } from "react";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import { languageData } from "@/store/reducer/languageSlice";
import { useRouter } from "next/router";
import { protectedRoutes } from "@/routes/routes";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";
import { loadSystemSettings } from "@/store/reducer/settingsSlice";

import FooterUser from "../Footer/FooterUser";
import UserInfo from "./UserInfo";

const UserLayout = ({ children, footer }) => {

	const [isLoading, setIsLoading] = useState(false);
    const isLoggedIn = useSelector((state) => state.User_signup);
   
    const userCurrentId = isLoggedIn && isLoggedIn.data ? isLoggedIn?.data?.data?.id : null;
    const router = useRouter();
    const [settingsData, setSettingsData] = useState([]);
    // const settingsData = useSelector((state) => state.settingsData);
    const prevUserCurrentIdRef = useRef(null);


    useEffect(() => {
        const shouldFetchData =
            !prevUserCurrentIdRef.current || prevUserCurrentIdRef.current !== userCurrentId;

        if (shouldFetchData) {
            setIsLoading(true);
            loadSystemSettings({
                user_id: isLoggedIn ? userCurrentId : "",
                onSuccess: (res) => {
                    setSettingsData(res?.data)
                    setIsLoading(false);
                    document.documentElement.style.setProperty('--primary-color', res?.data?.system_color);
                    document.documentElement.style.setProperty('--primary-category-background', res?.data?.category_background);
                    document.documentElement.style.setProperty('--primary-sell', res?.data?.sell_background);
                },
                onError: (err) => {
                    console.log(err);
                    setIsLoading(false);
                    setSettingsError(true);
                }
            });
        }


        prevUserCurrentIdRef.current = userCurrentId;

        return () => {
            prevUserCurrentIdRef.current = null;
        };
    }, [isLoggedIn, userCurrentId]);

    useEffect(() => {
    }, [settingsData])
    

    const pathname = usePathname();

    // Check if the current route requires a subscription
    const requiresAuth = protectedRoutes.includes(pathname);

    useEffect(() => {
        authCheck();
    }, [requiresAuth, userCurrentId]); // Add userCurrentId to the dependencies

    const authCheck = () => {
        if (requiresAuth && !userCurrentId) {
            router.push("/login");
        }
    };

    useEffect(() => {
        if (!userCurrentId && window.location.pathname === "/user/profile") {
            router.push('/');
        }
    }, [userCurrentId]); // Add userCurrentId to the dependencies

    const lang = useSelector(languageData);

    return (
        <Fragment>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="flex flex-col h-full">
                    <Suspense fallback={<Loader />}>
                        <Header />
                        {
                            router.pathname === '/user/profile' ||
                            router.pathname === '/user/favorites-properties' ||
                            router.pathname === '/user/current-listing' ||
                            router.pathname === '/user/transaction-history' ?
                            <UserInfo /> : null
                        }
                        {children}
                        {
                            footer &&
                            <FooterUser />
                        }
                    </Suspense>
                </div>
            )}
        </Fragment>
        
    );
};
export default UserLayout;
