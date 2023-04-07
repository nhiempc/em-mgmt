import { GET_TOKEN } from './common';
import { HttpMethod, fetchToken } from './helpers/fetchHelper';
import Routes from './routes/routes';
import useSWR from 'swr';

function App() {
    const { data: token } = useSWR(
        [
            `${GET_TOKEN}`,
            HttpMethod.POST,
            {
                client_id: 'core_client',
                grant_type: 'password',
                client_secret: 'secret',
                username: 'admin',
                password: 'admin'
            }
        ],
        ([url, method, body]) => fetchToken(url, method, body)
    );
    return <Routes />;
}

export default App;
