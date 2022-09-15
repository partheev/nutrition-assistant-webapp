import React from 'react'
import styles from '../../styles/home.module.css'

const About = () => {
  return (
    <div>
      {' '}
      <div className={styles.why}>
        <img
          style={{
            width: '19rem',
            height: '12rem',
            boxShadow:
              '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          }}
          src="/static/img/snack-bento-box.webp"
          alt=""
        ></img>
        <h1 className={styles.text} style={{ width: '20rem' }}>
          Relax, We will take care of your healthy DIET
        </h1>
      </div>
      <div
        className={`${styles.why} ${styles.rev}`}
        style={{ backgroundColor: '#f6f6f6' }}
      >
        <h1 className={styles.text} style={{ width: '20rem' }}>
          Relax, We will take care of your healthy DIET
        </h1>
        <img
          style={{
            width: '19rem',
            height: '12rem',
            boxShadow:
              '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          }}
          src="/static/img/snack-bento-box.webp"
          alt=""
        ></img>
      </div>
      <div className={styles.why}>
        <img
          style={{
            width: '19rem',
            height: '12rem',
            boxShadow:
              '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          }}
          src="/static/img/snack-bento-box.webp"
          alt=""
        ></img>
        <h1 className={styles.text} style={{ width: '20rem' }}>
          Relax, We will take care of your healthy DIET
        </h1>
      </div>
    </div>
  )
}

export default About
