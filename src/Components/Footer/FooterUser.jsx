import Link from "next/link";
import { translate } from "@/utils";

const FooterUser = () => {

	const currentYear = new Date().getFullYear();
	
	return (
		<footer className="mt-auto">
			<div className="container">
				<div className="flex justify-center items-end py-6 mt-4">
					<p className="text-sm">{translate("copyright")} {currentYear} Arkaf</p>
					<Link href="/help" className="ms-auto text-sm border border-[#DFE1E7] py-2.5 px-3 rounded-md flex items-center gap-1 text-[#272835] hover:text-white hover:bg-[#34484F] ease-in-out duration-200">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 -ms-1">
							<path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
						</svg>
						{translate('getHelp')}
					</Link>
				</div>
			</div>
		</footer>
	)
}

export default FooterUser
