import {
	DELETE_DETAIL,
	GET_TEMPERAMENTS,
	GET_ALL_DOGS,
	GET_DOG_DETAIL,
	SEARCH_DOG,
	ORDER_BY_TEMP,
	ORDER_BY_ASCDES,
	ORDER_BY_WEIGHT,
	ORDER_BY_BREED,
} from './actions.js';

const initialState = {
	dogs: [],
	dogDetail: [],
	temperaments: [],
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_DOGS:
			return {
				...state,
				dogs: action.payload,
			};
		case GET_TEMPERAMENTS:
			return {
				...state,
				temperaments: action.payload,
			};
		case SEARCH_DOG:
			return {
				...state,
				dogs: action.payload,
			};
		case ORDER_BY_TEMP:
			const allDogs = action.payload;
			if (action.temp === 'All') {
				return {
					...state,
					dogs: allDogs,
				};
			}
			return {
				...state,
				dogs: allDogs?.filter((d) => {
					const dogsTrim = d.temperamento
						? d.temperamento.map((e) => e.trim())
						: null;
					const dogsFilter = dogsTrim ? dogsTrim.includes(action.temp) : null;
					return dogsFilter;
				}),
			};
		case ORDER_BY_ASCDES:
			const ascOrDes =
				action.payload === 'A - Z'
					? state.dogs.sort((a, b) =>
							a.raza.toLowerCase() > b.raza.toLowerCase() ? 1 : -1
					  )
					: state.dogs.sort((a, b) =>
							a.raza.toLowerCase() < b.raza.toLowerCase() ? 1 : -1
					  );
			return {
				...state,
				dogs: ascOrDes,
			};
		case ORDER_BY_WEIGHT:
			const dogsAll = state.dogs.filter((d) => d.weight_min);
			const weight =
				action.payload === 'Menor'
					? dogsAll.sort((a, b) => a.weight_min - b.weight_min)
					: dogsAll.sort((a, b) => b.weight_max - a.weight_max);
			return {
				...state,
				dogs: weight,
			};
		case ORDER_BY_BREED:
			return {
				...state,
				dogs:
					action.order === 'Creadas'
						? state.dogs.filter((d) => typeof d.id === 'string')
						: action.payload.filter((d) => typeof d.id !== 'string'),
			};
		case GET_DOG_DETAIL:
			return {
				...state,
				dogDetail: action.payload,
			};
		case DELETE_DETAIL:
			return {
				...state,
				dogDetail: [],
			};
		default:
			return state;
	}
}

export default rootReducer;
