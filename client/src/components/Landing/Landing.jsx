import { useNavigate } from 'react-router-dom';
import style from './Landing.module.css';

export default function Landing() {
	const navigate = useNavigate();
	const handleOnClick = () => {
		navigate('/home');
	};
	return (
		<div className={style.contenedor}>
			<ul>
				<li>
					<h1>Bienvenidos</h1>
				</li>
				<li>
					<h1>PI - Dogs</h1>
				</li>
			</ul>
			<button type="button" onClick={handleOnClick}>
				Go to home
			</button>
		</div>
	);
}
