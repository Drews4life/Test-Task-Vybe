import { CardContainer, CardImage, CardImageContainer } from "./Card"

export const CollectionPopupCard = ({ url, name, description }: { url: string, name: string, description: string }) => (
    <CardContainer className="h-[450px]">
        <CardImageContainer>
            <CardImage src={url} alt="NFT image" className="group-hover:scale-105 transform transition-transform duration-300 ease select-none pointer-events-none" />
        </CardImageContainer>
        <div className="text-sm px-4 pb-3 pt-[26px]">
            <div className="flex items-center gap-1">
                <div className="font-bold text-ellipsis overflow-hidden whitespace-nowrap">
                    {name}
                </div>
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-ellipsis overflow-hidden whitespace-nowrap">{description}</div>
        </div>
        <hr className="mx-3 dark:border-gray-800" />
        <div className="flex justify-between items-center transition-all rounded-b-lg px-3 py-1 h-[48px]">
            <button className="text-blue-500 font-semibold text-[0.875rem]">Acquire</button>
        </div>
    </CardContainer>
)