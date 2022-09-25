import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import nature from '../../images/profile.jpg';
import { Button } from '@mui/material';
import styles from '../../styles/blog.module.css';
import { AppContext } from '../../Context/AppContext';
const Profile = () => {
    const { userInfo, handleLogout } = useContext(AppContext);
    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: 'var(--backgroundColor)',
                paddingBottom: '5rem',
            }}
        >
            <div
                style={{
                    backgroundColor: 'var(--backgroundColor)',
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
                    Profile
                </h1>
            </div>
            <Container maxWidth='sm' sx={{ pb: 3, mt: 2 }}>
                <Box
                    sx={{
                        bgcolor: 'white',
                        // height: '100vh',
                        p: 5,
                        borderRadius: '16px',
                        boxShadow: 10,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <img
                                src={nature}
                                alt=''
                                style={{ borderRadius: '50%' }}
                                className={styles.Img}
                            />
                        </div>
                        <div>
                            <h3 style={{ color: 'blue' }}>
                                {userInfo.USERNAME}
                            </h3>
                            <p>{userInfo.EMAIL}</p>
                        </div>
                    </div>

                    <div
                        style={{
                            maxHeight: '50px',
                        }}
                        className={styles.detailsCon}
                    >
                        <div>
                            <h3>Age</h3>
                        </div>
                        <div>
                            <p>
                                <span>{userInfo.AGE}</span> Years
                            </p>
                        </div>
                    </div>
                    <div
                        style={{
                            maxHeight: '50px',
                        }}
                        className={styles.detailsCon}
                    >
                        <div>
                            <h3>Gender</h3>
                        </div>
                        <div>
                            <p>{userInfo.GENDER?.toUpperCase()}</p>
                        </div>
                    </div>
                    <div
                        style={{
                            maxHeight: '50px',
                        }}
                        className={styles.detailsCon}
                    >
                        <div>
                            <h3>Height</h3>
                        </div>
                        <div>
                            <p>{userInfo.HEIGHT} cms</p>
                        </div>
                    </div>
                    <div
                        style={{
                            maxHeight: '50px',
                        }}
                        className={styles.detailsCon}
                    >
                        <div>
                            <h3>Weight</h3>
                        </div>
                        <div>
                            <p>
                                <span>{userInfo.WEIGHT}</span> kg
                            </p>
                        </div>
                    </div>
                    <div
                        style={{
                            paddingTop: '5rem',
                            paddingLeft: '5rem',
                            paddingRight: '5rem',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <div>
                            <Button
                                onClick={handleLogout}
                                variant='contained'
                                color='error'
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </Box>
            </Container>
        </div>
    );
};

export default Profile;
