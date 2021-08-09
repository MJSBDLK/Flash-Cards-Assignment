import NewDeckButton from "../Layout/Buttons/NewDeckButton";
import DeckList from "../Layout/DeckList";
import DeckCard from "../Layout/DeckCard";
import React from "react";


export default function Home() {
    return (
        <div>
            <NewDeckButton />
            <DeckList />
        </div>
    );
}