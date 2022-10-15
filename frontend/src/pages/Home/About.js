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
      duration: 1,
    },
  },
}

const About = () => {
  return (
    <div>
      {' '}
      <div className={styles.why}>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
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
        </motion.div>
        <motion.div className={styles.text}>
          Relax, We will take care of your healthy DIET
        </motion.div>
      </div>
      <div
        className={`${styles.why} ${styles.rev}`}
        style={{ backgroundColor: '#f6f6f6' }}
      >
        <motion.div className={styles.text}>
          Just take a snap, And know what you are taking
        </motion.div>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
        >
          <motion.img
            variants={imgVariants}
            style={{
              width: '17rem',
              height: '22rem',
            }}
            src="/static/img/takingSnap.webp"
            alt=""
          ></motion.img>
        </motion.div>
      </div>
      <div className={styles.why}>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
        >
          <motion.img
            variants={imgVariants}
            style={{
              width: '16rem',
              height: '16rem',
            }}
            src="/static/img/data-analytic-icon-6.png"
            alt=""
          ></motion.img>
        </motion.div>
        <motion.div className={styles.text}>
          We let you track and compare your diet over past week by smooth
          analytics
        </motion.div>
      </div>
    </div>
  )
}

export default About
