import style from './Navbar.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import perroImg from '../../img/perro.png';
import search from '../../img/search.png';
import { getAllDogs, searchDog } from '../../redux/actions';

export default function Navbar({ setPagina }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [input, setInput] = useState('');
  const onClickHome = () => {
    dispatch(getAllDogs())
		navigate('/home');
    setInput('')
  }
	const onClickCreate = () => {
		navigate('/home/createDog');
	};

	const handleOnKeyDown = (e) => {
		if (e.keyCode === 13) {
			setInput('');
		}
	};
	const handleOnChangeInput = (e) => {
		setInput(e.target.value);
		setPagina(1);
	};
	const handleOnClick = () => {
		dispatch(searchDog(input));
	};

	return (
		<nav className={style.navContainer}>
			<div onClick={onClickHome} className={style.imgDog}>
				<img src={perroImg} alt="perro" />
			</div>
			<div className={style.search}>
				<input
					type="text"
					onChange={(e) => handleOnChangeInput(e)}
					onKeyDown={(e) => handleOnKeyDown(e)}
					value={input}
					placeholder="Buscar raza..."
				/>
				<div onClick={(e) => handleOnClick(e)} className={style.buttonSearch}>
					<p>Buscar</p>
					<img src={search} alt="search" />
				</div>
			</div>
			<div className={style.createDog}>
				<button onClick={onClickCreate} type="button">
					Crear Raza
				</button>
			</div>
		</nav>
	);
}
