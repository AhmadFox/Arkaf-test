"use client"
import React, { useEffect, useState } from 'react'
import ChatApp from '@/Components/Messages/ChatApp'
import dynamic from 'next/dynamic.js'
import PushNotificationLayout from '../firebaseNotification/PushNotificationLayout.jsx'
const Layout = dynamic(() => import('../Layout/Layout.jsx'), { ssr: false })


const Messages = () => {
    const [notificationData, setNotificationData] = useState(null);

    const handleNotificationReceived = (data) => {
        setNotificationData(data);
    };
    useEffect(() => { }, [notificationData])
    return (
        <PushNotificationLayout onNotificationReceived={handleNotificationReceived}>
            <Layout stikyNav={false}>
                <ChatApp notificationData={notificationData} />
            </Layout>
        </PushNotificationLayout>
    )
}

export default Messages
