import { Auth } from 'aws-amplify';

const getToken = async () => {
    const token = (await Auth.currentSession()).getIdToken().getJwtToken();

    return token;
};

export { getToken };
