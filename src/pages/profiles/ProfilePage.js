import React, { useEffect, useState } from 'react'
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import loading from "../../assets/loading.gif"
import Avatar from '../../components/Avatar';
import { EllipsisProfileButton } from '../../components/EllipsisButton';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/ProfilePage.module.css';
import UsernameForm from './UsernameForm';

export const ProfilePage = () => {

    const currentUser = useCurrentUser();

    const { id } = useParams();
    const [showEditUserNameForm, setShowEditUserNameForm] = useState(false);
    const [profile, setProfile] = useState({ results: [] })
    const [hasLoaded, setHasLoaded] = useState(false);

    const {content, created_at, image, is_owner, name, owner} = profile;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axiosReq.get(`/profile/${id}/`);
                setProfile(data);
                setHasLoaded(true);
            } catch (error) {
                
            }
        }
        setHasLoaded(false);
        fetchProfile();
    },[id, currentUser])

  return (
    <Col xs={10} md={6} className="mx-auto">
        <Card className={styles.card} >
            {hasLoaded ? (
                <Card.Body className={styles.avatarOuter}>
                    <div className={`${styles.avatar} bg-white rounded-circle`}>
                        <Avatar src={image} height="100"></Avatar>
                    </div>
                    {is_owner ? (<span className='d-flex ms-auto'><EllipsisProfileButton id={profile?.id} className="mt-2" setShowEditUserNameForm={setShowEditUserNameForm}/></span>) : ("")}
                    {showEditUserNameForm ? (<UsernameForm setShowEditUserNameForm={setShowEditUserNameForm} profile={profile} setProfile={setProfile}/>) : (<Card.Title className={styles.underAvatar}>{owner}</Card.Title>)}
                    {name && <Card.Subtitle className="mb-2 text-muted">{name}</Card.Subtitle>}
                    <Card.Text className='mb-2 mt-3 '>About me:</Card.Text>
                    <Card.Text>

                        {content ? (
                            content
                        ) : (
                            name ? (<>{name} hasn't written anything yet..</>) : (<>{owner} hasn't written anything yet..</>))}

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
