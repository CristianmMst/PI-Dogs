import { useNavigate } from 'react-router-dom'

export default function Landing() {
	const navigate = useNavigate();
	const handleOnClick = () => {
		navigate('/home');
	};
	return (
		<>
			<h1>Landing</h1>
			<button type="button" onClick={handleOnClick}>
				Go to home
			</button>
		</>
	);
}
