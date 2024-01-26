import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [departmentId, setDepartmentId] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users', error));
    };

    const handleDeleteUser = (userId) => {
        axios.delete(`/api/users/${userId}`)
            .then(() => {
                fetchUsers(); // Обновление списка пользователей после удаления
            })
            .catch(error => console.error('Error deleting user', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { username, password, role, departmentId };

        const request = editingUser
            ? axios.put(`/api/users/${editingUser.id}`, userData)
            : axios.post('/api/users', userData);

        request.then(() => {
            setEditingUser(null);
            setUsername('');
            setPassword('');
            setRole('');
            setDepartmentId('');
            fetchUsers();
        })
            .catch(error => console.error('Error saving user', error));
    };

    const startEdit = (user) => {
        setEditingUser(user);
        setUsername(user.username);
        // Пароль не заполняется из соображений безопасности
        setRole(user.role);
        setDepartmentId(user.departmentId);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                {/* Допустим, у вас есть выпадающий список для выбора роли */}
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">Пользователь</option>
                    <option value="admin">Администратор</option>
                </select>
                <input
                    type="text"
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                    placeholder="Department ID"
                    required
                />
                <button type="submit">Сохранить</button>
                {editingUser && <button onClick={() => setEditingUser(null)}>Отменить редактирование</button>}
            </form>

            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} - {user.role}
                        <button onClick={() => startEdit(user)}>Редактировать</button>
                        <button onClick={() => handleDeleteUser(user.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
