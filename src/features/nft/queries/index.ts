import { useQuery } from "@tanstack/react-query";

import { post, constructUrl } from "../../../shared/client";

type NFT = {
    id: string,
    content: {
        links: {
            image: string,
            external_url: string,
        },
        metadata: {
            description: string,
            name: string,
            symbol: string,
        }
    }
    creators: Array<{ address: string, share: string }>
}

type NFTs = Array<NFT>;

type Schema = {
    jsonrpc: string,
    id: string,
    method: string,
    params: {
      groupKey: string,
      groupValue: string,
      page: number,
      limit: number,
      sortBy: {
        sortBy: string,
        sortDirection: string
      },
    }
}

type Response = {
    result: {
        items: NFTs,
        limit: number,
        page: number,
        total: number,
    }
}

const BASE_URL = "https://rpc.helius.xyz/"

const getNFTCollection = async (collection: string) => {
    const apiKey = import.meta.env.VITE_HELIOUS_API_KEY as string | undefined;

    if (!apiKey) {
        throw Error("VITE_HELIOUS_API_KEY is not present. Cannot execute the request.");
    }

    const url = constructUrl(BASE_URL, { "api-key": apiKey });

    const result = await post<Schema, Response>(url, {
        "jsonrpc": "2.0",
        "id": "string",
        "method": "getAssetsByGroup",
        "params": {
          "groupKey": "collection",
          "groupValue": collection,
          "page": 1,
          "limit": 100,
          "sortBy": {
            "sortBy": "none",
            "sortDirection": "asc"
          },
        }
    });

    return result;
}

export const useNFTCollectionQuery = (collection: string) =>
    useQuery({
        queryKey: ['nft', collection, 'collection'],
        queryFn: () => getNFTCollection(collection),
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    })