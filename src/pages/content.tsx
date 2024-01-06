import React from "react";
import styles from "../styles/Content.module.css";
import Image from "next/image";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import { Header } from "../components/Header";
import Link from "next/link";


const ContentPage = () => {

    const cardsData = [
        { image: '/demigod.png', title: 'Lizard 1', description: 'Description 1' },
        { image: '/demigod.png', title: 'Lizard 2', description: 'Description 2' },
        { image: '/demigod.png', title: 'Lizard 3', description: 'Description 3' },
        { image: '/demigod.png', title: 'Lizard 4', description: 'Description 4' },
        { image: '/demigod.png', title: 'Lizard 5', description: 'Description 5' },
        { image: '/demigod.png', title: 'Lizard 6', description: 'Description 6' },

    ];
  return (
    <div className={styles.body}>
        <Header/>
     <div className={styles.content}>


        {cardsData.map((card, index) => (
        <Link href='/'>
        <Card sx={{ maxWidth: 300 }} className={styles.card}>
        <CardActionArea>
        <CardMedia
            component="img"
            height="160"
            image="/demigod.png"
            alt="green iguana"
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
            </CardActionArea>
        </Card>
        </Link>

            ))}
        </div>
    </div>
  );
};

export default ContentPage;