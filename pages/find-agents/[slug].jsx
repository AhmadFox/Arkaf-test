import axios from "axios";
import { GET_SEO_SETTINGS } from "@/utils/api";
import Meta from "@/Components/Seo/Meta";
import Agent from "@/Components/Agent/Agent";

// This is the SEO API
const fetchDataFromSeo = async (page) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_END_POINT}${GET_SEO_SETTINGS}?page=agent`
    );

    const SEOData = response.data;

    return SEOData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const Index = ({ seoData, currentURL, agentId }) => {
  return (
    <>
      <Meta
        title={seoData?.data && seoData.data.length > 0 && seoData.data[0].meta_title}
        description={seoData?.data && seoData.data.length > 0 && seoData.data[0].meta_description}
        keywords={seoData?.data && seoData.data.length > 0 && seoData.data[0].meta_keywords}
        ogImage={seoData?.data && seoData.data.length > 0 && seoData.data[0].meta_image}
        pathName={currentURL}
      />
      <Agent agentId={agentId} />
    </>
  );
};

let serverSidePropsFunction = null;
if (process.env.NEXT_PUBLIC_SEO === "true") {
  serverSidePropsFunction = async (context) => {
    const { req, params } = context; // Extract query and request object from context
    const { slug } = params; // Get the slug from the params

    const currentURL = process.env.NEXT_PUBLIC_WEB_URL + '/agent/';

    const seoData = await fetchDataFromSeo(req.url);

    return {
      props: {
        seoData,
        currentURL,
        agentId: slug, // Pass the agent ID (slug) as a prop
      },
    };
  };
}

export const getServerSideProps = serverSidePropsFunction;
export default Index;
