import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    password_confirmation: '',
    name: '',
    no_hp: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // pakai Inertia untuk post form
    router.post('/action/register', form, {
      onError: (errs) => setErrors(errs as Record<string, string>),
      onSuccess: () => router.visit('/login'), // redirect ke login kalau sukses
    });
  };

  return (
    <main>
      <h2>Register</h2>
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

        <section>
          <label htmlFor="password_confirmation">Confirm Password</label>
          <input type="password" id="password_confirmation" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} required />
        </section>

        <section>
          <label htmlFor="name">Nama</label>
          <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
        </section>

        <section>
          <label htmlFor="no_hp">No. Hp</label>
          <input type="text" id="no_hp" name="no_hp" value={form.no_hp} onChange={handleChange} required />
        </section>

        <button type="submit">Register</button>
        <button type="button" onClick={() => router.visit('/login')}>Login</button>
      </form>
    </main>
  );
}