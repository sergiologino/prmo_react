// import logo from './logo.svg';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SplashScreen from './SplashScreen';
import UserManagement from './Component/UserManagement';
// Предполагается, что axios уже импортирован
import axios from 'axios';

import './App.css';

const App = () => {
  const [displaySplash, setDisplaySplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Добавлено состояние для проверки, является ли пользователь администратором
  const [operations, setOperations] = useState([]);

  const handleLogin = async (username, password) => {
    // Здесь отправляется запрос на сервер для авторизации
    const response = await axios.post('/api/login', { username, password });
    // Проверьте ответ от сервера и обновите состояние

    // Если авторизация успешна:
    setIsLoggedIn(true);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    // Проверка, является ли пользователь администратором
    // Этот шаг зависит от структуры вашего ответа от сервера
    setIsAdmin(response.data.role === 'admin');

    // Загрузите список операций
    const operationsResponse = await axios.get('/api/operationrecords');
    setOperations(operationsResponse.data);
  };

  if (displaySplash) {
    return <SplashScreen setDisplaySplash={setDisplaySplash} />;
  }

  return (
      <div>
        {isLoggedIn ? (
            isAdmin ? (
                // Показываем управление пользователями, если пользователь - администратор
                <UserManagement />
            ) : (
                // Отображаем список операций для обычного пользователя
                <div>
                  {operations.map(op => <div key={op.id}>{op.name}</div>)}
                </div>
            )
        ) : (
            <LoginForm onLogin={handleLogin} />
        )}
      </div>
  );
};

export default App;
