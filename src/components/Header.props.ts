import { MouseEventHandler } from 'react';
import { Container } from 'unstated-next';

export interface HeaderProps {
    signOut: MouseEventHandler<HTMLButtonElement> | undefined;
    pageContainer: Container<any, any>;
}
