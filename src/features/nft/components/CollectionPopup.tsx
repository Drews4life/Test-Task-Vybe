import { Link } from 'react-router-dom';

import { useNFTCollectionQuery } from '../queries';
import { CollectionPopupCard } from './CollectionPopupCard';
import { useState } from 'react';

export const CollectionPopup = ({ collection }: { collection: string }) => {
    const [page, setPage] = useState(1);
    const { isLoading, data } = useNFTCollectionQuery(collection);

    const handleLoadMore = () => setPage((lastPage) => lastPage + 1)

    return (
        <div
            className="fixed top-2/4 left-2/4 bg-[#10141f] w-4/5 h-4/5 p-5 shadow-lg rounded-lg overflow-y-auto"
            style={{ transform: "translate(-50%, -50%)" }}
            data-testid="popup"
        >
            <div className="flex justify-end">
                <Link className='h-9 w-9 rounded-lg flex justify-center items-center bg-[#1a1f2e]' to="/">
                    <svg width={14} height={14} fill='white'>
                        <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z" />
                    </svg>
                </Link>
            </div>

            {isLoading && (
                <span className='font-bold text-ellipsis overflow-hidden whitespace-nowrap'>Please wait, data is loading...</span>
            )}
            
            {data?.ok && (
                // FIXME: The card are quite heavy. Virtualized lists will significantly improve performance
                <ul className='mt-4 gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 w-full overflow-y-auto p-2'>
                    {data.value.result.items.slice(0, page * 10).map(({ id, content: { links, metadata } }) => (
                        <li key={id} data-testid="card">
                            <CollectionPopupCard
                                name={metadata.name}
                                description={metadata.description}
                                url={links.image}
                            />
                        </li>
                    ))}
                </ul>
            )}
            <div className='flex justify-center'>
                <button className='rounded-lg p-3 bg-black w-[50%] font-semibold text-white mt-3 p-4' onClick={handleLoadMore}>Show more</button>
            </div>
        </div>
    )
}