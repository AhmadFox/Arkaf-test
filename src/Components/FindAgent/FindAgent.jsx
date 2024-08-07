import Image from 'next/image';
import Layout from '../Layout/Layout';

import FindAgentBanner from "@/assets/Images/find_agent_banner.jpg"
import { translate } from '@/utils';
import SreachAgent from './SreachAgent';
import { useEffect, useState } from 'react';
import AgentInfo from './AgentInfo';
import ReactPagination from '../Pagination/ReactPagination';
import Link from 'next/link';
import { getAgentsApi } from '@/store/actions/campaign';

const FindAgent = () => {

	const limit = 8;

	const [ isLoading, setIsLoading ] = useState(true);
	const [ total, setTotal ] = useState(0);
	const [ agents, setAgents ] = useState([]);
	const [ offsetdata, setOffsetdata ] = useState(0);
	const [ filter, setFilter ] = useState({});

	const handelSearch = (search, cityId) => {
		setFilter({
			search: search,
			city: cityId
		})
	}

	const handlePageChange = (selectedPage) => {
		const newOffset = selectedPage.selected * limit;
		setOffsetdata(newOffset);
		window.scrollTo(0, 300);
	};

	useEffect(() => {
        setIsLoading(true);
        getAgentsApi({
            offset: '',
            limit:'',
			city_id: filter.city || '1',
			search: filter.search,
            onSuccess: (response) => {
                setTotal(response.total);
                setIsLoading(false);
                setAgents(response.data);
            },
            onError: (error) => {
                setIsLoading(true);
                console.log(error);
            }
        }
        );
    }, [offsetdata, filter]);

	const featuredAgents = agents.filter(agent => agent.is_featured === 1);

    return (
        <Layout stikyNav={true}>

			{/* Header Page */}
			<header className='relative h-[65vh] mb-9 xl:mb-14'>
				<Image
					src={FindAgentBanner}
					alt="Find Agent Banner"
					fill
					sizes
					className='object-cover z-[-1]'
				/>
				<div className="container h-full flex flex-col justify-center">
					<div className="grid grid-cols-12 mb-6 xl:mb-9">
						<h1 className="col-span-6 mb-2 col-spa font-medium md:text-start md:text-4xl xl:text-6xl text-white">{translate('findAgentHeading')}</h1>
						<p className="col-span-8 text-white text-xl">{translate('findAgentSubHeading')}</p>
					</div>
					<SreachAgent handelSearchApplay={handelSearch} />
				</div>
			</header>

			
			{
				featuredAgents.length > 0 ? (
					<div className="container mb-9 xl:mb-14">
						<div className="flex justify-between items-center mb-6">
							<p className="text-xl xl:text-2xl text-[#272835] font-medium mb-4">{translate('featuredAgents')}</p>
							<button className="flex gap-2 items-center text-slate-500 hover:text-[#272835] ease-in-out duration-200 group">
								{translate('seeMore')}
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 group-hover:translate-x-1 ease-in-out duration-200">
									<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
								</svg>
							</button>
						</div>
						<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
							{featuredAgents.map((agent, idx) => (
								<AgentInfo key={idx} agent={agent} />
							))}
						</div>
					</div>
				) : null
			}

			<div className="container mb-9 xl:mb-14">
				<div className="border rounded-xl">
					<table class="table-auto w-full">
						<thead>
							<tr className='text-lg xl:text-xl font-light border-b text-[#4D4D4D]'>
								<td className='py-3 px-4'>{translate('agents')}</td>
								<td className='py-3 px-4'>{translate('stats')}</td>
								<td className='py-3 px-4'>{translate('review')}</td>
							</tr>
						</thead>
						<tbody>
							{
								agents && agents.map((agent, idx) => (
									<tr key={idx} className='border-b last:border-b-0'>

										<td className='py-3 px-4'>
											<AgentInfo agent={agent} />
										</td>

										<td className='py-3 px-4'>
											<div className="flex flex-col gap-1">
												<span className="border text-sm rounded-full mb-2 px-3 py-1 flex items-center gap-2 justify-center w-max">
													<svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none">
														<path d="M15.832 16.4998H4.16536C3.70513 16.4998 3.33203 16.1267 3.33203 15.6664V8.16644H0.832031L9.43812 0.342695C9.75595 0.053737 10.2414 0.053737 10.5593 0.342695L19.1654 8.16644H16.6654V15.6664C16.6654 16.1267 16.2923 16.4998 15.832 16.4998ZM10.832 14.8331H14.9987V6.63099L9.9987 2.08553L4.9987 6.63099V14.8331H9.16537V9.83311H10.832V14.8331Z" fill="#272835"/>
													</svg>
													{agent.listing_available} {` `} {translate('listingAvailable')}
												</span>
												<span className="border text-sm rounded-full mb-2 px-3 py-1 flex items-center gap-2 justify-center w-max">
													<svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
														<path d="M2.16667 0.5V13.8333H15.5V15.5H0.5V0.5H2.16667ZM14.9107 3.24408L16.0892 4.42259L11.3333 9.1785L8.83333 6.67917L5.25593 10.2559L4.07741 9.07742L8.83333 4.32149L11.3333 6.82083L14.9107 3.24408Z" fill="#272835"/>
													</svg>
													{agent.sales_properties_last_12_months} {` `} {translate('salesInLast')} 12 {translate('months')}
												</span>
											</div>
										</td>

										<td className='py-3 px-4'>
											<div className="flex flex-col">
												<div className="flex item-center justify-between gap-3">
													<div className="">
														<h2 className="text-xl text-[#272835] mb-1">12 February 2024</h2>
														<p className="w-72">George met with us and spent time with us going over comps and providing us with ...</p>
													</div>
													<div className="flex items-center">
														<Link href={`find-agents/${agent.id}`} className="flex items-center justify-center p-3 border rounded-full hover:bg-[#34484F] ease-in-out duration-300 group">
															<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 group-hover:stroke-white ease-in-out duration-300">
																<path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
															</svg>
															<span class="sr-only">view agent details</span>
														</Link>
													</div>
												</div>
											</div>
										</td>

									</tr>
								))
							}
						</tbody>
					</table>
					{/* Pagenations */}
					{
						total / limit > 1 &&
						<div className="p-3 border-t">
							<ReactPagination pageCount={Math.ceil(listing.total / limit)} onPageChange={handlePageChange} />
						</div>
					}
				</div>
			</div>


			<div className="container mb-20 xl:mb-32">
				<p className="text-slate-500 mb-4">Whether you are looking to rent, buy or sell your home, Zillow's directory of local real estate agents and brokers in Orlando FL connects you with professionals who can help meet your needs. Because the Orlando FL real estate market is unique, it's important to choose a real estate agent or broker with local expertise to guide you through the process of renting, buying or selling your next home. Our directory helps you find real estate professionals who specialize in buying, selling, foreclosures, or relocation - among many other options. Alternatively, you could work with a local agent or real estate broker who provides an entire suite of buying and selling services.</p>
				<p className="text-slate-500">
					No matter what type of real estate needs you have, finding the local real estate professional you want to work with is the first step. The Orlando FL real estate directory lets you view and compare real estate agents, read reviews, see an agent's current listings and past sales, and contact agents directly from their profile pages on Zillow.
					Zillow is the leading real estate and rental marketplace dedicated to empowering consumers with data, inspiration and knowledge around the place they call home, and connecting them with the best local professionals who can help.</p>
			</div>

        </Layout>
    )
}

export default FindAgent
