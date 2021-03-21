import React from 'react';
import { useParams } from "react-router-dom";
import videos from "../../videos";
export default function OpenVideo() {
    const { id } = useParams();
    return (
        <div>
            <h3>You are looking at: {id}</h3>
        </div>
    );
}
