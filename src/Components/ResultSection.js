import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../contexts/Context";
import {
  TcGray1,
  TcAccent,
  TcGray2,
  TcGray3,
  TwRegular,
  TwSemibold,
  TwBlack,
  Ts10,
  Ts12,
  Ts14,
  Ts16,
  Ts18,
  Ts20,
  Ts22,
  Ts24,
  Ts26,
  Ts28,
  Ts30,
  Ts32,
} from "./TypographyHelpers";

const ResultSection = props => {
  // To use with .toLocaleString()
  // example: num.toLocaleString("pt-BR", numObj)
  const numObj = {
    style: "decimal",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  };

  // Access to the global state (through context)
  const [state, setState] = useContext(Context);

  if (state.valueUSD && state.valueUSD > 0) {
    return (
      <StyledResultSection>
        <ResultTitle>Resultado</ResultTitle>
        {state.conversionType === "noTax" && (
          <div className="gridSimples">
            <ResultContent>
              <div className="regular">
                US$ <span className="bolder">{!!state.valueUSD ? state.valueUSD : ""}</span>
              </div>
              <div className="smaller">sem taxas</div>
              <div className="regular arrow">&#11206;</div>
              <div className="big">
                R$ <span className="bolder">{state.valueBRL}</span>
              </div>
              <div className="small">sem taxas</div>
            </ResultContent>
          </div>
        )}
        {state.conversionType === "withTax" && (
          <div className="gridDuplo">
            <div className="gridSimples">
              <ResultContent>
                <div className="regular">
                  US${" "}
                  <span className="bolder">{!!state.valueUSD ? parseFloat(state.valueUSD).toLocaleString("pt-BR", numObj) : ""}</span>
                </div>
                <div className="smaller">sem taxas</div>
                <div className="regular arrow">&#11206;</div>
                <div className="big">
                  R$ <span className="bolder">{parseFloat(state.valueBRL).toLocaleString("pt-BR", numObj)}</span>
                </div>
                <div className="small">sem taxas</div>
              </ResultContent>
            </div>
            <div className="gridTaxa">
              <UpperDetail>
                <div>
                  <TcGray3>
                    <TwRegular>US$ </TwRegular>
                    <TwSemibold>{state.valueUSD.toLocaleString("pt-BR", numObj)}</TwSemibold>
                  </TcGray3>
                  <TcGray1 className="small"> valor inicial</TcGray1>
                </div>
                <div>
                  <TcAccent>
                    <TwSemibold>+ </TwSemibold>
                  </TcAccent>
                  <TcGray3>
                    <TwRegular>US$ </TwRegular>
                    <TwSemibold>{state.localTaxUSD.toLocaleString("pt-BR", numObj)}</TwSemibold>
                  </TcGray3>
                  <TcGray1 className="small"> taxa local</TcGray1>
                </div>
                <div>
                  <TcAccent>
                    <TwSemibold>+ </TwSemibold>
                  </TcAccent>
                  <TcGray3>
                    <TwRegular>US$ </TwRegular>
                    <TwSemibold>{state.iofUSD.toLocaleString("pt-BR", numObj)}</TwSemibold>
                  </TcGray3>
                  <TcGray1 className="small"> IOF</TcGray1>
                </div>
              </UpperDetail>
              <ResultContent>
                <div className="regular">
                  US$ <span className="bolder">{state.totalUSD.toLocaleString("pt-BR", numObj)}</span>
                </div>
                <div className="smaller">com taxas</div>
                <div className="regular arrow">&#11206;</div>
                <div className="big">
                  R$ <span className="bolder">{state.totalBRL.toLocaleString("pt-BR", numObj)}</span>
                </div>
                <div className="small">
                  com taxas,
                  <br />
                  sendo que
                </div>
              </ResultContent>
              <BottomDetail>
                <div className="text">
                  <div>
                    <TcGray3>
                      <TwRegular>R$ </TwRegular>
                      <TwSemibold>{state.localTaxBRL.toLocaleString("pt-BR", numObj)}</TwSemibold>
                    </TcGray3>
                  </div>
                  <div>
                    <TcGray1 className="small">imposto<br />local</TcGray1>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="text">
                  <div>
                    <TcGray3>
                      <TwRegular>R$ </TwRegular>
                      <TwSemibold>{state.iofBRL.toLocaleString("pt-BR", numObj)}</TwSemibold>
                    </TcGray3>
                  </div>
                  <div>
                    <TcGray1 className="small">IOF<br />{state.iofPercentage === 1.1 ? "Dinheiro" : "Crédito"}</TcGray1>
                  </div>
                </div>
              </BottomDetail>
            </div>
          </div>
        )}
      </StyledResultSection>
    );
  } else return null;
};

const StyledResultSection = styled.section`
  background-color: #fcfbce; /* baby yellow */
  width: 100%;
  border-radius: 0 0 0.8rem 0.8rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .gridDuplo {
    display: grid;
    grid-template-columns: 0.85fr 1.15fr;
    grid-template-rows: min-content;
    column-gap: 1rem;
    @media (max-width: 400px) {
      grid-template-columns: 200px;
      grid-template-rows: min-content min-content;
      grid-gap: 1rem;
    }
  }

  .gridSimples {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    text-align: center;
  }

  h3 + .gridSimples {
    align-self: center;
  }

  .gridSimples,
  .gridTaxa {
    max-width: 300px;
    background-color: white;
    border: 1px solid #aeb7bf;
    border-radius: 0.4rem;
  }
`;

const ResultTitle = styled.h3`
  text-transform: uppercase;
  color: #2d3844;
  font-size: 1.25rem;
  font-weight: 400;
  display: block;
  width: 100%;
  margin: 0 0 1rem 0;
  text-align: center;
`;

const ResultContent = styled.div`
  display: flex;
  flex-direction: column;
  color: #6f767d;
  align-items: center;
  margin: 0.8rem 1.5rem;

  div {
    text-align: center;
    justify-content: center;
  }

  .smaller {
    font-size: 0.875rem;
  }
  .small {
    font-size: 1rem;
  }
  .regular {
    font-size: 1.2rem;
    color: #171c34;
  }
  .regular.arrow {
    color: #6f767d;
  }
  .big {
    font-size: 1.4rem;
    color: #171c34;
  }
  .bolder {
    font-weight: 600;
  }
`;

const UpperDetail = styled.div`
  background-color: #d9ffe8;
  border: 0;
  border-bottom-style: solid;
  border-bottom-color: #aeb7bf;
  border-bottom-width: 1px;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  width: 100%;
  padding: 0.6rem 0.2rem;
  align-self: stretch;
  justify-content: center;
  align-items: center;
  text-align: center;
  .text {
    justify-content: center;
    align-items: center;
    text-align: center;
    span {
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
  .small {
    font-size: 0.8rem;
  }
`;

const BottomDetail = styled.div`
  background-color: #d9ffe8;
  border: 0;
  border-top-style: solid;
  border-top-color: #aeb7bf;
  border-top-width: 1px;
  border-bottom-left-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  width: 100%;
  padding: 0.6rem 0.2rem;
  align-self: stretch;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1rem;
  display: grid;
  grid-template-columns: 1fr min-content 1fr;
  .text,
  .text div,
  .text div span {
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .small {
    font-size: 0.8rem;
  }
  .divider {
    background-color: var(--gray-lighter);
    width: 1px;
    height: 100%;
    margin: 0 .1rem;
  }
`;

export default ResultSection;
