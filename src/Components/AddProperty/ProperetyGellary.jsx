import React, { Fragment, useState } from 'react'
import ImageDropZone from '../ui/ImageDropZone'
import { translate } from '@/utils'

const ProperetyGellary = ({titleImageHandle, galleryImageHandler}) => {
	
	const [ gallery, setGellary ] = useState([]);

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

  return (
	<Fragment>
		<h3 className="text-xl font-medium">{translate('photo')}</h3>
		<p>{translate('manualUploadphoto')}</p>
		<div className='grid grid-cols-4 grid-rows-2 gap-3 mt-3 h-[480px]'>
			<div className="col-span-2 row-span-2">
				<ImageDropZone
					btnDisclamer={true}
					onValueChange={handelTitleImage}
				/>
			</div>
			<div className="">
				<ImageDropZone
					onValueChange={handelImage}
				/>
			</div>
			<div className="">
				<ImageDropZone
					onValueChange={handelImage}
				/>
			</div>
			<div className="">
				<ImageDropZone
					onValueChange={handelImage}
				/>
			</div>
			<div className="">
				<ImageDropZone
					onValueChange={handelImage}
				/>
			</div>
		</div>
	</Fragment>
  )
}

export default ProperetyGellary
