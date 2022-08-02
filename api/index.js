const axios = require('axios');
const server = require('./src/app.js');
const { sequelize, Temperament } = require('./src/db.js');

// const temperamentDb = async (req, res) => {
//   const temperamentsExiste = await Temperament.findAll()
//   if(temperamentsExiste.length > 0) res.status(500).send('Temperamentos ya existentes')
// 	const arrayTemperament = [];
// 	const response = await axios(`https://api.thedogapi.com/v1/breeds`);
// 	const response2 = response.data.map((e) => e.temperament?.trim().split(','));
// 	response2.map((e) => {
// 		return e?.map((el) => arrayTemperament.push(el.trim()));
// 	});
// 	const temperamentFilter = new Set(arrayTemperament);
// 	const temperamentFilter2 = Array.from(temperamentFilter);
// 	temperamentFilter2.map((e) => {
// 		Temperament.bulkCreate([{ name: e }]);
// 	});
// };

// Syncing all the models at omce.
sequelize.sync({ force: false }).then(() => {
	// temperamentDb();
	server.listen(3001, () => {
		console.log('listening at 3001');
	});
});
