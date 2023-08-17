import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react'
import { useLocation } from 'react-router-dom';

import { Home } from '..';
import { NFT_COLLECTIONS } from '../../../shared/configuration';

jest.mock('react-router-dom', () => ({
    __esModule: true,
    ...jest.requireActual('react-router-dom'),
    Link: ({ children }: { children: ReactNode }) => <>{children}</>,
    useLocation: jest.fn(() => ({ search: '' })),
}));

jest.mock('../../../features/nft/queries', () => ({
    __esModule: true,
    useNFTCollectionQuery: () => ({ isLoading: true }),
}));

describe('Home page', () => {
    it('should render as many card as many entries in config are present', () => {
        render(<Home />);

        const items = screen.getAllByTestId("card");

        expect(items.length).toBe(Object.keys(NFT_COLLECTIONS).length);
    });

    it('should not render popup if there is no selected collection', async () => {
        render(<Home />);

        const popup = screen.queryByTestId("popup");

        expect(popup).toBeFalsy();
    });

    it('should render popup if there is selected collection', async () => {
        (useLocation as jest.Mock).mockImplementationOnce(() => ({ search: "?collection=123" }))

        render(<Home />);

        const popup = screen.queryByTestId("popup");

        expect(popup).toBeTruthy();
    });
});