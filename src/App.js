// import logo from './logo.svg';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SplashScreen from './SplashScreen';

import './App.css';

const App = () => {
  const [displaySplash, setDisplaySplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [operations, setOperations] = useState([]);

  const handleLogin = async (username, password) => {
    // Здесь отправляется запрос на сервер для авторизации
    const response = await axios.post('/api/login', { username, password });
    // Проверьте ответ от сервера и обновите состояние

    // Если авторизация успешна:
    setIsLoggedIn(true);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

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
            <div>
              {/* Отобразите список операций */}
              {operations.map(op => <div key={op.id}>{op.name}</div>)}
            </div>
        ) : (
            <LoginForm onLogin={handleLogin} />
        )}
      </div>
  );
};
export default App;