import { Fragment, useState, useRef, useEffect } from "react";

import { translate } from "@/utils";


const InputPassword = ({ rule, placeholder, label, onValueChange }) => {

	const passwordElem = useRef();
	const [ruleColor, setRuleColor] = useState();
	const [showPassword, setShowPassword] = useState(true);
	const [ruleMessage, setRuleMessage] = useState(['ruleMessage']);
	const [matchMessage, setMatchMassage] = useState('passwordMatchMessage')
	const [ruleLevel, setRule] = useState({
		rule1: false,
		rule2: false,
		rule3: false,
		rule4: false,
	});

	// Style Elements:
	const inputStyle = `
		p-2.5 rounded-[8px] w-full border border-[#DFE1E7] outline-none focus:border-[#34484F]
	`;
	const ruleStyle = `
		w-full h-[8px] rounded-[8px] relative overflow-hidden bg-[#ECEFF3] ease-in-out duration-200
	`

	// Function Show/Hide password
	const showPasswordToggel = (e) => {
		e.preventDefault();
		setShowPassword(!showPassword);
		showPassword ? (passwordElem.current.type = 'text') : (passwordElem.current.type = 'password');
	};

	// Check Valedation element
	useEffect(() => {
		
		const handleVakidationInput = () => {
			let value = passwordElem.current.value;
			let score = 0;

			const hasNumber = /\d/.test(value);
			const hasUppercase = /[A-Z]/.test(value);
			const hasLowercase = /[a-z]/.test(value);
			const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
			const hasLength = value.length >= 8;
		
			// Check password length
			if (hasLength) score += 1;
			// // Contains lowercase
			if (hasLowercase) score += 1;
			// Contains uppercase
			if (hasUppercase) score += 1;
			// Contains numbers
			if (hasNumber) score += 1;
			// Contains special characters
			if (hasSymbol) score += 1;

			setRule({
				rule1: score >= 1,
				rule2: score >= 3,
				rule3: score >= 4,
				rule4: score >= 5,
			});

			score > 0 && setRuleColor('red');
			score > 2 && setRuleColor('orange');
			score > 3 && setRuleColor('orange');
			score > 4 && setRuleColor('green');
			
			const messages = ['mustContain'];
			!hasNumber && messages.push('passwordRuleNumber');
			!hasSymbol && messages.push('passwordRuleSymbol');
			!hasLength && messages.push('passwordRuleLength');
			!hasUppercase && messages.push('passwordRuleUppercase');
			// !hasLowercase && messages.push('passwordRuleLowercase');

			(hasLength && hasNumber && hasUppercase && hasSymbol)
			? setRuleMessage(['strongPassword'])
			: setRuleMessage(messages);

			score >= 5 ?  onValueChange(true, value) : onValueChange(false, '');
		};

		const handleDefultInput = () => {
			let value = passwordElem.current.value;
			onValueChange(true, value)
		}

		const currentTelElm = passwordElem.current;
		if (currentTelElm && rule) {
			currentTelElm.addEventListener('input', handleVakidationInput);
		}
		if (currentTelElm && !rule) {
			currentTelElm.addEventListener('input', handleDefultInput);
		}
		

		return () => {
			if (currentTelElm) {
				currentTelElm.removeEventListener('input', handleDefultInput);
			}
			if (currentTelElm && !rule) {
				currentTelElm.removeEventListener('input', handleDefultInput);
			}
		};

	}, [])

	return (
		<Fragment>
			<label className='d-block mb-1 text-[#272835] text-sm'>{translate(label)}</label>
			<div className="relative">
				<input 
					ref={passwordElem}
					type="password"
					className={inputStyle}
					placeholder={translate(placeholder)}
				/>
				<button onClick={(e) => showPasswordToggel(e)} className="absolute top-1/2 -translate-y-1/2 end-2">
					{
						showPassword ?
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#818898" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
								<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
							</svg>:
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#818898" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
							</svg>
					}
					<span className="sr-only">hide/show Password</span>
				</button>
			</div>
			
			{/* Password Role */}
			{
				rule &&
				<div className="flex flex-col gap-3 mt-2">
					<p className="text-sm text-[#818898]">{ruleMessage.map(rule => translate(rule)).join(', ')}</p>
					<div className="grid grid-cols-4 gap-2">
						<span className={ruleStyle} style={{ backgroundColor: ruleLevel.rule1 ? ruleColor : '#ECEFF3' }}></span>
						<span className={ruleStyle} style={{ backgroundColor: ruleLevel.rule2 ? ruleColor : '#ECEFF3' }}></span>
						<span className={ruleStyle} style={{ backgroundColor: ruleLevel.rule3 ? ruleColor : '#ECEFF3' }}></span>
						<span className={ruleStyle} style={{ backgroundColor: ruleLevel.rule4 ? ruleColor : '#ECEFF3' }}></span>
					</div>
				</div>

			}
		</Fragment>
	)
}

export default InputPassword
