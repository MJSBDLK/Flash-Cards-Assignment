// Import
import React, { useEffect, useState } from "react";
import {Switch, Route, useParams} from 'react-router-dom';
// Import Layout Components
import Header from "./Header";
import NotFound from "./NotFound";
// Import Screens
import Home from "../Screens/Home";
import Study from "../Screens/Study";
import CreateDeck from "../Screens/CreateDeck";
import Deck from "../Screens/Deck";
import EditDeck from "../Screens/EditDeck";
import AddCard from "../Screens/AddCard";
import EditCard from "../Screens/EditCard"

function Layout() {

  // const [decks, setDecks] = useState([]);
  // useEffect(() => {
  //   async function fetchData() {
  //     const abortController = new AbortController();
  //     try {
  //       const deckList = await listDecks(abortController.signal);
  //       setDecks(deckList);
  //     } catch (error) {
  //       console.log(`Error in index.js - FetchData: `, error);
  //     }
  //     return () => abortController.abort;
  //   }
  //   fetchData();
  // }, []);

  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route path="/decks/:deckId/study"><Study /></Route>
          <Route path="/decks/new"><CreateDeck /></Route>
          <Route exact path="/decks/:deckId"><Deck /></Route>
          <Route path="/decks/:deckId/edit"><EditDeck /></Route>
          <Route path="/decks/:deckId/cards/new"><AddCard /></Route>
          <Route path="/decks/:deckId/cards/:cardId/edit"><EditCard /></Route>
          <Route exact path="/"><Home /></Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
