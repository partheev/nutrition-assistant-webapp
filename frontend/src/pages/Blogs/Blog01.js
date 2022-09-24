import React from 'react';
import nature from '../../images/healthtips.jpg';
import blog1 from '../../images/blog1.jpg';
import blog2 from '../../images/blog2.jpg';
import blog3 from '../../images/blog3.jpg';
import blog4 from '../../images/blog4.jpg';
import blog5 from '../../images/blog5.jpg';
import blog6 from '../../images/blog6.jpg';
import { Grid, Container, Box } from '@mui/material';
import styles from '../../styles/blog.module.css';
const Blog01 = () => {
    return (
        <>
            <Container maxWidth='lg' sx={{ mt: 2, pb: 5 }}>
                <Box>
                    <div className={styles.container2}>
                        <Grid container spacing={5}>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src={blog1}
                                    alt='nature'
                                    className={styles.imgTips}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <div>
                                    <h3 className={styles.title}>
                                        1.Eat Healthy diet
                                    </h3>
                                    <p className={styles.para}>
                                        By eating a combination of different
                                        foods, including fruits, vegetables,
                                        legumes, nuts, and whole grains.you will
                                        reduce your risk of malnutrition and
                                        non-communicable diseases (NCDs) such as
                                        diabetes, heart disease, stroke, and
                                        cancer.
                                    </p>
                                </div>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <div>
                                    <h3 className={styles.title}>
                                        2.Stay Hydrated
                                    </h3>
                                    <p className={styles.para}>
                                        staying hydrated helps ensure that your
                                        body is functioning optimally and that
                                        your blood volume is sufficient.
                                        Drinking water is the best way of
                                        staying hydrated, as it is free of
                                        calories and sugar
                                    </p>
                                </div>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src={blog2}
                                    alt='nature'
                                    className={styles.imgTips}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src={blog3}
                                    alt='nature'
                                    className={styles.imgTips}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <div>
                                    <h3 className={styles.title}>
                                        3.Reduce Fat Intake
                                    </h3>
                                    <p className={styles.para}>
                                        Eating a high fat diet may contribute to
                                        heart disease and excess body weigh.
                                        low-fat style of eating is important for
                                        maintaining a healthy weight and prevent
                                        heart disease. The fat intake should be
                                        25 to 35 percent of total calories from
                                        fat.
                                    </p>
                                </div>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <div>
                                    <h3 className={styles.title}>
                                        4.Consume less salt and sugar
                                    </h3>
                                    <p className={styles.para}>
                                        Most people get their sodium through
                                        salt. Reduce your salt intake to 5g per
                                        day, equivalent to about one teaspoon.
                                        On the other hand, consuming excessive
                                        amounts of sugar increases the risk of
                                        tooth decay and unhealthy weight gain.
                                        Reduce your sugar to 50g or about 12
                                        teaspoons.
                                    </p>
                                </div>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src={blog4}
                                    alt='nature'
                                    className={styles.imgTips}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src={blog5}
                                    alt='nature'
                                    className={styles.imgTips}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <div>
                                    <h3 className={styles.title}>
                                        5.Avoid harmful smoking and drinking
                                        alchohol
                                    </h3>
                                    <p className={styles.para}>
                                        If you do any of these actions, consider
                                        cutting back or quitting to help reduce
                                        your risk for chronic disease. Smoking
                                        tobacco causes NCDs such as lung
                                        disease, heart disease and stroke.
                                    </p>
                                </div>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <div>
                                    <h3 className={styles.title}>
                                        6.Do exercise regularly
                                    </h3>
                                    <p className={styles.para}>
                                        Whatever your age, there's strong
                                        scientific evidence that being
                                        physically active can help you lead a
                                        healthier and happier life. People who
                                        exercise regularly have a lower risk of
                                        developing many long-term (chronic)
                                        conditions, such as heart disease, type
                                        2 diabetes, stroke, and some cancers.
                                    </p>
                                </div>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src={blog6}
                                    alt='nature'
                                    className={styles.imgTips}
                                />
                            </Grid>
                        </Grid>
                    </div>

                    {/* mobile container */}
                    <div className={styles.container3}>
                        <Grid container spacing={5}>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src={blog1}
                                    alt='nature'
                                    className={styles.imgTips}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <div>
                                    <h3 className={styles.title}>
                                        1.Eat Healthy diet
                                    </h3>
                                    <p className={styles.para}>
                                        By eating a combination of different
                                        foods, including fruits, vegetables,
                                        legumes, nuts, and whole grains.you will
                                        reduce your risk of malnutrition and
                                        non-communicable diseases (NCDs) such as
                                        diabetes, heart disease, stroke, and
                                        cancer.
                                    </p>
                                </div>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src={blog2}
                                    alt='nature'
                                    className={styles.imgTips}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <div>
                                    <h3 className={styles.title}>
                                        2.Stay Hydrated
                                    </h3>
                                    <p className={styles.para}>
                                        staying hydrated helps ensure that your
                                        body is functioning optimally and that
                                        your blood volume is sufficient.
                                        Drinking water is the best way of
                                        staying hydrated, as it is free of
                                        calories and sugar
                                    </p>
                                </div>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src={blog3}
                                    alt='nature'
                                    className={styles.imgTips}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <div>
                                    <h3 className={styles.title}>
                                        3.Reduce Fat Intake
                                    </h3>
                                    <p className={styles.para}>
                                        Eating a high fat diet may contribute to
                                        heart disease and excess body weigh.
                                        low-fat style of eating is important for
                                        maintaining a healthy weight and prevent
                                        heart disease. The fat intake should be
                                        25 to 35 percent of total calories from
                                        fat.
                                    </p>
                                </div>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src={blog4}
                                    alt='nature'
                                    className={styles.imgTips}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <div>
                                    <h3 className={styles.title}>
                                        4.Consume less salt and sugar
                                    </h3>
                                    <p className={styles.para}>
                                        Most people get their sodium through
                                        salt. Reduce your salt intake to 5g per
                                        day, equivalent to about one teaspoon.
                                        On the other hand, consuming excessive
                                        amounts of sugar increases the risk of
                                        tooth decay and unhealthy weight gain.
                                        Reduce your sugar to 50g or about 12
                                        teaspoons.
                                    </p>
                                </div>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src={blog5}
                                    alt='nature'
                                    className={styles.imgTips}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <div>
                                    <h3 className={styles.title}>
                                        5.Avoid harmful smoking and drinking
                                        alchohol
                                    </h3>
                                    <p className={styles.para}>
                                        If you do any of these actions, consider
                                        cutting back or quitting to help reduce
                                        your risk for chronic disease. Smoking
                                        tobacco causes NCDs such as lung
                                        disease, heart disease and stroke.
                                    </p>
                                </div>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src={blog6}
                                    alt='nature'
                                    className={styles.imgTips}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <div>
                                    <h3 className={styles.title}>
                                        6.Do exercise regularly
                                    </h3>
                                    <p className={styles.para}>
                                        Whatever your age, there's strong
                                        scientific evidence that being
                                        physically active can help you lead a
                                        healthier and happier life. People who
                                        exercise regularly have a lower risk of
                                        developing many long-term (chronic)
                                        conditions, such as heart disease, type
                                        2 diabetes, stroke, and some cancers.
                                    </p>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            </Container>
        </>
    );
};

export default Blog01;
