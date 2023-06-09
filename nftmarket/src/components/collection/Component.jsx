import { Link } from "react-router-dom";
import styled from "styled-components";

import CollectionItemContainer from "./collectionItem/Container";

const CollectionComponent = ({
  collectionArr,
  setCollection,
  order,
  setOrder,
  collectionInfo,
  setCollectionInfo,
  check,
  setCheck,
}) => {
  return (
    <CollectionBox>
      <div>
        <img src="/imgs/bannerImg.jpg" alt="" />
        <img src="/imgs/ganache.jpg" alt="" />
      </div>
      <div>
        <div>
          TokenName :{" "}
          {collectionInfo.tokenName && <span>{collectionInfo.tokenName}</span>}
        </div>
        <div>
          <div>
            소유자 :{" "}
            {collectionInfo.tokenOwner && (
              <Link to={`/myNFT/${collectionInfo.tokenOwner}`}>
                <span>
                  {collectionInfo.tokenOwner.slice(0, 2) +
                    collectionInfo.tokenOwner.slice(2, 5).toUpperCase() +
                    "..." +
                    collectionInfo.tokenOwner.slice(-5).toUpperCase()}
                </span>
              </Link>
            )}
          </div>
          <div>
            네트워크 :
            {collectionInfo.blockChainNetwork && (
              <span>{collectionInfo.blockChainNetwork}</span>
            )}
          </div>
        </div>
        <CollectionItemContainer
          collectionArr={collectionArr}
          setCollection={setCollection}
          order={order}
          setOrder={setOrder}
          collectionInfo={collectionInfo}
          setCollectionInfo={setCollectionInfo}
          check={check}
          setCheck={setCheck}
        />
      </div>
    </CollectionBox>
  );
};

export default CollectionComponent;

const CollectionBox = styled.div`
  width: 100%;
  & > div {
    padding: 2% 0 0 0;
  }
  & > div:first-child {
    width: 100%;
    height: 40vh;
    position: relative;
    & > img {
      width: 100%;
      object-position: center center;
      object-fit: cover;
      overflow: hidden;
      height: 100%;
    }
    & > img:last-child {
      width: 150px;
      height: 150px;
      border-radius: 100px;
      position: absolute;
      top: 70%;
      left: 10%;
    }
  }
  & > div:last-child {
    width: 80%;
    margin: 0 auto;
    padding: 5% 0 0 0;
    & > div {
      padding: 10px 0;
    }
    & > div:nth-child(2) {
      display: flex;
      justify-content: start-flex;
      align-items: center;
      width: 100%;
      & > div {
        padding: 0 10px 0 0;
        &:first-child > a:hover {
          color: rgba(176, 222, 219, 1);
        }
      }
    }
  }
`;
