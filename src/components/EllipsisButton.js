import React, { useState } from 'react'
import { faEllipsisV, faFilePen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Form } from 'react-bootstrap';
import styles from "../styles/EllipsisButton.module.css"

export const EllipsisButton = ({handleEdit, handleDelete}) => {

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
        <Dropdown.Item className={styles.menuItem}><FontAwesomeIcon icon={faFilePen} alt="edit" onClick={handleEdit}/></Dropdown.Item>
        <Dropdown.Divider className='p-0 m-0'/>
        <Dropdown.Item  className={styles.menuItem}><FontAwesomeIcon icon={faTrashCan} alt="delete" onClick={handleDelete}/></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}



