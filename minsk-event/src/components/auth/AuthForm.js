'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export const AuthForm = ({ mode = 'register' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const isRegister = mode === 'register';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegister && formData.password !== formData.confirmPassword) {
        setError('Пароли не совпадают');
        return;
      }

      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      
      const response = await axios.post(endpoint, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        router.push('/account');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isRegister ? 'Регистрация' : 'Вход'}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Имя
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Введите ваше имя"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="email@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Пароль
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Введите пароль"
          />
        </div>

        {isRegister && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Подтвердите пароль
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Повторите пароль"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
        >
          {loading ? 'Загрузка...' : (isRegister ? 'Зарегистрироваться' : 'Войти')}
        </button>
      </form>

      <div className="mt-4 text-center">
        {isRegister ? (
          <p className="text-gray-600">
            Уже есть аккаунт?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Войдите
            </a>
          </p>
        ) : (
          <p className="text-gray-600">
            Нет аккаунта?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Зарегистрируйтесь
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;