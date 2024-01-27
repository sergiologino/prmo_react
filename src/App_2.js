import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserManagement from './components/UserManagement';
// Импортируйте другие необходимые компоненты

function App() {
    return (
        <Router>
            <div>
                {/* Здесь может быть ваша навигационная панель, если она есть */}

                <Switch>
                    {/* Другие маршруты */}
                    <Route path="/admin/users" component={UserManagement} />
                    {/* Предполагается, что "/admin/users" - это маршрут для управления пользователями */}
                    {/* Добавьте маршруты для других компонентов, если они есть */}
                </Switch>
            </div>
        </Router>
    );
}

export default App;
