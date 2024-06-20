import { translate } from "@/utils";

const stateStyle1 = `w-full text-center rounded-full px-6 border border-[#DFE1E7] py-2 text-[#818898]`;
const stateStyle2 = `w-full text-center rounded-full px-6 py-2 border-2 border-[#34484F] text-[#34484F]`;
const stateStyle3 = `w-full text-center rounded-full px-6 py-2 bg-[#34484F] text-white`;

const AuthSteps = ({pathName}) => {

	return (
		<nav className="grid grid-cols-3 gap-2 mb-12 md:mb-0">
			<li className="flex items-center justify-center gap-2">
				<span className={stateStyle3}>{translate('email')}</span>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="size-4">
					<path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
				</svg>
			</li>
			<li className="flex items-center justify-center gap-2">
				<span className={
					pathName === '/verify-account' ? stateStyle2 : stateStyle3
				}>{translate('verify')}</span>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="size-4 opacity-50">
					<path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
				</svg>
			</li>
			<li className="flex items-center justify-center gap-2 opacity-80">
				<span className={
					pathName === '/complete-account' ? stateStyle2 :
					pathName === '/verify-account' ? stateStyle1 : stateStyle2
				}>{translate('complete')}</span>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="size-4 opacity-0">
					<path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
				</svg>
			</li>
		</nav>
	)
}

export default AuthSteps
