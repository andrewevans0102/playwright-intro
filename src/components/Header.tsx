import { useEffect } from 'react';
import { HeaderProps } from './Header.props';
import '../styles/header.scss';

const Header = (props: HeaderProps) => {
    const { pageContainer, signOut } = props;

    const pageShared = pageContainer.useContainer();

    useEffect(() => {
        pageShared.loadAuth();
    }, []);

    return (
        <header className="header">
            {pageShared.tokenError !== '' && (
                <p>
                    Token Error has occured{' '}
                    {JSON.stringify(pageShared?.tokenError?.message)}
                    {JSON.stringify(pageShared?.tokenError)}
                </p>
            )}
            {pageShared.pageError !== '' && (
                <p>
                    Page Error has occured{' '}
                    {JSON.stringify(pageShared?.pageError)}
                </p>
            )}
            <button onClick={signOut}>Sign out</button>
        </header>
    );
};

export default Header;
