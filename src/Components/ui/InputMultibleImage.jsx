import React, { useState } from 'react';

const InputMultibleImage = ({ onValueChange }) => {
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      file.path = URL.createObjectURL(file); // Add path property to each file object
    });

    setImages(files);
    onValueChange(files);
  };

  useState(() => {
	console.log('images', images);
  }, [])

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <div>
        {images.map((image, index) => (
          <img key={index} src={image.path} alt={image.name} width="100" />
        ))}
      </div>
    </div>
  );
};

export default InputMultibleImage;



// import { translate } from '@/utils';
// import Image from 'next/image';
// import React, { Fragment, useCallback, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// // import { FaTrash, FaEdit } from 'react-icons/fa';

// const InputMultibleImage = ({ onValueChange, height }) => {
//   const [image, setImage] = useState(null);
//   const [invalidFile, setInvalidFile] = useState(false);

//   const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
//     if (rejectedFiles.length > 0) {
//       setInvalidFile(true);
//       setTimeout(() => setInvalidFile(false), 4000);
//       return;
//     }
    
//     const file = acceptedFiles[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImage(reader.result);
//         onValueChange(file);
//       };
//       reader.readAsDataURL(file);
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'image/png': ['.png', '.webp', '.jpeg', '.jpg'],
//       'text/html': ['.html', '.htm'],
//     },
//     multiple: true,
//   });

//   const handleDelete = (e) => {
//     e.preventDefault();
//     setImage(null);
//     onValueChange(null);
//   };

//   const handleChange = (e) => {
//     e.preventDefault();
//     document.getElementById('fileInput')?.click();
//   };

//   return (
//     <div 
//       className={`flex flex-col items-center relative overflow-hidden justify-center h-full ${height}`}
//     >
//       {!image ? (
//         <div
//           {...getRootProps()}
//           className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
//         >
//           <input {...getInputProps()} />
//           {isDragActive ? (
//             <p className='text-green-800'>{translate('dropTheFilesHere')}</p>
//           ) : (
//             invalidFile ?
//             <div className="text-red-600 text-center ">
//               <h3 className='font-mediun'>{translate('invalidFileFormat')}</h3>
//               <p className='text-sm'>{translate('acceeptImageFormat')}</p>
//             </div>:
//             <span className='bg-[#ECEFF3] rounded-full p-2'>
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
//                   <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
//                 </svg>

//             </span>
//           )}
//         </div>
//       ) : (
//         <div className="relative w-full h-full overflow-hidden">
//           <Image
//             src={image}
//             alt="Dropped"
//             fill
//             className="object-cover"
//           />
//           <div className="absolute bottom-5 right-5 flex flex-row-reverse gap-2">
//             <button
//               onClick={handleDelete}
//               className="tw-btn-outline tw-btn-sm tw-btn-outline-dangor w-24"
//             >
//               {translate('delete')}
//             </button>
//             <button
//               onClick={handleChange}
//               className="tw-btn-outline tw-btn-sm w-24"
//             >
//              {translate('change')}
//             </button>
//           </div>
//           <input
//             id="fileInput"
//             type="file"
//             accept="image/png, image/jpeg, image/jpg, image/webp"
//             onChange={(e) => {
//               if (e.target.files && e.target.files[0]) {
//                 const file = e.target.files[0];
//                 const reader = new FileReader();
//                 reader.onload = () => {
//                   setImage(reader.result);
//                 };
//                 reader.readAsDataURL(file);
//               }
//             }}
//             className="hidden"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default InputMultibleImage;
