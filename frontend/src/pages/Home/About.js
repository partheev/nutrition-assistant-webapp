import React from 'react'
import styles from '../../styles/home.module.css'
import { motion } from 'framer-motion'

const imgVariants = {
  offscreen: {
    y: 200,
    opacity: 0.1,
  },
  onscreen: {
    y: 0,

    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.4,
    },
  },
}
const textVariants = {
  // offscreen: {
  //   scale: 0,
  // },
  onscreen: {
    // scale: 1,
    transition: {
      type: 'spring',
    },
  },
}

const About = () => {
  return (
    <div>
      {' '}
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        className={styles.why}
      >
        <motion.img
          variants={imgVariants}
          style={{
            width: '19rem',
            height: '12rem',
            boxShadow:
              '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          }}
          src="/static/img/snack-bento-box.webp"
          alt=""
        ></motion.img>
        <motion.h1
          variants={textVariants}
          className={styles.text}
          style={{ width: '20rem' }}
        >
          Relax, We will take care of your healthy DIET
        </motion.h1>
      </motion.div>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        className={`${styles.why} ${styles.rev}`}
        style={{ backgroundColor: '#f6f6f6' }}
      >
        <motion.h1
          className={styles.text}
          variants={textVariants}
          style={{ width: '20rem' }}
        >
          Just take a snap, And know what you are taking
        </motion.h1>
        <motion.img
          variants={imgVariants}
          style={{
            width: '17rem',
            height: '22rem',
            // boxShadow:
            //   '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          }}
          src="/static/img/takingSnap.webp"
          alt=""
        ></motion.img>
      </motion.div>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        className={styles.why}
      >
        <motion.img
          variants={imgVariants}
          style={{
            width: '16rem',
            height: '16rem',
            // boxShadow:
            //   '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          }}
          src="/static/img/data-analytic-icon-6.png"
          alt=""
        ></motion.img>
        <motion.h1
          variants={textVariants}
          className={styles.text}
          style={{ width: '20rem' }}
        >
          We let you track and compare your diet over past week by smooth
          analytics
        </motion.h1>
      </motion.div>
    </div>
  )
}

export default About
