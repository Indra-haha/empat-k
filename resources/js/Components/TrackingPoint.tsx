import React from "react";

export default function TrackingPoint({ statusHistory }) {
    const steps = statusHistory.map((history) => ({
        key: history.status,
        label: history.status,
        date: history.updated_at,
    }));
    console.log(steps.length);

    return (
        <section className="w-full relative">
            {/* Garis utama (background line) */}
            <div className="absolute left-[10px] top-0 bottom-0 w-0.5 bg-gray-300 z-0" />

            <div className="flex flex-col">
                {steps.map((step, index) => {

                    return (
                        <section
                            key={step.key}
                            className="flex items-start mb-6 relative z-10"
                        >
                            {/* Circle */}
                            <header
                                className="w-5 h-5 rounded-full bg-green-500"
                            />

                            {/* Text */}
                            <main className="ml-4">
                                <h2 className="text-sm font-medium capitalize">
                                    {step.label}
                                </h2>
                                <h3 className="text-sm font-normal text-gray-500">
                                    {step.date}
                                </h3>
                            </main>
                            
                        </section>
                    );
                })}
            </div>
        </section>
    );
}
