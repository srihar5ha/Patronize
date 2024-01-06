import React from "react";
import styles from "../styles/Landing.module.css";
import Link from "next/link";
import Button from '@mui/material/Button';


const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
            <Button variant="contained" color="primary" size="large" href="/content">
              <Link href="/content" className="explore">Explore</Link>

            </Button>

  </div>
  );
};

export default LandingPage;