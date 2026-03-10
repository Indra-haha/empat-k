import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useId, useState } from 'react';
export default function Login() {
    const id = useId();
    const { flash } = usePage().props as unknown as { flash: { success?: string } }; // get flash messages
    const [message, setMessage] = useState(flash.success || null);
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const submit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        post(route('login'), {
         onSuccess: () => reset('password'),
        })
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <form onSubmit={submit} className="text-green-800 max-w-[300px]">
                {message && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {message}
                    </div>
                )}
                <h1 className="text-2xl font-semibold text-center pb-2 pt-4">Log in</h1>
                <div className='mt-4'>
                    <InputLabel htmlFor={`${id}->username`} value="Username" children={undefined} />

                    <TextInput
                        id={`${id}-username`}
                        type="text"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('username', e.target.value)}
                    />

                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor={`${id}->password`} value="Password" children={undefined} />

                    <TextInput
                        id={`${id}-password`}
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e: { target: { checked: boolean; }; }) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-green-800">
                            Remember me
                        </span>
                    </label>
                </div>


                <div className="mt-4 flex flex-col items-center justify-end gap-1">
                    <PrimaryButton className="w-full justify-center rounded-md py-2 my-2" disabled={processing}>
                        Apply
                    </PrimaryButton>
                    <span className="text-sm text-green-800">Belum punya akun?
                        <Link
                            href={route('register')}
                            className="rounded-md text-sm text-green-800 underline hover:text-green-900 "
                        >
                            daftar saja!
                        </Link>
                    </span>

                </div>
            </form>
        </GuestLayout>
    );
}
