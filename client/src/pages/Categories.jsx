import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, addCategory } from '../JS/actions/categoryAction';
import { Button, Form } from 'react-bootstrap';

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loadC } = useSelector((state) => state.categoryReducer);
  const user = useSelector((state) => state.authReducer.user);

  const [form, setForm] = useState({ name: '', description: '' });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategory(form));
    setForm({ name: '', description: '' });
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h2>Catégories</h2>

      {loadC && <p>Chargement...</p>}

      <ul>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((cat) => (
            <li key={cat._id}>
              <strong>{cat.name}</strong> — {cat.description}
            </li>
          ))
        ) : (
          <p>Aucune catégorie disponible.</p>
        )}
      </ul>

      {/* Formulaire de création visible uniquement pour les admins */}
      {user && user.isAdmin && (
        <div style={{ marginTop: 20 }}>
          <h3>Créer une catégorie</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control name="name" value={form.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" value={form.description} onChange={handleChange} />
            </Form.Group>
            <Button type="submit">Créer</Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Categories;
