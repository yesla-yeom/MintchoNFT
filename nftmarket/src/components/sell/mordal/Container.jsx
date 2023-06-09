import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import SellMordalComponent from "./Component";
import useModal from "../../utility/useModal";

function SellMordalContainer({
  account,
  web3,
  SetMordal,
  tokendata,
  tokenData,
}) {
  const [ethValue, setEthValue] = useState("");
  const [change, setChange] = useState("");
  const [saleState, setSaleState] = useState("");
  const [booleanState, setBooleanState] = useState(true);
  const ethInput = useCallback((e) => {
    setEthValue(e.target.value);
  }, []);

  useEffect(() => {}, [change]);

  const listing = async () => {
    try {
      setSaleState("WAITING");
      const approve = (
        await axios.post("/api/sellToken/approve", {
          account,
        })
      ).data;
      let transactionResult = await web3.eth.sendTransaction({
        to: approve.to,
        from: approve.from,
        data: approve.data,
      });

      if (transactionResult) {
        const result = (
          await axios.post("/api/sellToken/listing", {
            ethValue,
            tokendata,
            account,
          })
        ).data;
        let saleResult = await web3.eth.sendTransaction({
          to: result.to,
          from: result.from,
          data: result.data,
        });
        if (saleResult) {
          const update = await axios.post("/api/sellToken/update", {
            ethValue,
            tokendata,
            account,
          });
          setChange(update);
        }
        setSaleState("SUCCESS");
      }
    } catch (error) {
      setSaleState("SUCCESS");
      console.log(error);
    }
  };

  const cancle = async () => {
    try {
      setSaleState("WAITING");
      const approvecancle = (
        await axios.post("/api/sellToken/cancle", {
          tokendata,
        })
      ).data;
      let saleResult = await web3.eth.sendTransaction({
        to: approvecancle.to,
        from: approvecancle.from,
        data: approvecancle.data,
      });
      if (saleResult) {
        const cancleUpdate = (
          await axios.post("/api/sellToken/cancleUpdate", {
            tokendata,
          })
        ).data;
        setSaleState("SUCCESS");
      }
    } catch (error) {
      console.log(error);
      setSaleState("SUCCESS");
    }
  };
  return (
    <SellMordalComponent
      listing={listing}
      ethInput={ethInput}
      ethValue={ethValue}
      setEthValue={setEthValue}
      account={account}
      web3={web3}
      SetMordal={SetMordal}
      tokendata={tokendata}
      cancle={cancle}
      useModal={useModal}
      booleanState={booleanState}
      setBooleanState={setBooleanState}
      saleState={saleState}
      tokenData={tokenData}
    />
  );
}

export default SellMordalContainer;
