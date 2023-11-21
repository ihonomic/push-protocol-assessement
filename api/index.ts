export const fetchNFTCollection = async (PAGE: string, PAGE_SIZE: string) => {
  console.log([], "Fetching NFTs....");

  const response = await fetch(
    `https://api.covalenthq.com/v1/eth-mainnet/nft/0x8821bee2ba0df28761afff119d66390d594cd280/metadata/?page-size=${PAGE_SIZE}&page-number=${PAGE}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer cqt_rQ4rjPvbKdDRJCTVHyDWxdhH4hPp",
      },
    }
  );

  if (![200].includes(response.status)) {
    return {
      status: "error",
      data: {},
    };
  }

  const data = await response.json();

  //   console.log([], data);

  return {
    status: "success",
    data: data.data,
  };
};
