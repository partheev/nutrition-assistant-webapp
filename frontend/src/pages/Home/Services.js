import React from 'react'
import styles from '../../styles/home.module.css'
import { motion } from 'framer-motion'

const titleVariants = {
  offscreen: {
    x: 40,
  },
  onscreen: {
    x: 0,
    transition: {
      type: 'spring',
      bounce: 0.2,
    },
  },
}

const descVariants = {
  offscreen: {
    x: 40,
  },
  onscreen: {
    x: 0,
    transition: {
      type: 'spring',
      bounce: 0.5,
    },
  },
}
const imgVariants = {
  offscreen: {
    x: -100,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.5,
    },
  },
}
const Services = () => {
  return (
    <div style={{ background: 'var(--backgroundColor)' }}>
      <div>
        <h1
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '2rem 0',
          }}
        >
          Our Services
        </h1>

        <motion.div className={styles.serviceslayout}>
          <motion.img
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            className={styles.serviceimg}
            variants={imgVariants}
            src="/static/img/dietsnap.gif"
            alt=""
          ></motion.img>
          <div className={styles.servicetext}>
            <motion.h1
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
              variants={titleVariants}
              style={{ marginBottom: '12px' }}
            >
              Detailed Reports
            </motion.h1>
            <motion.p variants={descVariants} style={{ fontSize: '17px' }}>
              Our Analytic Charts gives you detailed analysis about your daily
              intake of nutrients. You can track your food along with Nutrients
              for past 7 days.
            </motion.p>
          </div>
        </motion.div>

        <hr
          style={{
            border: 'dotted #7C3E66 6px',
            borderBottom: 'none',
            width: '10%',
            margin: '100px auto',
          }}
        ></hr>
        <motion.div className={styles.serviceslayout}>
          <motion.img
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            variants={imgVariants}
            className={styles.serviceimg}
            src="/static/img/dietsnap.gif"
            alt=""
          ></motion.img>
          <div className={styles.servicetext}>
            <motion.h1
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
              variants={titleVariants}
              style={{ marginBottom: '12px' }}
            >
              Tracking Meals
            </motion.h1>
            <motion.p variants={descVariants} style={{ fontSize: '17px' }}>
              Yes, you can see what you have been taking for a week. You can be
              aware of food items you take. This will give you great knowledge
              about what need to be controlled and what not. This time you will
              never forget what you ate😝
            </motion.p>
          </div>
        </motion.div>
        <hr
          style={{
            border: 'dotted #7C3E66 6px',
            borderBottom: 'none',
            width: '8%',
            margin: '100px auto',
          }}
        ></hr>
        <motion.div className={styles.serviceslayout}>
          <motion.img
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            variants={imgVariants}
            className={styles.serviceimg}
            src="/static/img/dietsnap.gif"
            alt=""
          ></motion.img>
          <div className={styles.servicetext}>
            <motion.h1
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
              variants={titleVariants}
              style={{ marginBottom: '12px' }}
            >
              Everything You Need To Know
            </motion.h1>
            <motion.p variants={descVariants} style={{ fontSize: '17px' }}>
              Our Blog section provides you detailed research about foods,
              nutrients, healthy diet plans, food categories based on nutrients,
              Successful diet plans based on your body goals.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Services
