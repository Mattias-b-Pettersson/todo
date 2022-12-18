import React, { useEffect, useState } from 'react'
import { Card, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import loading from "../../assets/loading.gif"
import Avatar from '../../components/Avatar';
import styles from '../../styles/ProfilePage.module.css';

export const ProfilePage = () => {

    const { id } = useParams();

    const [profile, setProfile] = useState({ results: [] })
    const [hasLoaded, setHasLoaded] = useState(false);

    const {content, created_at, image, is_owner, name, owner, updated_at} = profile;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axiosReq.get(`/profile/${id}/`);
                setProfile(data);
                setHasLoaded(true);
            } catch (error) {
                console.log(error)
            }
        }
        setHasLoaded(false);
        fetchProfile();
    },[id])

  return (
    <Col xs={10} md={6} className="mx-auto">
        <Card className={styles.card} >
            {hasLoaded ? (
                <Card.Body className={styles.avatarOuter}>
                    <div className={styles.avatar}>
                        <Avatar src={image} height="100"></Avatar>
                    </div>
                    <Card.Title className={styles.underAvatar}>{owner}</Card.Title>
                    {name && <Card.Subtitle className="mb-2 text-muted">{name}</Card.Subtitle>}
                    <Card.Text className='mb-2 mt-3 '>About me:</Card.Text>
                    <Card.Text>

                        {content ? (
                            content
                        ) : (
                            name ? (<p>{name} hasn't written anything yet..</p>) : (<p>{owner} hasn't written anything yet..</p>))}

                    </Card.Text>
                    <Card.Text className='text-muted mt-5 d-flex ms-auto'>Been a member since: {created_at}</Card.Text>
                </Card.Body>
            ) : (
                <img src={loading} height={102} width={102} alt="loading..." className='mx-auto my-5'/>
            )}
        </Card>
    </Col>
  )
}
