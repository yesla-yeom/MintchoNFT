import { Router, Request, Response } from "express";
import pinataSDK from "@pinata/sdk";

import dummyDataList from "../data/dummyData.json";
import AllToken from "../models/allToken";

const pinata = new pinataSDK(
  "4c64f4e382099ae14866",
  "a7b9d3c02c40095d07400a5a82fb09c6b201d0259faf79bfe21d5f0f51b4dc7c"
);

const router = Router();

router.get("/list", async (req: Request, res: Response) => {
  let jsonResultArr = [];
  let result = [];
  for (let i = 0; i < dummyDataList.length; i++) {
    const tempResult = await pinata.pinJSONToIPFS(dummyDataList[i], {
      pinataMetadata: { name: Date.now().toString() + ".json" },
      pinataOptions: { cidVersion: 0 },
    });
    jsonResultArr.push(tempResult);
    result.push(
      await AllToken.create({
        tokenId: dummyDataList[i].tokenId,
        name: dummyDataList[i].name,
        description: dummyDataList[i].description,
        image: dummyDataList[i].imgSrc,
        ca: dummyDataList[i].CA,
        price: dummyDataList[i].price,
        blockChain: dummyDataList[i].blockChain,
        tokenOwner: dummyDataList[i].tokenOwner,
        tokenBase: dummyDataList[i].tokenBase,
        value: 1,
      })
    );
  }

  res.send({ jsonResultArr, result });
});
export default router;