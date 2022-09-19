import React from 'react';
import { Link } from 'react-router-dom';
import style from './CardDogs.module.css';

const CardDog = ({ id, raza, peso, temperamento, imagen }) => {
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
						{temperamento
							? temperamento.map((e, i) => {
									if (i > 3) {
										return '';
									}
									return <li key={i}>{e.trim()}</li>;
							  })
							: null}
					</ul>
					<Link to={`/dogDetail/${id}`}>See more...</Link>
				</div>
			</div>
		</>
	);
};

export default CardDog;
