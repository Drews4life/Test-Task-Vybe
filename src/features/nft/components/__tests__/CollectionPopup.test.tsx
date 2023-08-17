import { ReactNode } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { CollectionPopup } from '../CollectionPopup';
import { useNFTCollectionQuery } from '../../queries';

jest.mock('react-router-dom', () => ({
    __esModule: true,
    ...jest.requireActual('react-router-dom'),
    Link: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

jest.mock('../../queries', () => ({
    __esModule: true,
    useNFTCollectionQuery: jest.fn(),
}));

describe("CollectionPopup", () => {
    const collection = '1234567';

    it('should display more items on button click', async () => {
        (useNFTCollectionQuery as jest.Mock).mockImplementation(() => ({
            isLoading: false,
            data: {
                ok: true,
                value: {
                    result: {
                        items: new Array(100).fill({}).map(() => ({
                            id: Math.random() * 100000,
                            content: {
                                metadata: { description: '', name: '', },
                                links: { image: '' },
                            },
                        }))
                    }
                },
            }
        }));

        render(<CollectionPopup collection={collection} />);

        expect(screen.getAllByTestId("card").length).toBe(10);

        fireEvent(
            screen.getByText('Show more'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        await waitFor(() => expect(screen.getAllByTestId("card").length).toBe(20));
    });
});