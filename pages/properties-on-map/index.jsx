import React from "react";
import axios from "axios";
import { GET_SEO_SETTINGS } from "@/utils/api";
import Meta from "@/Components/Seo/Meta";
import PropertiesOnMap from "@/Components/PropertiesOnMap/PropertiesOnMap";
import Layout from "@/Components/Layout/Layout";
import { translate } from "@/utils";
import VerticalCard from "@/Components/Cards/VerticleCard";
import Link from "next/link";


// This is seo api
const fetchDataFromSeo = async (page) => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_END_POINT}${GET_SEO_SETTINGS}?page=properties-on-map`
		);

		const SEOData = response.data;


		return SEOData;
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
};

const dumpData = {
    data: [
        {
            customer_name: "Ahmad Gharaibeh",
            email: "gharaibeh.ahmad88@gmail.com",
            mobile: "+962 7 8872 6020",
            profile: "https://arkaf-admin.namacoders-clients.xyz/images/users/1719487314.1818.jpg",
            client_address: "null",
            id: 133,
            slug_id: "properety-title-35",
            title: "properety title",
            price: 88000,
            size: 400,
            category: {
                id: 1,
                category: "Villa",
                image: "https://arkaf-admin.namacoders-clients.xyz/images/category/sleep-icon_1717528702.svg",
                slug_id: "villa-1"
            },
            is_featured: 1,
            second_contact_number: "2024-07-09",
            first_contact_number: "",
            contact_name: "+962 7 8872 6900",
            built_in: "2024-07-09",
            approved_at: "2024-07-10 03:06:44",
            description: "asdsadasdsad wdasdssssss dddd vv",
            address: "Al Khail Rd - Dubai - United Arab Emirates",
            property_type: "sell",
            title_image: "https://arkaf-admin.namacoders-clients.xyz/images/property_title_img/1720680997.26.webp",
            title_image_hash: "",
            threeD_image: "",
            post_created: "2 days ago",
            gallery: [
                {
                    id: 108,
                    image: "172058076088.webp",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/133/172058076088.webp"
                },
                {
                    id: 110,
                    image: "172068099784.webp",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/133/172068099784.webp"
                },
                {
                    id: 111,
                    image: "172068099711.webp",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/133/172068099711.webp"
                },
                {
                    id: 112,
                    image: "172068112550.webp",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/133/172068112550.webp"
                }
            ],
            layout: [
                {
                    id: 36,
                    image: "1720580760100.jpg",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_layout/133/1720580760100.jpg",
                    size: 200,
                    name: "layout 1",
                    price: 44000,
                    parameters: [
                        {
                            id: 2,
                            name: "Bath",
                            type_of_parameter: "number",
                            type_values: null,
                            image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/Frame_1717726156.svg",
                            value: "2"
                        },
                        {
                            id: 3,
                            name: "Bed",
                            type_of_parameter: "number",
                            type_values: null,
                            image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/hotel-bed-line_1717726272.svg",
                            value: "2"
                        }
                    ]
                },
                {
                    id: 37,
                    image: "172058076043.jpg",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_layout/133/172058076043.jpg",
                    size: 200,
                    name: "layout 2",
                    price: 22000,
                    parameters: [
                        {
                            id: 3,
                            name: "Bed",
                            type_of_parameter: "number",
                            type_values: null,
                            image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/hotel-bed-line_1717726272.svg",
                            value: "2"
                        },
                        {
                            id: 2,
                            name: "Bath",
                            type_of_parameter: "number",
                            type_values: null,
                            image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/Frame_1717726156.svg",
                            value: "2"
                        }
                    ]
                }
            ],
            total_view: 3,
            status: 1,
            state: "",
            city: "عمان",
            country: "United Arab Emirates",
            latitude: "31.9543786",
            longitude: "35.9105776",
            added_by: 21,
            video_link: "https://www.youtube.com/watch?v=1nJOku-FPV8&list=RDY87ZPLf-0KQ&index=13",
            rentduration: "Monthly",
            meta_title: "",
            meta_description: "",
            meta_keywords: "",
            meta_image: "",
            is_premium: false,
            whatsapp_link: null,
            assign_facilities: [],
            inquiry: false,
            promoted: false,
            is_reported: false,
            is_favourite: 0,
            is_interested: 0,
            favourite_users: [],
            interested_users: [],
            total_interested_users: 0,
            total_favourite_users: 0,
            advertisement: [],
            parameters: [
                {
                    id: 2,
                    name: "Bath",
                    type_of_parameter: "number",
                    type_values: null,
                    image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/Frame_1717726156.svg",
                    value: 4
                },
                {
                    id: 3,
                    name: "Bed",
                    type_of_parameter: "number",
                    type_values: null,
                    image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/hotel-bed-line_1717726272.svg",
                    value: 4
                }
            ]
        },
        {
            customer_name: "Mohammad Aziz Y",
            email: "moa+a5@namacoders.com",
            mobile: "+962 7 8714 5145",
            profile: "https://arkaf-admin.namacoders-clients.xyz/images/users/1719497551.3945.jpeg",
            client_address: "",
            id: 69,
            slug_id: "properety-title-8",
            title: "properety title",
            price: 151,
            size: 315,
            category: {
                id: 4,
                category: "Single Family Home",
                image: "",
                slug_id: "single-family-home"
            },
            is_featured: 1,
            second_contact_number: null,
            first_contact_number: null,
            contact_name: null,
            built_in: null,
            approved_at: null,
            description: "[object Object]",
            address: "King Khalid International Airport-Terminal 4, Airport Road, King Khalid International Airport, Riyadh 13458, Saudi Arabia",
            property_type: "sell",
            title_image: "https://arkaf-admin.namacoders-clients.xyz/images/property_title_img/1719497868.9151.png",
            title_image_hash: "",
            threeD_image: "",
            post_created: "2 weeks ago",
            gallery: [
                {
                    id: 92,
                    image: "171949786891.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/69/171949786891.png"
                },
                {
                    id: 93,
                    image: "171949786858.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/69/171949786858.png"
                }
            ],
            layout: [],
            total_view: 3,
            status: 1,
            state: "",
            city: "Riyadh",
            country: "",
            latitude: "24.960479",
            longitude: "46.7023702",
            added_by: 93,
            video_link: "",
            rentduration: "Daily",
            meta_title: "",
            meta_description: "",
            meta_keywords: "",
            meta_image: "",
            is_premium: false,
            whatsapp_link: null,
            assign_facilities: [],
            inquiry: false,
            promoted: false,
            is_reported: false,
            is_favourite: 0,
            is_interested: 1,
            favourite_users: [
                17,
                95
            ],
            interested_users: [
                21
            ],
            total_interested_users: 1,
            total_favourite_users: 2,
            advertisement: [],
            parameters: [
                {
                    id: 2,
                    name: "Bath",
                    type_of_parameter: "number",
                    type_values: null,
                    image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/Frame_1717726156.svg",
                    value: 3
                },
                {
                    id: 3,
                    name: "Bed",
                    type_of_parameter: "number",
                    type_values: null,
                    image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/hotel-bed-line_1717726272.svg",
                    value: 1
                },
                {
                    id: 4,
                    name: "Size",
                    type_of_parameter: "textbox",
                    type_values: null,
                    image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/expand-diagonal-line_1717726342.svg",
                    value: 500
                }
            ]
        },
        {
            customer_name: "Admin",
            email: "info@arkaf.sa",
            mobile: "96655487455",
            profile: "https://arkaf-admin.namacoders-clients.xyz/images/users/1719497551.3945.jpeg",
            client_address: "",
            id: 11,
            slug_id: "401-al-khobar-street-riyadh-saudi-arabia",
            title: "Single Home Ryadah",
            price: 628000,
            size: 382,
            category: {
                id: 4,
                category: "Single Family Home",
                image: "",
                slug_id: "single-family-home"
            },
            is_featured: 1,
            second_contact_number: null,
            first_contact_number: null,
            contact_name: null,
            built_in: null,
            approved_at: null,
            description: "Introducing an exceptional opportunity to multiply your investment in the breathtaking locale of Nunggalan Beach, Pecatu. This remarkable 3,000 sqm (30 are) leasehold property, represented by Property ID FP15112307, transcends being mere land; it’s the canvas for realizing your vision of opulence and luxury perched atop a cliff with mesmerizing oceanfront views, the potential here is boundless. Whether you envision an elegant luxury villa, an exclusive beach club, or a charming wedding chapel, this property provides the perfect foundation for your dream project.\r\nLocated at Nunggalan Beach Pecatu – Kuta Selatan, this prime plot is priced competitively at USD 2230 / IDR 35,000,000 per ARE per year. It offers a 30-year leasehold term, with an extendable option for an additional 20 years, ensuring a perfect time to bring your vision to life.\r\n\r\nThis property’s strategic position is a testament to its value, with Nunggalan Beach just a short 3-minute stroll away. Additionally, the convenience of shops, restaurants, and bars are within a 10-minute reach, while a supermarket is a mere 15-minute drive. For travelers, the International Airport is an easy one-hour journey.\r\nIn essence, this isn’t just land; it’s a lifetime deal for your idea, offering endless possibilities to create a masterpiece of opulence and luxury. Don’t miss out on this extraordinary opportunity to turn your vision into reality!",
            address: "712 Qurashi Street, al salam",
            property_type: "sell",
            title_image: "https://arkaf-admin.namacoders-clients.xyz/images/property_title_img/232780-d6c6fo_1718236011.jpg",
            title_image_hash: "",
            threeD_image: "https://arkaf-admin.namacoders-clients.xyz/images/3d_img/three-dimensional-house-model_1718236011.jpg",
            post_created: "4 weeks ago",
            gallery: [
                {
                    id: 36,
                    image: "17182360117.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/11/17182360117.png"
                },
                {
                    id: 37,
                    image: "171823601131.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/11/171823601131.png"
                },
                {
                    id: 38,
                    image: "171823601143.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/11/171823601143.png"
                },
                {
                    id: 39,
                    image: "171823601164.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/11/171823601164.png"
                },
                {
                    id: 40,
                    image: "171823601174.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/11/171823601174.png"
                },
                {
                    id: 41,
                    image: "17182360115.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/11/17182360115.png"
                },
                {
                    id: 42,
                    image: "171823601194.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/11/171823601194.png"
                }
            ],
            layout: [
                {
                    id: 8,
                    image: "171823601112.jpg",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_layout/11/171823601112.jpg",
                    size: null,
                    name: null,
                    price: null,
                    parameters: []
                },
                {
                    id: 9,
                    image: "171823601134.jpg",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_layout/11/171823601134.jpg",
                    size: null,
                    name: null,
                    price: null,
                    parameters: []
                },
                {
                    id: 10,
                    image: "171823601166.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_layout/11/171823601166.png",
                    size: null,
                    name: null,
                    price: null,
                    parameters: []
                }
            ],
            total_view: 0,
            status: 1,
            state: "",
            city: "",
            country: "",
            latitude: "24.594403900057106",
            longitude: "46.709523030393854",
            added_by: 0,
            video_link: "https://www.youtube.com/watch?v=pZnD24yCdl8",
            rentduration: "Daily",
            meta_title: "",
            meta_description: "",
            meta_keywords: "",
            meta_image: "",
            is_premium: true,
            whatsapp_link: null,
            assign_facilities: [],
            inquiry: false,
            promoted: false,
            is_reported: false,
            is_favourite: 0,
            is_interested: 0,
            favourite_users: [],
            interested_users: [],
            total_interested_users: 0,
            total_favourite_users: 0,
            advertisement: [],
            parameters: [
                {
                    id: 2,
                    name: "Bath",
                    type_of_parameter: "number",
                    type_values: null,
                    image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/Frame_1717726156.svg",
                    value: 4
                },
                {
                    id: 3,
                    name: "Bed",
                    type_of_parameter: "number",
                    type_values: null,
                    image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/hotel-bed-line_1717726272.svg",
                    value: 4
                },
                {
                    id: 4,
                    name: "Size",
                    type_of_parameter: "textbox",
                    type_values: null,
                    image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/expand-diagonal-line_1717726342.svg",
                    value: "382m (sqm)"
                }
            ]
        },
        {
            customer_name: "Admin",
            email: "info@arkaf.sa",
            mobile: "96655487455",
            profile: "https://arkaf-admin.namacoders-clients.xyz/images/users/1719497551.3945.jpeg",
            client_address: "",
            id: 8,
            slug_id: "layout-test",
            title: "layout test",
            price: 3334,
            size: 323,
            category: {
                id: 1,
                category: "Villa",
                image: "https://arkaf-admin.namacoders-clients.xyz/images/category/sleep-icon_1717528702.svg",
                slug_id: "villa-1"
            },
            is_featured: 1,
            second_contact_number: null,
            first_contact_number: null,
            contact_name: null,
            built_in: null,
            approved_at: null,
            description: "sdg",
            address: "dsvg",
            property_type: "sell",
            title_image: "https://arkaf-admin.namacoders-clients.xyz/images/property_title_img/Frame_1000004624_1718012084.png",
            title_image_hash: "",
            threeD_image: "",
            post_created: "1 month ago",
            gallery: [],
            layout: [
                {
                    id: 6,
                    image: "171801208449.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_layout/8/171801208449.png",
                    size: null,
                    name: null,
                    price: null,
                    parameters: []
                }
            ],
            total_view: 0,
            status: 1,
            state: "",
            city: "",
            country: "",
            latitude: "33",
            longitude: "3333",
            added_by: 0,
            video_link: "",
            rentduration: "Daily",
            meta_title: "layout test",
            meta_description: null,
            meta_keywords: null,
            meta_image: "",
            is_premium: false,
            whatsapp_link: null,
            assign_facilities: [],
            inquiry: false,
            promoted: false,
            is_reported: false,
            is_favourite: 0,
            is_interested: 0,
            favourite_users: [],
            interested_users: [],
            total_interested_users: 0,
            total_favourite_users: 0,
            advertisement: [],
            parameters: [
                {
                    id: 1,
                    name: "Pool",
                    type_of_parameter: "number",
                    type_values: null,
                    image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/swimming-icon_1717338958.svg",
                    value: 3
                },
                {
                    id: 2,
                    name: "Bath",
                    type_of_parameter: "number",
                    type_values: null,
                    image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/Frame_1717726156.svg",
                    value: 3
                },
                {
                    id: 3,
                    name: "Bed",
                    type_of_parameter: "number",
                    type_values: null,
                    image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/hotel-bed-line_1717726272.svg",
                    value: 3
                },
                {
                    id: 4,
                    name: "Size",
                    type_of_parameter: "textbox",
                    type_values: null,
                    image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/expand-diagonal-line_1717726342.svg",
                    value: 3
                }
            ]
        },
		{
            customer_name: "Ahmad Gharaibeh",
            email: "gharaibeh.ahmad88@gmail.com",
            mobile: "+962 7 8872 6020",
            profile: "https://arkaf-admin.namacoders-clients.xyz/images/users/1719487314.1818.jpg",
            client_address: "null",
            id: 133,
            slug_id: "properety-title-35",
            title: "properety title",
            price: 88000,
            size: 400,
            category: {
                id: 1,
                category: "Villa",
                image: "https://arkaf-admin.namacoders-clients.xyz/images/category/sleep-icon_1717528702.svg",
                slug_id: "villa-1"
            },
            is_featured: 1,
            second_contact_number: "2024-07-09",
            first_contact_number: "",
            contact_name: "+962 7 8872 6900",
            built_in: "2024-07-09",
            approved_at: "2024-07-10 03:06:44",
            description: "asdsadasdsad wdasdssssss dddd vv",
            address: "Al Khail Rd - Dubai - United Arab Emirates",
            property_type: "sell",
            title_image: "https://arkaf-admin.namacoders-clients.xyz/images/property_title_img/1720680997.26.webp",
            title_image_hash: "",
            threeD_image: "",
            post_created: "2 days ago",
            gallery: [
                {
                    id: 108,
                    image: "172058076088.webp",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/133/172058076088.webp"
                },
                {
                    id: 110,
                    image: "172068099784.webp",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/133/172068099784.webp"
                },
                {
                    id: 111,
                    image: "172068099711.webp",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/133/172068099711.webp"
                },
                {
                    id: 112,
                    image: "172068112550.webp",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/133/172068112550.webp"
                }
            ],
            layout: [
                {
                    id: 36,
                    image: "1720580760100.jpg",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_layout/133/1720580760100.jpg",
                    size: 200,
                    name: "layout 1",
                    price: 44000,
                    parameters: [
                        {
                            id: 2,
                            name: "Bath",
                            type_of_parameter: "number",
                            type_values: null,
                            image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/Frame_1717726156.svg",
                            value: "2"
                        },
                        {
                            id: 3,
                            name: "Bed",
                            type_of_parameter: "number",
                            type_values: null,
                            image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/hotel-bed-line_1717726272.svg",
                            value: "2"
                        }
                    ]
                },
                {
                    id: 37,
                    image: "172058076043.jpg",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_layout/133/172058076043.jpg",
                    size: 200,
                    name: "layout 2",
                    price: 22000,
                    parameters: [
                        {
                            id: 3,
                            name: "Bed",
                            type_of_parameter: "number",
                            type_values: null,
                            image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/hotel-bed-line_1717726272.svg",
                            value: "2"
                        },
                        {
                            id: 2,
                            name: "Bath",
                            type_of_parameter: "number",
                            type_values: null,
                            image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/Frame_1717726156.svg",
                            value: "2"
                        }
                    ]
                }
            ],
            total_view: 3,
            status: 1,
            state: "",
            city: "عمان",
            country: "United Arab Emirates",
            latitude: "31.9543786",
            longitude: "35.9105776",
            added_by: 21,
            video_link: "https://www.youtube.com/watch?v=1nJOku-FPV8&list=RDY87ZPLf-0KQ&index=13",
            rentduration: "Monthly",
            meta_title: "",
            meta_description: "",
            meta_keywords: "",
            meta_image: "",
            is_premium: false,
            whatsapp_link: null,
            assign_facilities: [],
            inquiry: false,
            promoted: false,
            is_reported: false,
            is_favourite: 0,
            is_interested: 0,
            favourite_users: [],
            interested_users: [],
            total_interested_users: 0,
            total_favourite_users: 0,
            advertisement: [],
            parameters: [
                {
                    id: 2,
                    name: "Bath",
                    type_of_parameter: "number",
                    type_values: null,
                    image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/Frame_1717726156.svg",
                    value: 4
                },
                {
                    id: 3,
                    name: "Bed",
                    type_of_parameter: "number",
                    type_values: null,
                    image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/hotel-bed-line_1717726272.svg",
                    value: 4
                }
            ]
        },
        {
            customer_name: "Mohammad Aziz Y",
            email: "moa+a5@namacoders.com",
            mobile: "+962 7 8714 5145",
            profile: "https://arkaf-admin.namacoders-clients.xyz/images/users/1719497551.3945.jpeg",
            client_address: "",
            id: 69,
            slug_id: "properety-title-8",
            title: "properety title",
            price: 151,
            size: 315,
            category: {
                id: 4,
                category: "Single Family Home",
                image: "",
                slug_id: "single-family-home"
            },
            is_featured: 1,
            second_contact_number: null,
            first_contact_number: null,
            contact_name: null,
            built_in: null,
            approved_at: null,
            description: "[object Object]",
            address: "King Khalid International Airport-Terminal 4, Airport Road, King Khalid International Airport, Riyadh 13458, Saudi Arabia",
            property_type: "sell",
            title_image: "https://arkaf-admin.namacoders-clients.xyz/images/property_title_img/1719497868.9151.png",
            title_image_hash: "",
            threeD_image: "",
            post_created: "2 weeks ago",
            gallery: [
                {
                    id: 92,
                    image: "171949786891.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/69/171949786891.png"
                },
                {
                    id: 93,
                    image: "171949786858.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/69/171949786858.png"
                }
            ],
            layout: [],
            total_view: 3,
            status: 1,
            state: "",
            city: "Riyadh",
            country: "",
            latitude: "24.960479",
            longitude: "46.7023702",
            added_by: 93,
            video_link: "",
            rentduration: "Daily",
            meta_title: "",
            meta_description: "",
            meta_keywords: "",
            meta_image: "",
            is_premium: false,
            whatsapp_link: null,
            assign_facilities: [],
            inquiry: false,
            promoted: false,
            is_reported: false,
            is_favourite: 0,
            is_interested: 1,
            favourite_users: [
                17,
                95
            ],
            interested_users: [
                21
            ],
            total_interested_users: 1,
            total_favourite_users: 2,
            advertisement: [],
            parameters: [
                {
                    id: 2,
                    name: "Bath",
                    type_of_parameter: "number",
                    type_values: null,
                    image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/Frame_1717726156.svg",
                    value: 3
                },
                {
                    id: 3,
                    name: "Bed",
                    type_of_parameter: "number",
                    type_values: null,
                    image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/hotel-bed-line_1717726272.svg",
                    value: 1
                },
                {
                    id: 4,
                    name: "Size",
                    type_of_parameter: "textbox",
                    type_values: null,
                    image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/expand-diagonal-line_1717726342.svg",
                    value: 500
                }
            ]
        },
		{
            customer_name: "Admin",
            email: "info@arkaf.sa",
            mobile: "96655487455",
            profile: "https://arkaf-admin.namacoders-clients.xyz/images/users/1719497551.3945.jpeg",
            client_address: "",
            id: 11,
            slug_id: "401-al-khobar-street-riyadh-saudi-arabia",
            title: "Single Home Ryadah",
            price: 628000,
            size: 382,
            category: {
                id: 4,
                category: "Single Family Home",
                image: "",
                slug_id: "single-family-home"
            },
            is_featured: 1,
            second_contact_number: null,
            first_contact_number: null,
            contact_name: null,
            built_in: null,
            approved_at: null,
            description: "Introducing an exceptional opportunity to multiply your investment in the breathtaking locale of Nunggalan Beach, Pecatu. This remarkable 3,000 sqm (30 are) leasehold property, represented by Property ID FP15112307, transcends being mere land; it’s the canvas for realizing your vision of opulence and luxury perched atop a cliff with mesmerizing oceanfront views, the potential here is boundless. Whether you envision an elegant luxury villa, an exclusive beach club, or a charming wedding chapel, this property provides the perfect foundation for your dream project.\r\nLocated at Nunggalan Beach Pecatu – Kuta Selatan, this prime plot is priced competitively at USD 2230 / IDR 35,000,000 per ARE per year. It offers a 30-year leasehold term, with an extendable option for an additional 20 years, ensuring a perfect time to bring your vision to life.\r\n\r\nThis property’s strategic position is a testament to its value, with Nunggalan Beach just a short 3-minute stroll away. Additionally, the convenience of shops, restaurants, and bars are within a 10-minute reach, while a supermarket is a mere 15-minute drive. For travelers, the International Airport is an easy one-hour journey.\r\nIn essence, this isn’t just land; it’s a lifetime deal for your idea, offering endless possibilities to create a masterpiece of opulence and luxury. Don’t miss out on this extraordinary opportunity to turn your vision into reality!",
            address: "712 Qurashi Street, al salam",
            property_type: "sell",
            title_image: "https://arkaf-admin.namacoders-clients.xyz/images/property_title_img/232780-d6c6fo_1718236011.jpg",
            title_image_hash: "",
            threeD_image: "https://arkaf-admin.namacoders-clients.xyz/images/3d_img/three-dimensional-house-model_1718236011.jpg",
            post_created: "4 weeks ago",
            gallery: [
                {
                    id: 36,
                    image: "17182360117.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/11/17182360117.png"
                },
                {
                    id: 37,
                    image: "171823601131.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/11/171823601131.png"
                },
                {
                    id: 38,
                    image: "171823601143.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/11/171823601143.png"
                },
                {
                    id: 39,
                    image: "171823601164.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/11/171823601164.png"
                },
                {
                    id: 40,
                    image: "171823601174.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/11/171823601174.png"
                },
                {
                    id: 41,
                    image: "17182360115.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/11/17182360115.png"
                },
                {
                    id: 42,
                    image: "171823601194.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_gallery_img/11/171823601194.png"
                }
            ],
            layout: [
                {
                    id: 8,
                    image: "171823601112.jpg",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_layout/11/171823601112.jpg",
                    size: null,
                    name: null,
                    price: null,
                    parameters: []
                },
                {
                    id: 9,
                    image: "171823601134.jpg",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_layout/11/171823601134.jpg",
                    size: null,
                    name: null,
                    price: null,
                    parameters: []
                },
                {
                    id: 10,
                    image: "171823601166.png",
                    image_url: "https://arkaf-admin.namacoders-clients.xyz/images/property_layout/11/171823601166.png",
                    size: null,
                    name: null,
                    price: null,
                    parameters: []
                }
            ],
            total_view: 0,
            status: 1,
            state: "",
            city: "",
            country: "",
            latitude: "24.594403900057106",
            longitude: "46.709523030393854",
            added_by: 0,
            video_link: "https://www.youtube.com/watch?v=pZnD24yCdl8",
            rentduration: "Daily",
            meta_title: "",
            meta_description: "",
            meta_keywords: "",
            meta_image: "",
            is_premium: true,
            whatsapp_link: null,
            assign_facilities: [],
            inquiry: false,
            promoted: false,
            is_reported: false,
            is_favourite: 0,
            is_interested: 0,
            favourite_users: [],
            interested_users: [],
            total_interested_users: 0,
            total_favourite_users: 0,
            advertisement: [],
            parameters: [
                {
                    id: 2,
                    name: "Bath",
                    type_of_parameter: "number",
                    type_values: null,
                    image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/Frame_1717726156.svg",
                    value: 4
                },
                {
                    id: 3,
                    name: "Bed",
                    type_of_parameter: "number",
                    type_values: null,
                    image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/hotel-bed-line_1717726272.svg",
                    value: 4
                },
                {
                    id: 4,
                    name: "Size",
                    type_of_parameter: "textbox",
                    type_values: null,
                    image: "https://arkaf-admin.namacoders-clients.xyz/images//parameter_img/expand-diagonal-line_1717726342.svg",
                    value: "382m (sqm)"
                }
            ]
        },
    ]
}


const Index = ({ seoData, currentURL }) => {
	return (
		<>
			<Meta
				title={seoData?.data && seoData.data.length > 0 && seoData.data[0].meta_title}
				description={seoData?.data && seoData.data.length > 0 && seoData.data[0].meta_description}
				keywords={seoData?.data && seoData.data.length > 0 && seoData.data[0].meta_keywords}
				ogImage={seoData?.data && seoData.data.length > 0 && seoData.data[0].meta_image}
				pathName={currentURL}
			/>

			<Layout>
				<div className="grid grid-cols-12">
					<div className="col-span-7">
						<div className="sticky top-20">
							<PropertiesOnMap />
						</div>
					</div>
					<div className="col-span-5 p-4 pt-0">
						{/* Sorting Section */}
						<div className="flex flex-col gap-2 sticky pt-4 top-20 bg-white z-[2] mb-3 border-b">
							<ul className="flex gap-2 flex-wrap">
								<li className="py-2 px-3 border rounded-3xl text-sm">{translate('all')}</li>
								<li className="py-2 px-3 border rounded-3xl text-sm">{translate('Top Villa')}(255)</li>
								<li className="py-2 px-3 border rounded-3xl text-sm">{translate('Free Cancelation')}(10)</li>
							</ul>
							<div className="flex justify-between items-center">
								<span>4,340 {translate('result')}</span>
								<div className="flex items-center gap-1">
									<label htmlFor="">{translate('sort')} : </label>
									<select name="" id="" className="border-0 shadow-none">
										<option value="">Homes for You</option>
									</select>
								</div>
							</div>
						</div>
						<div className="grid gap-4 grid-cols-1 md:grid-cols-2">
							{
								 dumpData.data?.map((ele, index) => (
									<Link key={index} target="_blank" href="/properties-details/[slug]" as={`/properties-details/${ele.slug_id}`} passHref>
										<VerticalCard ele={ele} horizontal={true} />
									</Link>

								))
							}
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};
let serverSidePropsFunction = null;
if (process.env.NEXT_PUBLIC_SEO === "true") {
	serverSidePropsFunction = async (context) => {
		const { req } = context; // Extract query and request object from context

		// const currentURL = `${req.headers.host}${req.url}`;
		const currentURL = process.env.NEXT_PUBLIC_WEB_URL + '/properties-on-map/';

		const seoData = await fetchDataFromSeo(req.url);

		return {
			props: {
				seoData,
				currentURL,
			},
		};
	};
}

export const getServerSideProps = serverSidePropsFunction;
export default Index;
