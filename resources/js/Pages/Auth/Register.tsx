import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import React, { useEffect, useId, useState } from "react";

export default function Register() {
    const id = useId();
    const [step, setStep] = useState(1);
    const nextStep = () => setStep(step + 1);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        no_hp: "",
        username: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        if (step === 2 && errors && Object.keys(errors).length > 0) {
            setStep(1);
        }
    }, [errors]);

    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <section className="flex max-w-[320px] h-screen mx-auto justify-center items-center">
            <form onSubmit={submit} className="text-green-800 max-w-[300px] px-6 w-full">
                {step == 1 && (
                    <section className="flex flex-col gap-4">
                        <h1 className="text-2xl font-semibold text-center pb-2 pt-4">
                            Register
                        </h1>
                        <div className="w-full max-w-[300px]">
                            {errors && Object.keys(errors).length > 0 && (
                                <ul className="w-full">
                                    {Object.values(errors).map(
                                        (error: string, index: number) => (
                                            <li
                                                key={index}
                                                className="text-sm text-red-600 break-words"
                                            >
                                                {error}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            )}
                        </div>
                        <div className="my-1">
                            <InputLabel
                                htmlFor={`${id}->name`}
                                value="Name"
                                children={undefined}
                            />
                            <TextInput
                                id={`${id}-name`}
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="my-1">
                            <InputLabel
                                htmlFor={`${id}-no_hp`}
                                value="No HP"
                                children={undefined}
                            />
                            <TextInput
                                id={`${id}-no_hp`}
                                name="no_hp"
                                value={data.no_hp}
                                className="mt-1 block w-full"
                                autoComplete="no_hp"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("no_hp", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.no_hp}
                                className="mt-2"
                            />
                        </div>
                        <PrimaryButton
                            onClick={nextStep}
                            className="w-full justify-center rounded-md py-2 my-2"
                            disabled={undefined}
                        >
                            Next
                        </PrimaryButton>
                    </section>
                )}
                {step == 2 && (
                    <section className="flex flex-col gap-4">
                        <h1 className="text-2xl font-semibold text-center pb-2 pt-4">
                            Register
                        </h1>

                        <div className="my-1">
                            <InputLabel
                                htmlFor={`${id}-username`}
                                value="Username"
                                children={undefined}
                            />

                            <TextInput
                                id={`${id}-username`}
                                name="username"
                                value={data.username}
                                className="block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                                required
                            />

                            {/* <InputError message={errors.username} className="mt-2" /> */}
                        </div>

                        <div className="my-1">
                            <InputLabel
                                htmlFor={`${id}-password`}
                                value="Password"
                                children={undefined}
                            />

                            <TextInput
                                id={`${id}-password`}
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />

                            {/* <InputError message={errors.password} className="mt-2" /> */}
                        </div>

                        <div className="my-1">
                            <InputLabel
                                htmlFor={`${id}-password_confirmation`}
                                value="Confirm Password"
                                children={undefined}
                            />

                            <TextInput
                                id={`${id}-password_confirmation`}
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                required
                            />
                            {/* 
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            /> */}
                        </div>

                        <div className="mt-4 flex flex-col items-center justify-end gap-1">
                            <PrimaryButton
                                className="w-full justify-center rounded-md py-2 my-2"
                                disabled={processing}
                            >
                                Submit
                            </PrimaryButton>
                            <Link
                                href={route("login")}
                                className="rounded-md text-sm text-green-800 underline hover:text-green-900"
                            >
                                Sudah punya akun?
                            </Link>
                        </div>
                    </section>
                )}
            </form>
        </section>
    );
}
