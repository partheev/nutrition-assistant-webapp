import React from 'react'
import { Grid, Container, Box } from '@mui/material'
import styles from '../../styles/blog.module.css'
import { motion } from 'framer-motion'
import egg from '../../images/eggs.png'
import banana from '../../images/bananas.png'
import sweetpotato from '../../images/sweetpotato.png'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useNavigate } from 'react-router-dom'

const Blog02 = () => {
  const navigate = useNavigate()
  const pageAnimation = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: 100,
      transition: {
        duration: 0.5,
      },
    },
  }
  const photoAnim = {
    hidden: {
      scale: 1.25,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.75,
        ease: 'easeOut',
      },
    },
  }
  const fade = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: { ease: 'easeOut', duration: 0.75 },
    },
  }

  return (
    <div
      style={{
        backgroundColor: 'var(--backgroundColor)',
        paddingBottom: '70px',
      }}
    >
      <div
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px 0px',
        }}
      >
        <Container maxWidth="lg">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <ArrowBackIosIcon
              onClick={() => navigate('/blogs')}
              sx={{
                cursor: 'pointer',
                position: 'absolute',
                top: '1.3rem',
                left: 0,
                fontSize: '2rem',
              }}
            />
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
        </Container>
      </div>
      <Container maxWidth="lg" sx={{ mt: 4, pb: 5 }}>
        <Box>
          <motion.div
            exit="exit"
            variants={pageAnimation}
            initial="hidden"
            animate="show"
            className={styles.container2}
          >
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
                <motion.img
                  src={egg}
                  alt="nature"
                  className={styles.imgTips1}
                  variants={photoAnim}
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'justify',
                }}
              >
                <motion.div>
                  <motion.h3 variants={fade} className={styles.title}>
                    Foods to Eat in the Morning
                  </motion.h3>
                  <motion.p variants={fade}>
                    <b>Eggs </b> : Eggs make a simple, nutritious breakfast
                    choice. They’re an excellent source of protein, which helps
                    support muscle synthesis. Since protein takes a while to
                    digest, it also helps keep you feeling full
                    <br />
                    <br />
                    <b>Oatmeal </b> : Oatmeal is a classic breakfast option —
                    and it’s nutritious to boot. Plus, oats are a good source of
                    iron, B vitamins, manganese, magnesium, zinc, and selenium.
                    <br />
                    <br />
                    <b>Coffee </b> : It’s high in caffeine, a molecule that
                    promotes alertness, improves mood, and increases physical
                    and mental performance. Notably, many athletes drink coffee
                    as a natural pre-workout beverage to support sports
                    performance
                  </motion.p>
                </motion.div>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'justify',
                }}
              >
                <motion.div>
                  <motion.h3 className={styles.title} variants={fade}>
                    Foods to Eat in the Afternoon
                  </motion.h3>
                  <motion.p className={styles.para} variants={fade}>
                    <b>Whole wheat toast </b> : Glucose is the best energy
                    source for the brain and central nervous system. You can
                    find glucose in carbohydrates like whole wheat and other
                    grains.
                    <br />
                    <br />
                    <b>Bananas</b> : Most fruits contain a variety of sugars
                    (glucose, fructose and sucrose) and fiber – a good
                    combination for a source of energy. Pack a banana in your
                    lunch and save it for when you’re feeling drained later in
                    the day.
                    <br />
                    <br />
                    <b>Oranges</b> : Another fruit that works as a pick-me-up is
                    oranges. This vitamin C-packed snack also contains
                    potassium, folate and fiber. Not to mention it smells
                    divine!
                  </motion.p>
                </motion.div>
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
                <motion.img
                  src={banana}
                  alt="nature"
                  className={styles.imgTips1}
                  variants={photoAnim}
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
                <motion.img
                  src={sweetpotato}
                  alt="nature"
                  className={styles.imgTips1}
                  variants={photoAnim}
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'justify',
                }}
              >
                <motion.div>
                  <motion.h3 className={styles.title} variants={fade}>
                    Foods to Eat in the Evening
                  </motion.h3>
                  <motion.p className={styles.para} variants={fade}>
                    <b>Stuffed sweet potatoes </b> : Sweet potatoes are loaded
                    with beneficial nutrients like beta carotene, vitamin C,
                    potassium, and fiber.Plus, they’re delicious and pair well
                    with just about anything. This makes them the perfect base
                    on which to build a filling meal.
                    <br />
                    <br />
                    <b>Grain bowls </b>: Grains provide an important source of
                    fiber and other nutrients like magnesium. Studies have found
                    that diets rich in grains are linked to a lower risk of
                    several health conditions, including colon cancer, heart
                    disease, and type 2 diabetes
                    <br />
                    <br />
                    <b>Chapatis </b> : Chapatis are rich in fiber and contain a
                    high amount of protein and healthy complex fats. Also,
                    chapatis help you keep satiated for longer periods of time.
                    It contains a good amount of calcium, magnesium, phosphorous
                    and sodium and does not spike the blood sugar levels as
                    quickly as rice.
                  </motion.p>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>

          {/* mobile container */}
          <motion.div
            className={styles.container3}
            exit="exit"
            variants={pageAnimation}
            initial="hidden"
            animate="show"
          >
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
                <motion.img
                  src={egg}
                  alt="nature"
                  className={styles.imgTips1}
                  variants={photoAnim}
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
                <motion.div>
                  <motion.h3 className={styles.title} variants={fade}>
                    Foods to Eat in the Morning
                  </motion.h3>
                  <motion.p className={styles.para} variants={fade}>
                    <b>Eggs </b> : Eggs make a simple, nutritious breakfast
                    choice. They’re an excellent source of protein, which helps
                    support muscle synthesis. Since protein takes a while to
                    digest, it also helps keep you feeling full
                    <br />
                    <br />
                    <b>Oatmeal </b> : Oatmeal is a classic breakfast option —
                    and it’s nutritious to boot. Plus, oats are a good source of
                    iron, B vitamins, manganese, magnesium, zinc, and selenium.
                    <br />
                    <br />
                    <b>Coffee </b> : It’s high in caffeine, a molecule that
                    promotes alertness, improves mood, and increases physical
                    and mental performance. Notably, many athletes drink coffee
                    as a natural pre-workout beverage to support sports
                    performance
                  </motion.p>
                </motion.div>
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
                <motion.img
                  src={banana}
                  alt="nature"
                  className={styles.imgTips1}
                  variants={photoAnim}
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
                <motion.div>
                  <motion.h3 className={styles.title} variants={fade}>
                    Foods to Eat in the Afternoon
                  </motion.h3>
                  <motion.p className={styles.para} variants={fade}>
                    <b>Whole wheat toast </b> : Glucose is the best energy
                    source for the brain and central nervous system. You can
                    find glucose in carbohydrates like whole wheat and other
                    grains.
                    <br />
                    <br />
                    <b>Bananas</b> : Most fruits contain a variety of sugars
                    (glucose, fructose and sucrose) and fiber – a good
                    combination for a source of energy. Pack a banana in your
                    lunch and save it for when you’re feeling drained later in
                    the day.
                    <br />
                    <br />
                    <b>Oranges</b> : Another fruit that works as a pick-me-up is
                    oranges. This vitamin C-packed snack also contains
                    potassium, folate and fiber. Not to mention it smells
                    divine!
                  </motion.p>
                </motion.div>
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
                <motion.img
                  src={sweetpotato}
                  alt="nature"
                  className={styles.imgTips1}
                  variants={photoAnim}
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
                <motion.div>
                  <motion.h3 className={styles.title} variants={fade}>
                    Foods to Eat in the Evening
                  </motion.h3>
                  <motion.p className={styles.para} variants={fade}>
                    <b>Stuffed sweet potatoes </b> : Sweet potatoes are loaded
                    with beneficial nutrients like beta carotene, vitamin C,
                    potassium, and fiber.Plus, they’re delicious and pair well
                    with just about anything. This makes them the perfect base
                    on which to build a filling meal.
                    <br />
                    <br />
                    <b>Grain bowls </b>: Grains provide an important source of
                    fiber and other nutrients like magnesium. Studies have found
                    that diets rich in grains are linked to a lower risk of
                    several health conditions, including colon cancer, heart
                    disease, and type 2 diabetes
                    <br />
                    <br />
                    <b>Chapatis </b> : Chapatis are rich in fiber and contain a
                    high amount of protein and healthy complex fats. Also,
                    chapatis help you keep satiated for longer periods of time.
                    It contains a good amount of calcium, magnesium, phosphorous
                    and sodium and does not spike the blood sugar levels as
                    quickly as rice.
                  </motion.p>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Box>
      </Container>
    </div>
  )
}

export default Blog02
