import React, { useEffect, useState } from 'react'
import { faEllipsisV, faFilePen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dropdown } from 'react-bootstrap';
import styles from "../styles/EllipsisButton.module.css"
import { Link, useNavigate } from 'react-router-dom';
import { axiosRes } from '../api/axiosDefaults';

export const EllipsisButton = ({ isType, id, handleDelete }) => {
    const [typelink, setTypelink] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        if (isType === "todo") {
            setTypelink("/todo")
        } else if (isType === "profile") {
            setTypelink("/profile")
        }
    }, [isType])
            

    const handleChange = (e) => {
        e.preventDefault();
        navigate(`${typelink}/${id}/edit`)
    }

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
        <Dropdown.Item className={styles.menuItem} onClick={handleChange}><FontAwesomeIcon icon={faFilePen} alt="edit" /></Dropdown.Item>
        <Dropdown.Divider className='p-0 m-0'/>
        <Dropdown.Item  onClick={handleDelete} className={styles.menuItem}><FontAwesomeIcon icon={faTrashCan} alt="delete" /></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}



