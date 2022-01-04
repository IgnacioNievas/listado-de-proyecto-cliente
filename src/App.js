import Routers from './router/Routers';
import authToken from './config/authToken';

const token = localStorage.getItem('token');

if (token) {
	authToken(token);
}

function App() {
	return <Routers />;
}

export default App;
