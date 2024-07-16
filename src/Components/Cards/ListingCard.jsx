import Image from 'next/image'

import { settingsData } from "@/store/reducer/settingsSlice";

import { placeholderImage, translate, formatPriceAbbreviated, isThemeEnabled } from "@/utils";

import { useSelector } from 'react-redux';

const ListingCard = ({ data }) => {

	console.log('datadatadatadata', data);
	const themeEnabled = isThemeEnabled();
	const priceSymbol = useSelector(settingsData);
    const CurrencySymbol = priceSymbol && priceSymbol.currency_symbol;
	return (
		<div className='flex gap-3 group'>
			{
				data.title_image &&
				<div className="relative overflow-hidden w-48 rounded-xl">
					<Image
						loading="lazy"
						src={data.title_image}
						alt="no_img"
						fill
						className="object-cover bg-slate-100 scale-100 group-hover:scale-105 ease-in-out duration-500"
						onError={placeholderImage} />
				</div>
			}
			<div className={`flex-grow-1 flex flex-col gap-2 my-2 justify-center ${data.title_image ? 'w-8/12' : 'w-full'}`}>
				<div className="rounded-full border font-light text-sm py-1 px-3.5 w-max">{translate(data.category.category)}</div>
				<span className='text-xl xl:text-xl font-medium'>{formatPriceAbbreviated(data.price)} {CurrencySymbol}</span>
				<span className="text-slate-500 font-light truncate whitespace-nowrap overflow-hidden max-w-[280px]">{data.address}</span>
				<div className="d-flex gap-2 flex-wrap h-8">
					{data.parameters &&
						data.parameters.slice(0, 4).map((elem, index) => (
							elem?.value !== "" && elem?.value !== "0" &&
							<div className="flex flex-wrap gap-2" key={index}>
								<div className="flex items-center gap-1.5 px-2 py-1 text-sm border rounded-full">
									{themeEnabled ? (

										<ImageToSvg imageUrl={elem?.image} />
									) : (
										<Image loading="lazy" src={elem?.image} alt="no_img" width={20} height={20} onError={placeholderImage} />
									)}
									<p className="text_footer">
										{Array.isArray(elem?.value) ? elem.value.slice(0, 2).join(', ') : elem.value}
										{
											elem?.name !== 'Size' &&
											<span> {elem?.name}</span>
										}
									</p>
								</div>

							</div>

						))}
				</div>
			</div>
		</div>
	)
}

export default ListingCard
