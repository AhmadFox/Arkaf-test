import { translate } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CardSubtitle, CardTitle } from 'react-bootstrap';

import pgIcon from "@/assets/icons/pg.png";
import vrIcon from "@/assets/icons/vr.png";
import pmIcon from "@/assets/icons/pm.png";

const OurServices = () => {

	const services = [
		{
			image: pgIcon,
			title: "professionalPhotography",
			subtitle: "serviceBody1",
			url: "#",
		},
		{
			image: vrIcon,
			title: "virtualTour",
			subtitle: "serviceBody1",
			url: "#",
		},
		{
			image: pmIcon,
			title: "Property Staging",
			subtitle: "serviceBody1",
			url: "#",
		}
	]
	return (
		<section id="ourServices" className='page-section'>
			<div className="container">
				<p className="section-title h3">{translate('ourServices')}</p>
				<ul className="serv_grid">
					{
						services && services.map((item, idx) => (
							<li className="card" key={idx}>
								<div className="card-body">
									<Image
										src={item.image}
										alt={`${translate(item.title)} Icon Services`}
										width={32}
										height={32}
									/>
									<CardTitle>{translate(item.title)}</CardTitle>
									<CardSubtitle>{translate(item.subtitle)}</CardSubtitle>

									<div className="card-footer">
										<button className='button button-outline' aria-label={`Learn more about ${item.title}`} disabled={idx === 2}>
											{translate('seeMore')}
											<span className="hidden-text-seo">Learn more about Service {item.title}</span>
										</button>
									</div>
								</div>
							</li>
						))
					}
				</ul>
			</div>
		</section>
	)
}

export default OurServices
