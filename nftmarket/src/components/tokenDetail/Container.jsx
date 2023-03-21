import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import TokenDetailComponent from "./Component";

const TokenDetailContainer = () => {
  const [detail, setDetail] = useState({});

  const params = useParams();

  const tokenDetail = useCallback(async () => {
    const data = (
      await axios.post("http://localhost:8080/api/nftToken/detail", {
        tokenId: params.tokenId,
      })
    ).data;
    setDetail(data);
  }, [params]);

  const buyToken = async (_tokenId) => {
    const result = await axios.post("http://localhost:8080/api/nftToken/buy", {
      tokenId: _tokenId,
    });
    console.log(result);
  };

  useEffect(() => {
    tokenDetail();
  }, [params]);

  return <TokenDetailComponent detail={detail} buyToken={buyToken} />;
};

export default TokenDetailContainer;
