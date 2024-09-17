import React from "react";
import "./index.css";
import Header from "../Header";
import { Row, Col, Modal, Form, Button } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import Logo from "../Logo";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";
import { TbMailShare } from "react-icons/tb";
import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contato({ setSelectedItem }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function sendEmail(e) {
    e.preventDefault();

    if (name === "" || email === "" || message === "") {
      alert("preencha todos os campos");
      return;
    }

    const templateParams = {
      from_name: name,
      message: message,
      email: email,
    };

    emailjs
      .send(
        "service_4n2zlk1",
        "template_firg295",
        templateParams,
        "ZwPd-81Ic35VlBQFY"
      )
      .then(
        (response) => {
          setName("");
          setEmail("");
          setMessage("");
          console.log(email);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  const handleClick = () => {
    setSelectedItem(null);
    setExpanded(false);
  };

  return (
    <>
      <motion.div
        className="content contato"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inner-content">
          <Header handleClick={handleClick} />
          <Row>
            <Col style={{ marginLeft: "9px", fontWeight: "500" }}>
              <p>Rio de Janeiro</p>
              <p>
                jsantarquitetura@gmail.com
                <TbMailShare
                  onClick={handleShow}
                  style={{
                    fontSize: "18px",
                    cursor: "pointer",
                    marginLeft: "5px",
                  }}
                />
              </p>
              <p>+55 21 988141565</p>
            </Col>
          </Row>
          <Row>
            <Col
              style={{
                display: "flex",
                justifyContent: "end",
                fontSize: "20px",
                gap: "20px",
              }}
            >
              <a
                href="https://www.linkedin.com/in/studio-j-sant-arquitetura-arte-design-b499ab303"
                target="_blank"
              >
                <FaLinkedin color="white" />
              </a>
              <a
                href="https://www.instagram.com/jsant.arquitetura/?igsh=bWI1NWUyMDl4anIw"
                target="_blank"
              >
                <FaInstagram color="white" />
              </a>
              <a href="https://br.pinterest.com/StudioJsant/" target="_blank">
                <FaPinterestP color="white" />
              </a>
            </Col>
          </Row>
        </div>
      </motion.div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body style={{ padding: "10px", color: "white" }}>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu nome aqui"
                autoFocus
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Mensagem</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Digite sua mensagem aqui"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={sendEmail}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
