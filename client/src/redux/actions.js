import axios from 'axios';
export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const GET_DOG_DETAIL = 'GET_GOG_DETAIL';
export const SEARCH_DOG = 'SEARCH_DOG';
export const ORDER_BY_TEMP = 'ORDER_BY_TEMP';
export const ORDER_BY_ASCDES = 'ORDER_BY_ASCDES';
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT';
export const ORDER_BY_BREED = 'ORDER_BY_BREED';
export const DELETE_DETAIL = 'DELETE_DETAIL';

export function deleteDetail (){
return dispatch => {
  dispatch({
    type: DELETE_DETAIL
  })
}
}

export function getAllDogs() {
	return function (dispacth) {
		return fetch('http://localhost:3001/dogs')
			.then((response) => response.json())
			.then((data) => {
				dispacth({
					type: GET_ALL_DOGS,
					payload: data,
				});
			});
	};
}

export function getDogDetail(id) {
	return function (dispacth) {
		return fetch(`http://localhost:3001/dogs/${id}`)
			.then((response) => response.json())
			.then((data) => {
				dispacth({
					type: GET_DOG_DETAIL,
					payload: data,
				});
			});
	};
}

export function createDog(payload) {
	return async function (dispacth) {
		const response = await axios.post(`http://localhost:3001/dogs`, payload);
		return response;
	};
}

export function searchDog(name) {
	return function (dispacth) {
		return fetch(`http://localhost:3001/dogs?name=${name}`)
			.then((response) => response.json())
			.then((data) => {
				dispacth({
					type: SEARCH_DOG,
					payload: data,
				});
			});
	};
}

export function getAllTemperament() {
	return (dispacth) => {
		return fetch('http://localhost:3001/temperaments')
			.then((response) => response.json())
			.then((data) => {
				dispacth({
					type: GET_TEMPERAMENTS,
					payload: data,
				});
			});
	};
}

// Filtros

export function orderByTemp(temp) {
	return function (dispacth) {
		return fetch('http://localhost:3001/dogs')
			.then((response) => response.json())
			.then((data) => {
				dispacth({
					type: ORDER_BY_TEMP,
					temp,
					payload: data,
				});
			});
	};
}

export function orderByAsc(order) {
	return function (dispacth) {
		dispacth({
			type: ORDER_BY_ASCDES,
			payload: order,
		});
	};
}

export function orderByWeight(order) {
	return function (dispacth) {
		dispacth({
			type: ORDER_BY_WEIGHT,
			payload: order,
		});
	};
}

export function orderByBreed(order) {
	return function (dispacth) {
		return fetch('http://localhost:3001/dogs')
			.then((response) => response.json())
			.then((data) => {
				dispacth({
					type: ORDER_BY_BREED,
					order,
					payload: data,
				});
			});
	};
}
