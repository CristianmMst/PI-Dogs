import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDogDetail } from '../../redux/actions';
import style from './CardDogs.module.css';

const CardDog = ({ id, raza, peso, temperamento, imagen }) => {
	const dispatch = useDispatch();
	const handleOnClick = () => {
		dispatch(getDogDetail(id));
	};
	return (
		<>
			<div className={style.cardDog} key={id}>
				<h3>{raza}</h3>
				<div className={style.contenedorImg}>
					<img src={imagen} alt="perro" />
				</div>
				<div className={style.info}>
					<p>Peso: {peso} kg</p>
					<ul className={style.lisTemp}>
						{temperamento?.map((e, i) => {
							if (i > 3) {
								return '';
							}
							return <li key={i}>{e.trim()}</li>;
						})}
					</ul>
					<Link onClick={handleOnClick} to={'/home/dogDetail'}>
						See more...
					</Link>
				</div>
			</div>
		</>
	);
};

export default CardDog;
