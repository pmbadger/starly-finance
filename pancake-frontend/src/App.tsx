import React, { lazy } from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { ResetCSS } from 'pancakeswap-uikit'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { usePollBlockNumber } from 'state/block/hooks'
import { usePollCoreFarmData } from 'state/farms/hooks'
import { useFetchProfile } from 'state/profile/hooks'
import { DatePickerPortal } from 'components/DatePicker'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import PageLoader from './components/Loader/PageLoader'
import EasterEgg from './components/EasterEgg'
import history from './routerHistory'
// Views included in the main bundle
import Swap from './views/Swap'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity,
} from './views/AddLiquidity/redirects'
import RedirectOldRemoveLiquidityPathStructure from './views/RemoveLiquidity/redirects'
import { RedirectPathToSwapOnly, RedirectToSwap } from './views/Swap/redirects'
import ConnectWalletButton from './components/ConnectWalletButton'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
// const FarmAuction = lazy(() => import('./views/FarmAuction'))
// const Lottery = lazy(() => import('./views/Lottery'))
// const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
// const Collectibles = lazy(() => import('./views/Collectibles'))
// const Teams = lazy(() => import('./views/Teams'))
// const Team = lazy(() => import('./views/Teams/Team'))
// const Profile = lazy(() => import('./views/Profile'))
// const TradingCompetition = lazy(() => import('./views/TradingCompetition'))
// const Predictions = lazy(() => import('./views/Predictions'))
// const Voting = lazy(() => import('./views/Voting'))
// const Proposal = lazy(() => import('./views/Voting/Proposal'))
// const CreateProposal = lazy(() => import('./views/Voting/CreateProposal'))
const AddLiquidity = lazy(() => import('./views/AddLiquidity'))
const Liquidity = lazy(() => import('./views/Pool'))
const PoolFinder = lazy(() => import('./views/PoolFinder'))
const RemoveLiquidity = lazy(() => import('./views/RemoveLiquidity'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const StyledConnectWalletButton = styled(ConnectWalletButton)`
  padding: 12px 7px;
  width: 158px;
  height: 45px;
  background: linear-gradient(260.3deg, #058fca -29.78%, #2e4bb5 118.84%);
  border-radius: 12px;
  font-style: normal;
  font-weight: 450;
  font-size: 16px;
  line-height: 21px;

  img {
    margin-left: 5px;
    margin-top: -10px;
  }
`

const ConnectWalletButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: end;
  width: 75%;
  max-width: 1192px;
`

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 55px;
  padding-left: 226px;
`

const App: React.FC = () => {
  usePollBlockNumber()
  useFetchProfile()
  usePollCoreFarmData()

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            {/* <Route exact path="/farms/auction"> */}
            {/*  <FarmAuction /> */}
            {/* </Route> */}
            <Route path="/farms">
              <Farms />
            </Route>
            {/* <Route path="/pools"> */}
            {/*  <Pools /> */}
            {/* </Route> */}
            {/* <Route path="/lottery"> */}
            {/*  <Lottery /> */}
            {/* </Route> */}
            {/* <Route path="/ifo"> */}
            {/*  <Ifos /> */}
            {/* </Route> */}
            {/* <Route path="/collectibles"> */}
            {/*  <Collectibles /> */}
            {/* </Route> */}
            {/* <Route exact path="/teams"> */}
            {/*  <Teams /> */}
            {/* </Route> */}
            {/* <Route path="/teams/:id"> */}
            {/*  <Team /> */}
            {/* </Route> */}
            {/* <Route path="/profile"> */}
            {/*  <Profile /> */}
            {/* </Route> */}
            {/* <Route path="/competition"> */}
            {/*  <TradingCompetition /> */}
            {/* </Route> */}
            {/* <Route path="/prediction"> */}
            {/*  <Predictions /> */}
            {/* </Route> */}
            {/* <Route exact path="/voting"> */}
            {/*  <Voting /> */}
            {/* </Route> */}
            {/* <Route exact path="/voting/proposal/create"> */}
            {/*  <CreateProposal /> */}
            {/* </Route> */}
            {/* <Route path="/voting/proposal/:id"> */}
            {/*  <Proposal /> */}
            {/* </Route> */}

            {/* Using this format because these components use routes injected props. We need to rework them with hooks */}
            <Route exact strict path="/swap" component={Swap} />
            <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
            <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
            <Route exact strict path="/find" component={PoolFinder} />
            <Route exact strict path="/liquidity" component={Liquidity} />
            <Route exact strict path="/create" component={RedirectToAddLiquidity} />
            <Route exact path="/add" component={AddLiquidity} />
            <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact path="/create" component={AddLiquidity} />
            <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
            <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />

            {/* Redirect */}
            <Route path="/pool">
              <Redirect to="/liquidity" />
            </Route>
            {/* <Route path="/staking"> */}
            {/*  <Redirect to="/pools" /> */}
            {/* </Route> */}
            {/* <Route path="/syrup"> */}
            {/*  <Redirect to="/pools" /> */}
            {/* </Route> */}
            {/* <Route path="/nft"> */}
            {/*  <Redirect to="/collectibles" /> */}
            {/* </Route> */}

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <Container>
        <ConnectWalletButtonContainer>
          <StyledConnectWalletButton
            text="Connect wallet"
            icon={<img alt="star" src="/images/star.svg" />}
            iconPosition="end"
          />
        </ConnectWalletButtonContainer>
      </Container>
      <EasterEgg iterations={2} />
      <ToastListener />
      <DatePickerPortal />
    </Router>
  )
}

export default React.memo(App)
