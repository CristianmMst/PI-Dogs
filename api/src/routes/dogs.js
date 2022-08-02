const axios = require('axios');
const { parse } = require('dotenv');
const { Router } = require('express');
const { Breed, Temperament, Op } = require('../db.js');

const router = Router();

router.get('/', async (req, res) => {
	const { name } = req.query;
	const dogs = await axios(`https://api.thedogapi.com/v1/breeds`);
	const dogsDbAll = await Breed.findAll({
		include: {
			model: Temperament,
		},
	});
	const dogsDbAll2 = dogsDbAll.map((d) => {
		return {
			id: d.id,
			raza: d.name,
			peso: `${d.weight_min} - ${d.weight_max}`,
			weight_min: d.weight_min,
			weight_max: d.weight_max,
			temperamento: d.Temperaments.map((e) => e.name),
			imagen: d.image,
		};
	});
	const dogsDatosNecesarios = dogs.data.map((dog) => {
		return {
			id: dog.id,
			raza: dog.name,
			peso: dog.weight.metric,
			weight_min: parseInt(dog.weight.metric.split('-')[0]),
			weight_max: parseInt(dog.weight.metric.split('-')[1]),
			temperamento: dog.temperament?.trim().split(','),
			imagen: dog.image.url,
		};
	});
	const dogsByName = dogs.data.filter((e) => {
		return e.name?.toLowerCase().includes(name?.toLowerCase());
	});
	const dogsByNameDb = dogsDbAll.filter((dog) => {
		return dog.name?.toLowerCase().includes(name?.toLowerCase());
	});
	const datosNecesariosDb = dogsByNameDb.map((e) => {
		return {
			id: e.id,
			raza: e.name,
			peso: `${e.weight_min} - ${e.weight_max}`,
		};
	});
	const datosNecesarios = dogsByName.map((e) => {
		return {
			id: e.id,
			raza: e.name,
			peso: e.weight.metric,
			temperamento: e.temperament?.trim().split(','),
			imagen: e.image.url,
		};
	});
	try {
		if (name && dogsByName.length === 0 && dogsDbAll2.length === 0)
			return res.json({ msg: 'Raza no encontrada' });
		if (!name || name?.length === 0)
			return res.json(dogsDatosNecesarios.concat(dogsDbAll2));
		if (name) return res.json(datosNecesarios.concat(datosNecesariosDb));
	} catch (error) {
		return res.json({ msg: error.message });
	}
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const dogs = await axios(`https://api.thedogapi.com/v1/breeds`);
	const dogsById = dogs.data.find((dog) => dog.id == Number(id));
	try {
		if (id.length <= 3 && dogsById) {
			const datosNecesarios = {
				id: dogsById.id,
				nombre: dogsById.name,
				peso: dogsById.weight.metric,
				altura: dogsById.height.metric,
				años_de_vida: dogsById.life_span,
				temperamento: dogsById?.temperament?.trim().split(','),
				imagen: dogsById.image.url,
			};
			res.json(datosNecesarios);
		} else if (id.length === 36) {
			const dogsDb = await Breed.findByPk(id, {
				include: {
					model: Temperament,
				},
			});
			const datosNecesarios = {
				id: dogsDb.id,
				raza: dogsDb.name,
				peso: `${dogsDb.weight_min} - ${dogsDb.weight_max}`,
				altura: `${dogsDb.height_min} - ${dogsDb.height_max}`,
				años_de_vida: `${dogsDb.life_span_min} - ${dogsDb.life_span_max}`,
				temperamento: dogsDb.Temperaments.map((e) => e.name),
				imagen: dogsDb.image,
			};
			res.json(datosNecesarios);
		} else res.status(404).send('ID no encontrado');
	} catch (error) {
		res.json({ msg: error.message });
	}
});

router.post('/', async (req, res) => {
	try {
		const {
			name,
			height_min,
			height_max,
			weight_min,
			weight_max,
			life_span_min,
			life_span_max,
			temperaments,
			image,
		} = req.body;
		if (
			!name ||
			!height_min ||
			!height_max ||
			!weight_min ||
			!weight_max ||
			!life_span_min ||
			!life_span_max ||
			!temperaments
		)
			return res.send('Faltan informacion');

		const existeRaza = await Breed.findAll({ where: { name } });
		const temperamentFilter = await Temperament.findAll({
			where: { name: temperaments },
		});
		if (existeRaza.length > 0) res.status(400).send('Esta raza ya existe');
		else {
			const dog = await Breed.create({
				name,
				height_min,
				height_max,
				weight_min,
				weight_max,
				life_span_min,
				life_span_max,
				image,
			});
			dog.addTemperament(temperamentFilter);
			res.send('Raza creada');
		}
	} catch (error) {
		console.log(error.message);
	}
});

module.exports = router;
