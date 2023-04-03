import { useState, CSSProperties } from "react";

import RingLoader from "react-spinners/RingLoader"
const Spinner = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <RingLoader color="#36d7b7" />
        </div>

    )
}

export default Spinner





