import { translate } from '@/utils';
import React, { useState } from 'react';

const InputMultibleImage = ({ onValueChange }) => {
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      ...file,
      path: URL.createObjectURL(file), // Add path property to each file object
    }));
    setImages((prevImages) => {
      const updatedImages = [...prevImages, ...newImages];
      onValueChange(updatedImages);
      return updatedImages;
    });
  };

  const handleDelete = (e, index) => {
    e.preventDefault();
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      onValueChange(updatedImages);
      return updatedImages;
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    document.getElementById('fileInputLayouts')?.click();
  };

  return (
    <div>
      <div className="flex justify-between items-center my-6">
        <h2 className="text-2xl font-medium mb-2">{translate('addLayoutProperty')}</h2>
        <div className=" ">
          <button
            type='button'
            className="tw-btn-outline !px-7 !text-sm cursor-pointer relative"
            onClick={handleChange}
          >
            {translate('addLayout')}
          </button>
          <input
            id="fileInputLayouts"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-5 xl:grid-cols-4 gap-3'>
        {images.map((image, index) => (
          <div key={index} className="relative h-full w-full">
            <button
              onClick={(e) => handleDelete(e, index)}
              className="p-1.5 absolute -top-3 -right-3 z-[2] bg-red-500 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 stroke-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              <div className="sr-only">delete item</div>
            </button>
            <div className="relative pb-32 border border-[#ccc] rounded-lg overflow-hidden">
              <img 
                src={image.path}
                alt={image.name}
                className="object-cover absolute w-full h-full p-2"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputMultibleImage;
