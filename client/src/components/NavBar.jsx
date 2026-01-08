import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../JS/actions/authAction';
import { useNavigate, NavLink } from 'react-router-dom';

const NavBar = () => {
  const isAuth = useSelector(state => state.authReducer.isAuth);
  const user = useSelector(state => state.authReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-dark navbar-dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="text-light">E-commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            {isAuth ? (
              <>
                <Nav.Link as={NavLink} to="/profile">Profil</Nav.Link>
                <Nav.Link as={NavLink} to="/panier">Panier</Nav.Link>
                <Nav.Link as={NavLink} to="/" onClick={() => dispatch(logout(navigate))}>Logout</Nav.Link>

              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
              </>
            )}
            <Nav.Link as={NavLink} to="/categories">Catégories</Nav.Link>
            {user.isAdmin && (
              <Nav.Link  as={NavLink} to="/admin">Dashboard Admin</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
