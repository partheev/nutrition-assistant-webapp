import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/blog.module.css";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import nature from '../../images/healthtips.jpg';
import week from '../../images/week-plan.jpg';
const Blogs = () => {
  return (
    <>
    
      <h1 className={styles.header}>
        Life is not living, but living in health
      </h1>
      <div className={styles.container}>
        <Grid container spacing={5}>
          <Grid item md={6} xs={12}>
            <div className={styles.cardContainer}>
              <div className={styles.cardImage}>
                <img src={nature} />
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardBadge}>Nutrition</span>
                <h1>Why Is Healthy Food Important In Our Daily Life?</h1>
                <p className={styles.cardBubtitle}>
                  Because unhealthy food habits not only degrade your physical
                  wellness....
                </p>
                <div className={styles.cardAuthor}>
                  <Button variant="outlined" href="/blog/healthyliving" className={styles.btnInfo}>
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className={styles.cardContainer}>
              <div className={styles.cardImage}>
                <img
                  src={week}
                  alt="a brand new sports car"
                />
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardBadge}>Daily Diet</span>
                <h1>Why is it important to make a meal plan?</h1>
                <p className={styles.cardBubtitle}>
                Meal planning is the process of deciding what to eat for a certain amount of time...
                </p>
                <div className={styles.cardAuthor}>
                  <Button variant="outlined" href="#">
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Blogs;
