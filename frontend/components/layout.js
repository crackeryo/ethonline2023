import styles from './layout.module.css';

import '@rainbow-me/rainbowkit/styles.css';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  zora,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';


const { chains, publicClient  } = configureChains(
  [mainnet],
  [
    //alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY , priority:0 }),
    alchemyProvider({apiKey:"ZBnV2-odWv83XHBbBCL8zJPYUOedtp5t", priority:0 }),
    publicProvider({ priority: 1 }),

  ]
);
// wallet connect account created with wallet 0xa35..
const { connectors } = getDefaultWallets({
  appName: 'MintSite',
  projectId: '06966d51c4da8bf4e19d72e12ccc6fb9',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export default function Layout({ children }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div>
          <ConnectButton></ConnectButton>
          {children}
        </div>
        
      </RainbowKitProvider>
    </WagmiConfig>
  );
  }
  