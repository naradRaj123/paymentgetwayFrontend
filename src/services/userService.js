
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveState } from '@/services/storageService';

export const addUser = (users, userData, setUsers, toast) => {
  const newUser = { id: uuidv4(), ...userData, createdAt: new Date().toISOString() };
  const updatedUsers = [...users, newUser];
  setUsers(updatedUsers);
  saveState('users', updatedUsers);
  toast({ title: "User Added", description: `${userData.name} has been added.` });
  return newUser;
};

export const updateUser = (users, userId, userData, setUsers, toast) => {
  const updatedUsers = users.map(user => user.id === userId ? { ...user, ...userData } : user);
  setUsers(updatedUsers);
  saveState('users', updatedUsers);
  toast({ title: "User Updated", description: `User data has been updated.` });
};

export const deleteUser = (users, userId, setUsers, toast) => {
  const updatedUsers = users.filter(user => user.id !== userId);
  setUsers(updatedUsers);
  saveState('users', updatedUsers);
  toast({ title: "User Deleted", description: `User has been deleted.` });
};
