import React, { Fragment, useEffect, useState } from 'react'
import ImageDropZone from '../ui/ImageDropZone'
import { translate } from '@/utils'

const ProperetyGellary = ({titleImageHandle, galleryImageHandler, titleImage, galleryImage}) => {
	
	const [ gallery, setGellary ] = useState(galleryImage || []);

	const handelTitleImage = (file) => {
		titleImageHandle(file)
	}

	const handelImage = (file) => {
		setGellary(prevGallery => {
			const updatedGallery = [...prevGallery, file];
			galleryImageHandler(updatedGallery);
			return updatedGallery;
		});
	}

	

	useEffect(() => {

	}, [galleryImage])

  return (
	<Fragment>
		<h3 className="text-xl font-medium">{translate('photo')}</h3>
		<p>{translate('manualUploadphoto')}</p>
		<div className='grid grid-cols-4 grid-rows-2 gap-3 mt-3 h-[480px]'>
			<div className="col-span-2 row-span-2">
				{	
					titleImage &&
					<ImageDropZone
						fileInputId="titleImage"
						btnDisclamer={true}
						srcValue={titleImage}
						onValueChange={handelTitleImage}
					/>
				}
			</div>
			{Array.from({ length: 4 }).map((_, idx) => (
				<div key={idx} className="">
					<ImageDropZone
					fileInputId={`gelleryImage${idx + 1}`}
					srcValue={galleryImage[idx] ? galleryImage[idx].image_url : null}
					onValueChange={handelImage}
					/>
				</div>
			))}
		</div>
	</Fragment>
  )
}

export default ProperetyGellary
