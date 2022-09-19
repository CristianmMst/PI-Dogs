import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Landing from './components/Landing/Landing.jsx';
import DogDetail from './components/DogDetail/DogDetail.jsx'
import CreateDog from './components/CreateDog/CreateDog.jsx'

function App() {
	return (
		<>
			<Routes>
				<Route path={'/'} element={<Landing />} />
				<Route path={'/home'} element={<Home />} />
				<Route path={'/dogDetail/:id'} element={<DogDetail />} />
				<Route path={'/home/createDog'} element={<CreateDog />} />
			</Routes>
		</>
	);
}

export default App;
