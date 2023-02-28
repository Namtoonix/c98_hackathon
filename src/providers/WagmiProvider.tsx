import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { bscTestnet } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

const WagmiProvider = (props: any) => {
  const { children } = props;

  const { chains, provider } = configureChains(
    [bscTestnet],
    [
      // jsonRpcProvider({
      //   rpc: (chain) => ({
      //     http: `https://rpc.ankr.com/bsc`,
      //   }),
      // }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "My TNH Dapp",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors: connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};

export default WagmiProvider;
