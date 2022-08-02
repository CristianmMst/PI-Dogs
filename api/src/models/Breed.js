const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'Breed',
		{
			id: {
				type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
        unique: true
			},
			height_min: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
      height_max: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			weight_min: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
      weight_max: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			life_span_min: {
				type: DataTypes.INTEGER,
			},
      life_span_max: {
				type: DataTypes.INTEGER,
			},
      image: {
        type: DataTypes.STRING,
        defaultValue: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fac%2F3f%2F64%2Fac3f641fcd9ef14f95ab01cc483723c4.jpg&f=1&nofb=1'
      }
		},
		{
			timestamps: false,
		}
	);
};
