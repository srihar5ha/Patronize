import {
  ConnectWallet,
  MediaRenderer,
  useContract,
  useContractMetadata,
  useUser,
  useOwnedNFTs,
  useAddress,
  useClaimNFT, Web3Button
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getUser } from "../../auth.config";
import { contractAddress } from "../../const/yourDetails";
import { Header } from "../components/Header";
import styles from "../styles/Home.module.css";
import checkBalance from "../util/checkBalance";
import { ethers } from 'ethers';
import ExclusiveContent from "./exclusiveContent";

export default function Home() {
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();
  const { contract } = useContract(contractAddress);
  const { data: contractMetadata, isLoading: contractLoading } =
    useContractMetadata(contract);
    const address = useAddress();
    const { data: nfts } = useOwnedNFTs(contract, address);
const {
    mutate: claimNFT,error} = useClaimNFT(contract);

  if (error) {
    console.error("failed to claim nft", error);
  }

  useEffect(() => {
    console.log("adderss ",address,isLoggedIn)
    if (!address) {
      router.push("/login");
    
    }
  }, [isLoading, isLoggedIn, router]);

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.h1}>PATRON</h1>
      <br /><br />
      
      { address?
        (<span>Welcome, {address.slice(0,6)}... </span>
        ):
        <p></p>
      
      }{!nfts?.length && !contractLoading ? (
         <Web3Button
         contractAddress={contractAddress}
         action={() =>
           claimNFT({
             to: address, // Use useAddress hook to get current wallet address
             quantity: ethers.BigNumber.from(1),
             tokenId: 0
           })
        
   }>Buy NFT</Web3Button>
         ) :
         contractLoading ? (
          // User has NFTs but contractMetadata is not ready yet
          <p>Loading...</p>
      ) :
      <div className={styles.card}>
        <h3>Thank You for your support, here's the Premium content!</h3>
        <p>Your NFT unlocked access to this content.</p>

        {contractMetadata && (
          <div className={styles.nft}>
            <MediaRenderer
              src={contractMetadata.image}
              alt={contractMetadata.name}
              width="70px"
              height="70px"
            />
            <div className={styles.nftDetails}>
              <h4>{contractMetadata.name}</h4>
              <p>{contractMetadata.description}</p>
            </div>
          </div>
        )}
        <ExclusiveContent/>
        {contractLoading && <p>Loading...</p>}

        <ConnectWallet theme="dark" className={styles.connect } btnTitle="mamama" />
      </div>
}
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  const user = await getUser(context.req);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const secretKey = process.env.TW_SECRET_KEY;

  if (!secretKey) {
    console.log("Missing env var: TW_SECRET_KEY");
    throw new Error("Missing env var: TW_SECRET_KEY");
  }

  // Ensure we are able to generate an auth token using our private key instantiated SDK
  const PRIVATE_KEY = process.env.THIRDWEB_AUTH_PRIVATE_KEY;
  if (!PRIVATE_KEY) {
    throw new Error("You need to add an PRIVATE_KEY environment variable.");
  }

  // Instantiate our SDK
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.THIRDWEB_AUTH_PRIVATE_KEY,
    "mumbai",
    { secretKey }
  );

  // Check to see if the user has an NFT
  // const hasNft = await checkBalance(sdk, user.address);
  //   console.log("has nft ",hasNft)
  // // If they don't have an NFT, redirect them to the login page
  // if (!hasNft) {
  //   console.log("no nfts,redirecting")
  //   return {
  //     redirect: {
  //       destination: "/claim",
  //       permanent: false,
  //     },
  //   };
  // }

  // Finally, return the props
  return {
    props: {},
  };
}
