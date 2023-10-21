import styles from './layout.module.css';

import '@rainbow-me/rainbowkit/styles.css';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { Chain, configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  goerli,
  mantleTestnet,
  polygon,
  optimism,
  arbitrum,
  zora,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

export const scrollSepolia = {
  id: 534_351,
  name: 'scrollSepolia',
  network: 'scrollSepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Scroll Sepolia',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://sepolia-rpc.scroll.io/'] },
    default: { http: ['https://sepolia-rpc.scroll.io/'] },
  },
  blockExplorers: {
    etherscan: { name: 'ScrollScan', url: 'https://sepolia.scrollscan.com' },
    default: { name: 'ScrollScan', url: 'https://sepolia.scrollscan.com' },
  },
  // contracts: {
  //   multicall3: {
  //     address: '0xca11bde05977b3631167028862be2a173976ca11',
  //     blockCreated: 11_907_934,
  //   },
  // },
} 



const { chains, publicClient  } = configureChains(
  [goerli,scrollSepolia,mantleTestnet],
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
  