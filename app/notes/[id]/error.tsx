"use client";

type Prors = {
    error:Error
}
const Error = ({error}:Prors) => {
    return (
        <p>Could not fetch note details. {error.message}</p>

    )
}

export default Error