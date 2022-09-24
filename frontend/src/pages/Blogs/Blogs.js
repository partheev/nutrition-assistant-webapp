import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/blog.module.css';
import { Box, Container, Grid } from '@mui/material';
import { Button } from '@mui/material';
import nature from '../../images/healthtips.jpg';
import week from '../../images/week-plan.jpg';
const Blogs = () => {
    return (
        <div
            style={{
                backgroundColor: 'var(--backgroundColor)',
                minHeight: '100vh',
            }}
        >
            <div
                style={{
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px 0px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <h1
                    style={{
                        display: 'inline-block',
                        margin: '0 auto',
                        padding: '0.8rem',
                    }}
                >
                    Blogs
                </h1>
            </div>
<<<<<<< HEAD
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
                  <Button variant="outlined" href="/blog/dailydiet">
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
=======
            <Container maxWidth='lg'>
                <Box sx={{ mt: '2rem', mx: '2rem', pb: '8rem' }}>
                    <Grid container spacing={3}>
                        <Grid item sm={6} lg={4} xs={12}>
                            <div
                                style={{ width: '100%' }}
                                className={styles.cardContainer}
                            >
                                <div className={styles.cardImage}>
                                    <img src={nature} />
                                </div>
                                <div className={styles.cardBody}>
                                    <span className={styles.cardBadge}>
                                        Nutrition
                                    </span>
                                    <h1>
                                        Why Is Healthy Food Important In Our
                                        Daily Life?
                                    </h1>
                                    <p className={styles.cardBubtitle}>
                                        Because unhealthy food habits not only
                                        degrade your physical wellness....
                                    </p>
                                    <div className={styles.cardAuthor}>
                                        <Button
                                            variant='outlined'
                                            href='/blog/healthyliving'
                                            className={styles.btnInfo}
                                        >
                                            Read More
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item sm={6} lg={4} xs={12}>
                            <div
                                style={{ width: '100%' }}
                                className={styles.cardContainer}
                            >
                                <div className={styles.cardImage}>
                                    <img
                                        src={week}
                                        alt='a brand new sports car'
                                    />
                                </div>
                                <div className={styles.cardBody}>
                                    <span className={styles.cardBadge}>
                                        Daily Diet
                                    </span>
                                    <h1>
                                        Why is it important to make a meal plan?
                                    </h1>
                                    <p className={styles.cardBubtitle}>
                                        Meal planning is the process of deciding
                                        what to eat for a certain amount of
                                        time...
                                    </p>
                                    <div className={styles.cardAuthor}>
                                        <Button variant='outlined' href='#'>
                                            Read More
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
>>>>>>> main
};

export default Blogs;
