import { Link } from "react-router-dom";
import React from "react";


export default function HomeButton() {
    return (
        <Link class='btn btn-secondary' to='/'>Home</Link>
    );
}