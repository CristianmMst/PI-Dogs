import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createDog } from '../../redux/actions.js';
import style from './CreateDog.module.css';
import close from '../../img/close.png';

export default function Form() {
	const temperamentos = useSelector((state) => state.temperaments);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [errors, setErrors] = useState({});
	const [input, setInput] = useState({
		name: '',
		height_min: '',
		height_max: '',
		weight_min: '',
		weight_max: '',
		life_span_min: '',
		life_span_max: '',
		temperaments: [],
	});
	const [inputImg, setInputImg] = useState({
		name: '',
		image: '',
		height_min: '',
		height_max: '',
		weight_min: '',
		weight_max: '',
		life_span_min: '',
		life_span_max: '',
		temperaments: [],
	});
	const onClick = () => {
		navigate('/home');
	};
	const handleSelect = (e) => {
		setInput({
			...input,
			temperaments: [...input.temperaments, e.target.value],
		});
    setInputImg({
			...inputImg,
			temperaments: [...inputImg.temperaments, e.target.value],
		});
	};
	const validate = (input) => {
		const error = {};
		if (!input.name) {
			error.name = 'Nombre de raza raquerido';
		} else if (!input.height_min || !input.height_max) {
			error.height = 'Altura requerida';
		} else if (parseInt(input.height_min) > parseInt(input.height_max)) {
			error.height = 'La altura minima debe ser menor que la maxima';
		} else if (!input.weight_min || !input.weight_max) {
			error.weight = 'Peso requerido';
		} else if (parseInt(input.weight_min) > parseInt(input.weight_max)) {
			error.weight = 'El peso minimo debe ser mayor que el maximo';
		} else if (parseInt(input.life_span_min) > parseInt(input.life_span_max)) {
			error.life = 'El año minimo debe ser mayor que el maximo';
		}
		return error;
	};
	const handleOnChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setInputImg({
			...inputImg,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (inputImg.image.length === 0) {
			dispatch(createDog(input));
		} else {
			dispatch(createDog(inputImg));
		}

		setInput({
			name: '',
			image: '',
			height_min: 0,
			height_max: 0,
			weight_min: 0,
			weight_max: 0,
			life_span_min: 0,
			life_span_max: 0,
			temperaments: [],
		});
		navigate('/home');
	};
	const handleBlur = () => {
		setErrors(validate(input));
	};
	return (
		<div className={style.contenedor}>
			<h1>Crea tu raza</h1>
			<form className={style.formulario} onSubmit={(e) => handleSubmit(e)}>
				<div className={style.nombre}>
					<label>Nombre</label>
					<input
						className={errors.name ? style.nameError : null}
						onBlur={handleBlur}
						onChange={(e) => handleOnChange(e)}
						type="text"
						value={input.name}
						name={'name'}
						placeholder="Raza"
					/>
				</div>
				<div className={style.nombre}>
					<label>Imagen</label>
					<input
						onChange={(e) => handleOnChange(e)}
						type="text"
						value={inputImg.image}
						name={'image'}
						placeholder="URL"
					/>
				</div>
				<div className={style.all}>
					<label>Altura</label>
					<div className={style.allInput}>
						<input
							onFocus={handleBlur}
							onBlur={handleBlur}
							className={
								errors.height ? `${style.nameError} ${style.left}` : style.left
							}
							onChange={(e) => handleOnChange(e)}
							type="number"
							value={input.height_min}
							name={'height_min'}
							placeholder="Min"
						/>
						<div></div>
						<input
							onBlur={handleBlur}
							className={
								errors.height
									? `${style.nameError} ${style.right}`
									: style.right
							}
							onChange={(e) => handleOnChange(e)}
							type="number"
							value={input.height_max}
							name={'height_max'}
							placeholder="Max"
						/>
					</div>
				</div>
				<div className={style.all}>
					<label>Peso</label>
					<div className={style.allInput}>
						<input
							onBlur={handleBlur}
							className={
								errors.weight ? `${style.nameError} ${style.left}` : style.left
							}
							onChange={(e) => handleOnChange(e)}
							type="number"
							value={input.weight_min}
							name={'weight_min'}
							placeholder="Min"
						/>
						<div></div>
						<input
							onBlur={handleBlur}
							className={
								errors.weight
									? `${style.nameError} ${style.right}`
									: style.right
							}
							onChange={(e) => handleOnChange(e)}
							type="number"
							value={input.weight_max}
							name={'weight_max'}
							placeholder="Max"
						/>
					</div>
				</div>
				<div className={style.all}>
					<label>Años de vida</label>
					<div className={style.allInput}>
						<input
							onBlur={handleBlur}
							className={
								errors.life ? `${style.nameError} ${style.left}` : style.left
							}
							onChange={(e) => handleOnChange(e)}
							type="number"
							name={'life_span_min'}
							value={input.life_span_min}
							placeholder="Min"
						/>
						<div></div>
						<input
							onBlur={handleBlur}
							className={
								errors.life ? `${style.nameError} ${style.right}` : style.right
							}
							onChange={(e) => handleOnChange(e)}
							type="number"
							name={'life_span_max'}
							value={input.life_span_max}
							placeholder="Max"
						/>
					</div>
				</div>
				<div className={style.temperamentSelect}>
					<select defaultValue={'default'} onChange={(e) => handleSelect(e)}>
						<option value="default" hidden>
							Temperamentos
						</option>
						{temperamentos?.map((t, index) => (
							<option key={index} value={t.name}>
								{t.name}
							</option>
						))}
					</select>
				</div>
				<div className={style.temperaments}>
					<ul>
						{input.temperaments?.map((t, index) => (
							<li key={index}>
								<span>{t}</span>
							</li>
						))}
					</ul>
				</div>
				{errors.name ? (
					<p>{errors.name}</p>
				) : errors.height ? (
					<p>{errors.height}</p>
				) : errors.weight ? (
					<p>{errors.weight}</p>
				) : (
					<p>{errors.life}</p>
				)}
				{input.name === '' ||
				input.height_min === '' ||
				input.height_max === '' ||
				input.weight_min === '' ||
				input.weight_max === '' ||
				Object.keys(errors).length > 0 ? (
					<button className={style.btnSubmitDi} type="submit" disabled>
						Crear
					</button>
				) : (
					<button className={style.btnSubmit} type="submit">
						Crear
					</button>
				)}
				<div className={style.close} onClick={onClick}>
					<img src={close} alt="close" />
				</div>
			</form>
		</div>
	);
}
