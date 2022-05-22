import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react';
import { createContainer } from 'unstated-next';
import Header from './components/Header';
import { getToken } from './helper/AuthHelper';
import CashPage from './pages/CashPage';
import './styles/header.scss';
import './styles/main.scss';

/**
 * Retrieves the token from the logged in user for API calls
 * @returns
 */
export const useAuth = () => {
    const [token, setToken] = useState('');
    const [tokenError, setTokenError] = useState('');
    const [pageError, setPageError] = useState('');
    const loadAuth = async () => {
        if (token === '') {
            try {
                const retrievedToken = await getToken();
                setToken(retrievedToken);
            } catch (error: any) {
                setTokenError(error);
            }
        }
    };
    return { token, tokenError, loadAuth, pageError, setPageError };
};

const PageContainer = createContainer(useAuth);

const App = () => {
    return (
        <main className="main">
            <Authenticator>
                {({ signOut, user }) => (
                    <>
                        <PageContainer.Provider>
                            <Header
                                signOut={signOut}
                                pageContainer={PageContainer}
                            />
                            <CashPage pageContainer={PageContainer} />
                        </PageContainer.Provider>
                    </>
                )}
            </Authenticator>
        </main>
    );
};

export default App;
