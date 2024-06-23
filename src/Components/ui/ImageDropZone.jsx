import { translate } from '@/utils';
import Image from 'next/image';
import React, { Fragment, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
// import { FaTrash, FaEdit } from 'react-icons/fa';

const ImageDropZone = ({ onValueChange, btnDisclamer, height }) => {
  const [image, setImage] = useState(null);
  const [invalidFile, setInvalidFile] = useState(false);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setInvalidFile(true);
      setTimeout(() => setInvalidFile(false), 4000);
      return;
    }
    
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        onValueChange(file);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png', '.webp', '.jpeg', '.jpg'],
      'text/html': ['.html', '.htm'],
    },
    multiple: false,
  });

  const handleDelete = (e) => {
    e.preventDefault();
    setImage(null);
    onValueChange(null);
  };

  const handleChange = (e) => {
    e.preventDefault();
    document.getElementById('fileInput')?.click();
  };

  return (
    <div 
      className={`flex flex-col items-center relative overflow-hidden justify-center h-full drag-zone bg-[#F6F8FA] border-[#A4ACB9] rounded-xl ease-in-out duration-500 ${invalidFile && '!bg-red-100'} ${height}`}
      style={{ backgroundColor: isDragActive && "#DFFFF0" }}
    >
      {!image ? (
        <div
          {...getRootProps()}
          className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className='text-green-800'>{translate('dropTheFilesHere')}</p>
          ) : (
            invalidFile ?
            <div className="text-red-600 text-center ">
              <h3 className='font-mediun'>{translate('invalidFileFormat')}</h3>
              <p className='text-sm'>{translate('acceeptImageFormat')}</p>
            </div>:
            btnDisclamer ?
            <Fragment>
              <span className="bg-white text-sm py-2 px-3 rounded-md border">{translate('clickOrDropImages')}</span>
              <div className='my-2 w-1/4 text-center relative before:contet-[""] before:absolute before:bg-[#E0E0E0] before:h-[1px] before:top-1/2 before:left-0 before:w-1/3 after:absolute after:bg-[#E0E0E0] after:h-[1px] after:top-1/2 after:right-0 after:w-1/3'>
                <span className='bg-[#F6F8FA] text-[#616161]'>Or</span>
              </div>
              <button onClick={(e) => e.preventDefault()} className="tw-btn-outline bg-white !font-normal !text-[#0F2932] !py-2 !px-4 text-sm">{translate('requestPhotoService')}</button>
              <p className='text-sm absolute bottom-6 z-[2]'>{translate('acceeptImageFormat')}</p>
            </Fragment> : 
            <span className='bg-[#ECEFF3] rounded-full p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                  <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                </svg>

            </span>
          )}
        </div>
      ) : (
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={image}
            alt="Dropped"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-5 right-5 flex flex-row-reverse gap-2">
            <button
              onClick={handleDelete}
              className="tw-btn-outline tw-btn-sm tw-btn-outline-dangor w-24"
            >
              {translate('delete')}
            </button>
            <button
              onClick={handleChange}
              className="tw-btn-outline tw-btn-sm w-24"
            >
             {translate('change')}
            </button>
          </div>
          <input
            id="fileInput"
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                  setImage(reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default ImageDropZone;
