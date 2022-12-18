import React, { useEffect, useState } from 'react'
import { faEllipsisV, faFilePen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';
import styles from "../styles/EllipsisButton.module.css"
import { Link } from 'react-router-dom';
import { axiosRes } from '../api/axiosDefaults';

export const EllipsisButton = ({ isType, id, handleDelete }) => {
    const [typelink, setTypelink] = useState("")

    useEffect(() => {
        if (isType === "todo") {
            setTypelink("/todo")
        } else if (isType === "profile") {
            setTypelink("/profile")
        }
    }, [isType])
            

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          href=""
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
          className="text-decoration-none color-black"
        >
          {children}
          <FontAwesomeIcon icon={faEllipsisV} className="" />
        </a>
        ));

  return (
    <Dropdown drop="left">
      <Dropdown.Toggle as={CustomToggle} variant="success" id="dropdown-basic" >
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.menuOuter}>
        <Dropdown.Item className={styles.menuItem}><Link to={`${typelink}/${id}/edit`}><FontAwesomeIcon icon={faFilePen} alt="edit" /></Link></Dropdown.Item>
        <Dropdown.Divider className='p-0 m-0'/>
        <Dropdown.Item  onClick={handleDelete} className={styles.menuItem}><FontAwesomeIcon icon={faTrashCan} alt="delete" /></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}



