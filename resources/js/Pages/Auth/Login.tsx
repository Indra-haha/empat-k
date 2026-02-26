import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // pakai Inertia untuk post form
    router.post('/action/login', form, {
      onError: (errs) => setErrors(errs as Record<string, string>),
      onSuccess: () => router.visit('/dashboard'), // redirect ke register kalau sukses
    });
  };

  return (
    <main>
      <h2>Login</h2>
      {Object.keys(errors).length > 0 && (
        <ul style={{ color: 'red' }}>
          {Object.entries(errors).map(([key, msg]) => (
            <li key={key}>{msg}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={form.username} onChange={handleChange} required />
        </section>
        <section>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required />
        </section>
        <button type="submit">Register</button>
        <button type="button" onClick={() => router.visit('/login')}>Login</button>
      </form>
    </main>
  );
}