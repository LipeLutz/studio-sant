import React from "react";
import Logo from "../Logo";
import { Row, Col } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import "./index.css";

function Header({ handleClick, color }) {
  return (
    <Row className={`${color} p-0 m-0`}>
      <Col className="p-0">
        <Logo />
      </Col>
      <Col className="d-flex justify-content-end p-0">
        <IoClose className="btnClose" onClick={() => handleClick()} />
      </Col>
    </Row>
  );
}

export default Header;
