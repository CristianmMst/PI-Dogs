import React from 'react';
import { useState } from 'react';
import style from './Paginado.module.css';
import next from '../../img/next.png';
import prev from '../../img/prev.png';

const Paginado = ({ pagina, setPagina, maximo }) => {
	const [input, setInput] = useState(1);
	const nextPage = () => {
		setInput(parseInt(input) + 1);
		setPagina(parseInt(pagina) + 1);
	};
	const prevPage = () => {
		setInput(parseInt(input) - 1);
		setPagina(parseInt(pagina) - 1);
	};

	return (
		<div className={style.contenedor}>
			<button onClick={prevPage} disabled={pagina === 1 || pagina < 1}>
				<img src={prev} alt="next" />
			</button>
			<ul>
				<li>{pagina}</li>
				<p>-</p>
				<li>{Math.ceil(maximo)}</li>
			</ul>
			<button
				onClick={nextPage}
				disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)}
			>
				<img src={next} alt="next" />
			</button>
		</div>
	);
};

export default Paginado;
