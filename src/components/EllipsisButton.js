import React from 'react'
import { faEllipsisV, faFilePen, faTrashCan, faKey, faEdit, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";


import styles from "../styles/EllipsisButton.module.css"
import { useNavigate } from 'react-router-dom';


export const EllipsisButton = ({ handleDelete, handleEdit }) => {
            
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <Button
          variant='link'
          className=""
          href=""
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
          <FontAwesomeIcon icon={faEllipsisV} className="color-black" />
        </Button>
        ));

  return (
    <Dropdown drop="left">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-basic" >
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.menuOuter}>
        <Dropdown.Item className={styles.menuItem} onClick={handleEdit}><FontAwesomeIcon icon={faFilePen} alt="edit" /></Dropdown.Item>
        <Dropdown.Divider className='p-0 m-0'/>
        <Dropdown.Item  onClick={handleDelete} className={styles.menuItem}><FontAwesomeIcon icon={faTrashCan} alt="delete" /></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export function EllipsisProfileButton({ id, setShowEditUserNameForm}) {
  const navigate = useNavigate();

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Button
      variant='link'
      className=""
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <FontAwesomeIcon icon={faEllipsisV} className="color-black" />
    </Button>
    ));

  return (
    <Dropdown drop="right">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-basic" >
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.menuOuter}>
        <Dropdown.Item className={styles.menuItem} onClick={() => navigate(`/profiles/${id}/edit`)} ><span className='w-100 mx-2'><FontAwesomeIcon icon={faEdit} alt="edit" className='me-2' />Edit profile</span></Dropdown.Item>
        <Dropdown.Divider className='p-0 m-0'/>
        <Dropdown.Item className={styles.menuItem} onClick={() => setShowEditUserNameForm(true)}><span className='w-100 mx-2'><FontAwesomeIcon icon={faIdCard} alt="edit" className='me-2' />Edit username</span></Dropdown.Item>
        <Dropdown.Divider className='p-0 m-0'/>
        <Dropdown.Item className={styles.menuItem} onClick={() => navigate(`/profiles/${id}/edit/password`)}><span className='w-100 mx-2'><FontAwesomeIcon icon={faKey} alt="Change password" className='me-2' />Change password</span></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
