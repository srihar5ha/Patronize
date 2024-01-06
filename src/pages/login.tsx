import {
  ConnectWallet,
  MediaRenderer,
  useAddress,
  useContract,
  useContractMetadata,
  useClaimNFT,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getUser } from "../../auth.config";
import { contractAddress } from "../../const/yourDetails";
import { Header } from "../components/Header";
import styles from "../styles/Home.module.css";
import checkBalance from "../util/checkBalance";

export default function Login() {
  const { contract } = useContract(contractAddress);
  const { data: contractMetadata, isLoading: contractLoading } =
    useContractMetadata(contract);
  const address = useAddress();
  const { data: nfts } = useOwnedNFTs(contract, address);
  const router = useRouter();

  useEffect(() => {
    console.log("login data ",address,nfts)
    if (address) {
      router.push("/");
    }
  }, [nfts, router, address]);






  return (
    <div className={styles.container}>
      <Header />
      {/* <h2 className={styles.heading}>Welcome to</h2> */}
      <br />
      <h3>A new way to Support content creators. </h3>

      <h5>Access exclusive content made by people you love and support them directly, no middleman, no fees, no ads,On Polygon
      </h5>

      {/* <div className={styles.card}>
        <p>To access this content, you need:</p>

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
            <p>Please support our work by buying this NFT</p>
            </div>
          </div>
        )}
        {contractLoading && <p>Loading...</p>}
        


        <ConnectWallet theme="dark" className={styles.connect}/>
      </div> */}
      <ConnectWallet theme="dark" className={styles.connect}/>

    </div>
  );
}

// export async function getServerSideProps(context) {
//   const user = await getUser(context.req);

//   if (!user) {
//     console.log("no user.")

//     return {
//       props: {},
//     };
//   }

//   const secretKey = process.env.TW_SECRET_KEY;

//   if (!secretKey) {
//     console.log("Missing env var: TW_SECRET_KEY");
//     throw new Error("Missing env var: TW_SECRET_KEY");
//   }

//   // Ensure we are able to generate an auth token using our private key instantiated SDK
//   const PRIVATE_KEY = process.env.THIRDWEB_AUTH_PRIVATE_KEY;
//   if (!PRIVATE_KEY) {
//     throw new Error("You need to add an PRIVATE_KEY environment variable.");
//   }

//   // Instantiate our SDK
//   const sdk = ThirdwebSDK.fromPrivateKey(
//     process.env.THIRDWEB_AUTH_PRIVATE_KEY,
//     "mumbai",
//     { secretKey }
//   );

//   // Check to see if the user has an NFT
//   const hasNft = await checkBalance(sdk, user.address);
//     console.log("has nft ",hasNft);
//   // If they have an NFT, redirect them to the home page
//   if (hasNft) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   // Finally, return the props
//   return {
//     props: {},
//   };
// }
