"use client"

import { useContext, useState } from "react";
import Button from "../components/Button/button";
import { firebaseConfig, formInput } from "../utils/data";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import Spinner from "../components/Spinner/spinner";
import { GlobalContext } from "../context/loading";
import { BlogFormData } from "../utils/types";
import { useSession } from "next-auth/react";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://nextjs-blog-typescript-491fd.appspot.com");

function createUniqueFileName(fileName: string) {
    const timeStamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 12);
    return `${fileName}-${timeStamp}-${randomString}`
}

async function handleImageSaveToFirebase(file: any) {
    const extractUniqueFileName = createUniqueFileName(file?.name);
    const storageRef = ref(storage, `blog/${extractUniqueFileName}`);
    const uploadImg = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
        uploadImg.on("state_changed",
            (snapshot) => { },
            (error) => reject(error),
            () => {
                getDownloadURL(uploadImg.snapshot.ref).then(url => resolve(url)).catch(error => reject);
            });
    });
};

export default function Create() {
    const { formData, setFormData } = useContext(GlobalContext);
    const [imageLoading, setImageLoading] = useState<boolean>(false);
    const { data: session } = useSession();

    async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;
        setImageLoading(true);
        const saveImageToFirebase: any = await handleImageSaveToFirebase(event.target.files[0]);
        if (saveImageToFirebase !== "") {
            setImageLoading(false);
            console.log(saveImageToFirebase, "Firebaseに保存しました");
            setFormData({
                ...formData,
                image: saveImageToFirebase
            });
        }
    }

    async function handleSavePost() {
        console.log(formData);
        const res = await fetch('/api/blog-post/add-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...formData,
                userid: session?.user?.name,
                userimage: session?.user?.image,
                comments: []
            })
        });
        const data = await res.json();
        console.log(data);
    }

    return (
        <section className="overflow-hidden py-16 md:py-20 lg:py-28">
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mb-12 rounded-md bg-primary/20 py-10 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                            <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                ブログ記事を作成する
                            </h2>
                            <div>
                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-3">
                                        <div className={`${imageLoading ? "w-1/2" : "w-full"}`}>
                                            <label className="mb-3 text-sm block font-medium text-dark dark:text-white">
                                                画像をアップロードする
                                            </label>
                                            <input type="file" id="fileInput" accept="image/*" max={1000000} onChange={handleImageChange}
                                                className="w-full mb-8 rounded-xl border-transparent py-3 px-6 text-base
                                                text-body-color placeholder-body-color shadow-one outline-none
                                                focus:border-primary focus-visible:shadow-none dark:bg-[#41476f] dark:shadow-signUp"
                                            />
                                        </div>
                                        {
                                            imageLoading ? <div className="w-1/2"><Spinner /></div> : null
                                        }
                                    </div>
                                    <div className="-mx-4 flex flex-wrap">
                                        {formInput.map((item) => (
                                            <div className="w-full px-4">
                                                <label className="mb-3 block text-sm font-bold text-dark dark:text-white">
                                                    {item.label}
                                                </label>
                                                {
                                                    item.component === "input" ? (
                                                        <input
                                                            type={item.type}
                                                            name={item.id}
                                                            placeholder={item.placeholder}
                                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    [item.id]: event.target.value
                                                                });
                                                            }}
                                                            value={formData[item.id as keyof BlogFormData]}
                                                            className="w-full mb-8 rounded-xl border-transparent py-3 px-6 text-base
                                                                    text-body-color placeholder-body-color shadow-one outline-none
                                                                    focus:border-primary focus-visible:shadow-none dark:bg-[#41476f] dark:shadow-signUp"
                                                        />
                                                    ) :
                                                        item.component === "textarea" ? (
                                                            <textarea
                                                                placeholder={item.placeholder}
                                                                name={item.id} rows={5}
                                                                value={formData[item.id as keyof BlogFormData]}
                                                                className="w-full resize-none rounded-xl border border-transparent py-3 px-6 text-base
                                                                        text-body-color placeholder-body-color shadow-one outline-none
                                                                        focus:border-primary focus-visible:shadow-none dark:bg-[#41476f] dark:shadow-signUp"
                                                                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                                                                    setFormData({
                                                                        ...formData,
                                                                        [item.id]: event.target.value
                                                                    });
                                                                }}
                                                            />
                                                        ) :
                                                            item.component === "select" ? (
                                                                <select
                                                                    name={item.id}
                                                                    value={formData[item.id as keyof BlogFormData]}
                                                                    className="w-full mb-8 rounded-xl border-transparent py-3 px-6 text-base
                                                                            text-body-color placeholder-body-color shadow-one outline-none
                                                                            focus:border-primary focus-visible:shadow-none dark:bg-[#41476f] dark:shadow-signUp"
                                                                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                                                        setFormData({
                                                                            ...formData,
                                                                            [item.id]: event.target.value
                                                                        });
                                                                    }}
                                                                >
                                                                    <option value={""} id="">Select</option>
                                                                    {
                                                                        item.options.map((itemOption) => (
                                                                            <option id-={itemOption.value} value={itemOption.value}>
                                                                                {itemOption.label}
                                                                            </option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            ) : null}
                                            </div>
                                        ))}
                                        <div className="w-full px-5">
                                            <Button text="ブログを投稿" onClick={handleSavePost} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}