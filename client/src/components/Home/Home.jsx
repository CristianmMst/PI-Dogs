import Navbar from '../Navbar/Navbar.jsx';
import Paginado from '../Paginado/Paginado.jsx';
import CardDog from '../CardDog/CardDog.jsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, getAllTemperament } from '../../redux/actions.js';
import style from './Home.module.css';
import {
	orderByWeight,
	orderByAsc,
	orderByTemp,
	orderByBreed,
} from '../../redux/actions';

export default function Home() {
	const perros = useSelector((state) => state.dogs);
	const [pagina, setPagina] = useState(1);
	const [porPagina, setPorPagina] = useState(8);
	const [ordenado, setOrdenado] = useState('');
	const temperamentos = useSelector((state) => state.temperaments);
	const dispatch = useDispatch();
	const maximo = perros.length / porPagina;
	const onChageBreed = (e) => {
		setPagina(1);
		dispatch(orderByBreed(e.target.value));
	};
	const onChageWeight = (e) => {
		setPagina(1);
		dispatch(orderByWeight(e.target.value));
		setOrdenado(`Ordenado por ${e.target.value}`);
	};
	const onChangeASCDES = (e) => {
		setPagina(1);
		dispatch(orderByAsc(e.target.value));
		setOrdenado(`Ordenado por ${e.target.value}`);
	};
	const handleOnChangeSelect = (e) => {
		dispatch(orderByTemp(e.target.value));
		setPagina(1);
	};
	useEffect(() => {
		dispatch(getAllTemperament());
		dispatch(getAllDogs());
	}, []);
	return (
		<div className={style.contenedor}>
			<Navbar setPagina={setPagina} setOrdenado={setOrdenado} />
			<div className={style.select}>
				<select onChange={(e) => onChangeASCDES(e)} defaultValue={'A - Z'}>
					<option value={'A - Z'}>A - Z</option>
					<option value={'Z - A'}>Z - A</option>
				</select>
				<select onChange={(e) => onChageWeight(e)} defaultValue={'Peso'}>
					<option value={'Peso'} hidden>
						Peso (Kg)
					</option>
					<option>Menor</option>
					<option>Mayor</option>
				</select>
				<select
					onChange={(e) => handleOnChangeSelect(e)}
					defaultValue={'default'}
				>
					<option value={'default'} hidden>
						Temperamentos
					</option>
					<option>All</option>
					{temperamentos?.map((t) => {
						return <option key={t.id}>{t.name}</option>;
					})}
				</select>
				<select onChange={(e) => onChageBreed(e)} defaultValue={'Razas'}>
					<option value={'Razas'} hidden>
						Razas
					</option>
					<option>Creadas</option>
					<option>Existentes</option>
				</select>
			</div>
			{perros.length > 0 ? (
				<>
					<div className={style.allDogs}>
						{perros
							?.slice(
								(pagina - 1) * porPagina,
								(pagina - 1) * porPagina + porPagina
							)
							.map((p) => {
								return (
									<CardDog
										key={p.id}
										id={p.id}
										raza={p.raza}
										peso={p.peso}
										temperamento={p.temperamento}
										imagen={p.imagen}
									/>
								);
							})}
					</div>
				<Paginado pagina={pagina} setPagina={setPagina} maximo={maximo} />
				</>
			) : (
				<h2>Raza no encontrada</h2>
			)}
		</div>
	);
}
