import React from 'react'

const Badeg = ({ icon, count, type }) => {
  return (
	<div className={`
		border px-2.5 py-1.5 rounded-full w-fit text-sm flex items-center gap-1.5
		${type === 'Sold' && 'border-0 text-red-500 bg-red-100'}
		${type === 'Rented' && 'border-0 text-red-500 bg-red-100'}
		${type === 'Available' && 'border-0 text-green-700 bg-green-100'}
		${type === 'On Agent' && 'border-0 text-indigo-600 bg-indigo-100'}
		${type === 'Unavailable' && 'border-0 text-slate-600 bg-slate-100'}
	`}>
		{
			icon === 'eye' ?
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
				<path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
				<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
			</svg>:
			icon === 'hert' ?
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FF7676" className="size-5">
				<path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
			</svg>:
			icon === 'share' ?
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#EBD58B" className="size-5">
				<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
			</svg>: null
		}
	  {count}
	</div>
  )
}

export default Badeg