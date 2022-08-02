const axios = require('axios');
const { Router } = require('express');
const { Temperament } = require('../db.js');

const router = Router();

router.get('/', async (req, res) => {
  const temperamentsExiste = await Temperament.findAll()
	const arrayTemperament = [];
	const response = await axios(`https://api.thedogapi.com/v1/breeds`);
	const response2 = response.data.map((e) => e.temperament?.trim().split(','));
	response2.map((e) => {
		return e?.map((el) => arrayTemperament.push(el.trim()));
	});
	const temperamentFilter = new Set(arrayTemperament);
  const temperamentFilter2 = Array.from(temperamentFilter)
	res.json(temperamentsExiste);
});

module.exports = router;
