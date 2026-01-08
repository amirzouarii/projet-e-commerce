import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { getMyProd } from '../JS/actions/productAction';
import { getProfile, createProfile, updateProfile } from '../JS/actions/profileAction';
import ListeProd from '../components/ListeProd';
import AddProduct from '../components/AddProduct';
import { Form, Button } from 'react-bootstrap';

const Profil = () => {
  const user = useSelector(state => state.authReducer.user)
  const dispatch = useDispatch();
  const myProd = useSelector(state=>state.productReducer.myProduct)
  const { profile, loading } = useSelector(state => state.profileReducer)

  const [form, setForm] = useState({ fullName: '', address: '', phone: '', preferences: '' })

  useEffect(() => { //useEffect dispatch action
    if (user && user._id) {
      dispatch(getProfile(user._id))
      dispatch(getMyProd())  
    }
  }, [dispatch, user])

  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.fullName || '',
        address: profile.address || '',
        phone: profile.phone || '',
        preferences: profile.preferences || ''
      })
    }
  }, [profile])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (profile) {
      dispatch(updateProfile(user._id, form))
    } else {
      dispatch(createProfile({ ...form, userId: user._id }))
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h2>Profil</h2>
      <h4>Bonjour, {user?.name}</h4>

      <div style={{ marginTop: 20 }}>
        <h5>Mes informations</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nom complet</Form.Label>
            <Form.Control name="fullName" value={form.fullName} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Adresse</Form.Label>
            <Form.Control name="address" value={form.address} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Téléphone</Form.Label>
            <Form.Control name="phone" value={form.phone} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Préférences</Form.Label>
            <Form.Control name="preferences" value={form.preferences} onChange={handleChange} />
          </Form.Group>
          <Button type="submit" disabled={loading}>{profile ? 'Mettre à jour le profil' : 'Créer le profil'}</Button>
        </Form>
      </div>

      <div style={{ marginTop: 30 }}>
        <h5>Mes produits</h5>
        <AddProduct />
        <ListeProd products={myProd} all={false} />
      </div>
    </div>
  )
}

export default Profil