import React from "react";
import { PageWithHeaderBack } from "../Layout/PageWithHeaderBack";
import { RequestProps } from "@/Types/Request";
import { PenTool, Target, TextInitial, Palette, Asterisk } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function RequestShow({ request }: { request: RequestProps }) {
    console.log("RequestShow component rendered", request);
    return (
        <PageWithHeaderBack title="Request Details" route="requests">
            <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col items-start mb-6 gap-3">
                    <div>
                        <span className="text-blue-600 text-sm text-semibold mb-2">
                            #CUST-{request.no}
                        </span>
                        <h1 className="text-2xl text-semibold capitalize">
                            {request.product}
                        </h1>
                    </div>
                    <h3 className="text-md text-gray-600">
                        {request.category}
                    </h3>
                </div>
                <span className="font-normal text-sm justify-self-end self-start px-3 py-1 bg-blue-100 rounded-full capitalize">
                    {request.status}
                </span>
            </div>
            <LazyLoadImage
                src={request.img_product}
                alt="Hasil Desain"
                className="mb-6"
            />
            <div className="mb-6">
                <p className="w-full break-words text-sm text-normal text-black mb-3 bg-gray-300 p-3 rounded-xl">
                    <strong className="flex flex-row gap-2 items-center mb-2">
                        <TextInitial className="text-md" /> Teks :
                    </strong>{" "}
                    {request.description.teks}
                </p>
                <p className="w-full break-words text-sm text-normal text-black mb-3 bg-gray-300 p-3 rounded-xl">
                    <strong className="flex flex-row gap-2 items-center mb-2">
                        <Target className="text-md" /> Fokus Revisi :
                    </strong>{" "}
                    {request.description.focus_spot}
                </p>
                <p className="w-full break-words text-sm text-normal text-black mb-3 bg-gray-300 p-3 rounded-xl">
                    <strong className="flex flex-row gap-2 items-center mb-2">
                        <PenTool className="text-md" /> Gaya Desain :
                    </strong>{" "}
                    {request.description.style}
                </p>
                <p className="w-full break-words text-sm text-normal text-black mb-3 bg-gray-300 p-3 rounded-xl">
                    <strong className="flex flex-row gap-2 items-center mb-2">
                        <Palette className="text-md" /> Warna Dominan :
                    </strong>{" "}
                    {request.description.color}
                </p>
                <p className="w-full break-words text-sm text-normal text-black mb-3 bg-gray-300 p-3 rounded-xl">
                    <strong className="flex flex-row gap-2 items-center mb-2">
                        <Asterisk className="text-md" /> Referensi Virtual :
                    </strong>{" "}
                    {request.description.reference}
                </p>
            </div>
            <div className="flex flex-col items-start gap-2">
                <span className="text-normal text-md">Hasil Desain</span>
                <LazyLoadImage
                    src={request.upload_image}
                    alt="Hasil Desain"
                    className="rounded-xl"
                />
            </div>
        </PageWithHeaderBack>
    );
}
