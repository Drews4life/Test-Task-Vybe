import { Link } from "react-router-dom";

import { useNFTCollectionQuery } from "../queries";
import { CardContainer, CardImage, CardImageContainer } from "./Card";

const Skeleton = () => (
    <CardContainer className="h-72">
        <CardImageContainer>
            <CardImage alt="Scaled NFT image" className="group-hover:scale-105 transform transition-transform duration-300 ease select-none pointer-events-none" src={"/public/download.png"} />
            <div className="absolute -bottom-4 left-4">
                <div
                    className="relative w-14 border-2 rounded-xl overflow-hidden bg-white group-hover:scale-110 transform delay-75 duration-500 transition-transform"
                    style={{ aspectRatio: "1 / 1" }}
                >
                    <CardImage alt="mini-NFT image" src={"/public/download.png"} />
                </div>
            </div>
        </CardImageContainer>
        <div className="flex justify-between text-sm px-4 pb-3 pt-[26px]">
            <div className="flex items-center gap-1">
                <div className="font-bold text-ellipsis overflow-hidden whitespace-nowrap">
                    In progress!
                </div>
            </div>
            <div className="text-gray-600 dark:text-gray-400">Infinite items</div>
        </div>
    </CardContainer>
)

export function IntroCollectionCard  ({
    collection,
    name
}: {
    collection: string,
    name: string,
})  {
    const { data, isLoading } = useNFTCollectionQuery(collection);

    if (isLoading || !data) {
        return <Skeleton />;
    }

    if (!data.ok) return null

    const items = data.value.result.items;

    if (items.length < 1) return null

    const item = items[0];
    const pluralPostfix = items.length > 1 ? 's' : '';

    return (
        <Link to={`/?collection=${collection}`}>
            <CardContainer className="h-72">
                <CardImageContainer>
                    <CardImage alt="Scaled NFT image" className="group-hover:scale-105 transform transition-transform duration-300 ease select-none pointer-events-none" src={item.content.links.image} />
                    <div className="absolute -bottom-4 left-4">
                        <div
                            className="relative w-14 border-2 rounded-xl overflow-hidden bg-white group-hover:scale-110 transform delay-75 duration-500 transition-transform"
                            style={{ aspectRatio: "1 / 1" }}
                        >
                            <CardImage alt="mini-NFT image" src={item.content.links.image} />
                        </div>
                    </div>
                </CardImageContainer>
                <div className="flex justify-between text-sm px-4 pb-3 pt-[26px]">
                    <div className="flex items-center gap-1">
                        <div className="font-bold text-ellipsis overflow-hidden whitespace-nowrap">
                            {name}
                        </div>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">{">"}{items.length} {`item${pluralPostfix}`}</div>
                </div>
            </CardContainer>
        </Link>
    );
}