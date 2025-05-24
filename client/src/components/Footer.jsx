import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>E-commerce</h5>
            <p>Votre boutique en ligne de confiance.</p>
          </Col>
          <Col md={4}>
            <h5>Liens utiles</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light">Accueil</a></li>
              <li><a href="/panier" className="text-light">Mon Panier</a></li>
              <li><a href="/profile" className="text-light">Profil</a></li>
              <li><a href="/login" className="text-light">Connexion</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <p>Email : support@ecommerce.com</p>
            <p>Téléphone : +216 00 000 000</p>
          </Col>
        </Row>
        <hr className="bg-light" />
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} E-commerce. Tous droits réservés.</p>
      </Container>
    </footer>
  )
}

export default Footer
