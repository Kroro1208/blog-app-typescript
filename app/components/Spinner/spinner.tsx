"use client"

import { ProgressBar } from "react-loader-spinner"

export default function Spinner() {
    return (
        <ProgressBar
            height={"130"}
            width={"300"}
            ariaLabel="Common Loader"
            borderColor="#535660"
            barColor="#4aee21"
            wrapperStyle={{ display: "block", margin: "auto" }}
        />
    );
}