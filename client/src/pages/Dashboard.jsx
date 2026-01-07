import React, { useEffect } from 'react'
import ListUsers from '../components/ListUsers'
import { useDispatch } from 'react-redux'
import { getUsers } from '../JS/actions/userAction';
import DashboardBI from '../components/DashboardBI';

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
        <ListUsers />
        <DashboardBI />
    </div>
  )
}

export default Dashboard