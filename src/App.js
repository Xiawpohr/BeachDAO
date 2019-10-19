import React from 'react'
// import Web3Provider from 'web3-react'
// import Web3 from 'web3'
import ApplicationContextProvider, {
  Updater as ApplicationContextUpdater,
} from './contexts/application'
import TransactionContextProvider, {
  Updater as TransactionContextUpdater,
} from './contexts/transaction'
// import Web3Manager from './components/Web3Manager'
import Home from './pages/Home'
// import NetworkOnlyConnector from './connectors/NetworkOnlyConnector'
import InjectedConnector from './connectors/InjectedConnector'

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
  }
`
// const Network = new NetworkOnlyConnector({
//   providerURL: process.env.REACT_APP_NETWORK_URL || '',
// })
// const Injected = new InjectedConnector({
//   supportedNetworks: [Number(process.env.REACT_APP_NETWORK_ID || '1')],
// })
// const connectors = { Injected, Network }

function ContextProviders({ children }) {
  return (
    <ApplicationContextProvider>
      <TransactionContextProvider>{children}</TransactionContextProvider>
    </ApplicationContextProvider>
  )
}

function Updaters() {
  return (
    <>
      <ApplicationContextUpdater />
      <TransactionContextUpdater />
    </>
  )
}

function App() {
  return (
    <div>
      <GlobalStyle />
      <Home />
    </div>
  )
}

export default App
