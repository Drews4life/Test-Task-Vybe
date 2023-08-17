import { useMemo } from "react";
import { useLocation } from 'react-router-dom';

import { IntroCollectionCard } from "../../features/nft/components/IntroCollectionCard";
import { CollectionPopup } from "../../features/nft/components/CollectionPopup";

import { NFT_COLLECTIONS } from "../../shared/configuration";

export const Home = () => {
    const { search } = useLocation();

    const selectedCollection = useMemo(() => {
        const params = new URLSearchParams(search);
        return params.get('collection');
    }, [search]);
    const collections = useMemo(() => Object.values(NFT_COLLECTIONS), []);

    return (
        <>
            <section>
                <ul className="gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 p-4">
                    {collections.map(({ id, name }) => (
                        <li key={id} data-testid="card">
                            <IntroCollectionCard collection={id} name={name} />
                        </li>
                    ))}
                </ul>
            </section>

            {selectedCollection && (
                <CollectionPopup collection={selectedCollection} data-testid="popup" />
            )}
        </>
    )
};