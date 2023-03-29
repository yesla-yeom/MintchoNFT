import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const TokenDetailComponent = ({
  detail,
  buyToken,
  txLog,
  heart,
  setHeart,
  handleHeart,
  useModal,
  boolenstat,
  setBoolenstat,
  buyState,
}) => {
  return (
    <>
      <DetailBox>
        <div>
          <img
            src={
              detail.tokenImage && detail.tokenImage.includes("imgs")
                ? detail.tokenImage
                : `http://localhost:8080/upload/${detail.tokenImage}`
            }
            alt=""
          />
        </div>
        <div>
          <div>
            <div>#{detail.tokenId}</div>
            <div
              onClick={() => {
                setHeart((state) => !state);
                handleHeart(detail.tokenId);
              }}
            >
              {heart ? (
                <>
                  <img
                    src="https://media.giphy.com/media/LpDmM2wSt6Hm5fKJVa/giphy.gif"
                    alt=""
                  />
                </>
              ) : (
                <>
                  <img
                    src="https://media.giphy.com/media/xT0GqgR2vg6h0mkfrW/giphy.gif"
                    alt=""
                  />
                </>
              )}
            </div>
          </div>
          <div>
            <div>
              <span>
                {detail.ca &&
                  detail.ca.slice(0, 4) + " ... " + detail.ca.slice(-4)}
              </span>
            </div>
          </div>
          <div>
            블록체인 : <span> {detail.blockChainNetwork}</span>
          </div>
          <div>
            토큰 스탠다드 : <span>{detail.tokenStandard}</span>
          </div>
          <div>
            토큰 소유자 :{" "}
            <Link to={`/myNFT/${detail.tokenOwner}`}>
              <span className="addressClick">
                {detail.tokenOwner &&
                  detail.tokenOwner.slice(0, 2) +
                    detail.tokenOwner.slice(2, 5).toUpperCase() +
                    "..." +
                    detail.tokenOwner.slice(-5)}
              </span>
            </Link>
          </div>
          <div>
            가격 :{" "}
            <span>
              {detail.price} Goerli &#40; {detail.price * 250}원 &#41;
            </span>
          </div>
          <div>
            <button
              onClick={() => {
                buyToken(detail.tokenId, detail.tokenOwner, detail.price);
                setBoolenstat(true);
              }}
            >
              구매하기
            </button>
          </div>
          <div>
            <div>아이템 특성</div>
            {detail.rank && detail.type && (
              <>
                <div>
                  Rank : <span> {detail.rank}</span>{" "}
                </div>
                <div>
                  Type : <span>{detail.type}</span>
                </div>
              </>
            )}
          </div>
          <div>
            <div>거래내역</div>
            <div>
              {txLog.tokenId && (
                <>
                  <div>
                    <div>
                      <span>
                        {txLog.price} Georli &#40; {txLog.price * 250}원 &#41;
                      </span>
                    </div>
                    <div>
                      From :
                      <Link to={`/myNFT/${txLog.from}`}>
                        <span className="addressClick">
                          {" "}
                          {txLog.from.slice(0, 5)}
                        </span>
                      </Link>{" "}
                      - To:
                      <Link to={`/myNFT/${txLog.to}`}>
                        <span className="addressClick">
                          {" "}
                          {txLog.to.slice(0, 5)}
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div>
                    {txLog.createdAt.slice(0, txLog.createdAt.indexOf("T"))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div>
            <Link to={`/${detail.tokenName}`}>전체 목록 보기</Link>
          </div>
        </div>
      </DetailBox>
      {useModal("buying", buyState, boolenstat, setBoolenstat)}
    </>
  );
};

export default TokenDetailComponent;

const DetailBox = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 3% 0 0 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    font-weight: 750;
  }
  & .addressClick {
    color: gray;
    font-weight: 750;
    &:hover {
      color: rgba(176, 222, 219, 1);
    }
  }
  & > div:first-child {
    width: 39%;
    &:first-child {
      & > img {
        width: 100%;
      }
    }
  }
  & > div:last-child {
    width: 49%;
    & > div {
      padding: 15px 0;
      &:first-child {
        font-size: 1.5rem;
        font-weight: 750;
        display: flex;
        justify-content: space-between;
        align-items: center;
        & > div:last-child {
          cursor: pointer;
          border-radius: 10px;
          padding: 2px;
          &:hover {
            background-color: rgba(0, 0, 0, 0.3);
          }
          & img {
            width: 50px;
          }
        }
      }
      &:nth-child(2) {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        & > div {
          padding: 0 5px 0 0;
        }
      }
      &:nth-child(5) > a:hover,
      &:nth-child(9) a:hover {
        color: rgba(176, 222, 219, 1);
      }

      &:nth-child(7) {
        width: 95%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        & > button {
          width: 100%;
          padding: 2% 5%;
          margin: 0 10px;
          background-color: rgba(176, 222, 219, 1);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          color: rgba(88, 49, 49, 1);
          font-weight: 900;
          font-size: 1rem;
          white-space: nowrap;
          &:hover {
            color: white;
          }
        }
      }
      &:nth-child(8) > div {
        padding: 10px 0;
      }
      &:nth-child(9) > div:last-child {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        & > div {
          & > div {
            padding: 5px 0;
          }
        }
      }
    }
  }
`;
