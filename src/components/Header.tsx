import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import Link from "next/link";

export const Header = () => {
  return (
    <nav className={styles.header}>
      <Link href="/">
        <Image
          src="/thirdweb.svg"
          alt="thirdweb"
          width={52}
          height={32}
          className={styles.logo}
        />
      </Link>
      <h1 className={styles.h1}>PATRON</h1>

      <ConnectWallet theme="dark"/>
    </nav>
  );
};
