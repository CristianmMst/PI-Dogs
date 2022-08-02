import { useDispatch, useSelector } from 'react-redux';
import style from './DogDetail.module.css';
import close from '../../img/close.png';
import { deleteDetail } from '../../redux/actions.js';
import { useNavigate } from 'react-router-dom';

const DogDetail = () => {
	const dispatch= useDispatch();
  const navigate = useNavigate()
	const dogDetail = useSelector((state) => state.dogDetail);
	const onClick = () => {
		dispatch(deleteDetail());
    navigate('/home')
	};
	return (
		<div className={style.contenedor}>
			<h1>Detalle de raza</h1>
			<div className={style.razaInfo}>
				<div onClick={onClick} className={style.close}>
					<img src={close} alt="close" />
				</div>
				<div className={style.razaInfo2}>
					<h2>{dogDetail?.nombre}</h2>
					<p>Peso: {dogDetail?.peso} kg</p>
					<p>Altura: {dogDetail?.altura}</p>
					<p>Años de vida: {dogDetail?.años_de_vida}</p>
					<h4>Temperementos</h4>
					<ul>
						{dogDetail.temperamento?.map((e) => (
							<li>{e}</li>
						))}
					</ul>
				</div>
				<img src={dogDetail.imagen} alt="perro" />
			</div>
		</div>
	);
};

export default DogDetail;
