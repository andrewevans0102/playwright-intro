import { Container } from 'unstated-next';

export interface PageProps {
    pageContainer: Container<any, any>;
}

export interface ContainerProps {
    token: string;
    loadAuth: Function;
    tokenError: Error | string;
    pageError: Error | string;
    setPageError: Function;
}
