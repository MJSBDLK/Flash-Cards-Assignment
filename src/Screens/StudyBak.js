// Parent component is index.js
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, listCards } from "../utils/api";
import AddCardsButton from "../Layout/Buttons/AddCardsButton";
import React from "react";


export default function Study() {
  // The path to this screen should include the deckId (i.e., /decks/:deckId/study).
  // You must use the readDeck() function from src/utils/api/index.js to load the
  //    deck that is being studied.
  // There is a breadcrumb navigation bar with links to home /, followed by the name
  //    of the deck being studied and finally the text Study (e.g., Home/Rendering
  //    In React/Study).
  // The deck title (i.e., "Study: Rendering in React" ) is shown on the screen.
  // Cards are shown one at a time, front-side first.
  // A button at the bottom of each card "flips" it to the other side.
  // After flipping the card, the screen shows a next button (see the "Next button"
  //    section below) to continue to the next card.
  // After the final card in the deck has been shown, a message (see the "Restart
  //    prompt" section below) is shown offering the user the opportunity to restart
  //    the deck.
  //  - If the user does not restart the deck, they should return to the home screen.
  // Studying a deck with two or fewer cards should display a "Not enough cards"
  //    message (see the "Not enough cards" section below) and a button to add cards
  //    to the deck.

  const {deckId} = useParams(); console.log(`Study.js: deckId: ${deckId}`)

  // Variables
  const [deck, setDeck] = useState({});
  const [cardId, setCardId] = useState(1);
  const [numCards, setNumCards] = useState(null);
  const [cardContent, setCardContent] = useState(`Nobody here but us chickens`);

  // State Variables
  const [backOfCard, setBackOfCard] = useState(false);
  const [nextVis, setNextVis] = useState(false);

  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        console.log(
          `Study.js - fetchData - working prior to variable assignment`
        );
        const deck = await readDeck(deckId, abortController.signal);
        console.log(`Study.js - fetchData - deck: `, deck);
        const cards = await listCards(deckId, abortController.signal);
        const card = await readCard(cardId, abortController.signal);

        setDeck(deck);
        setCardId(card.id);
        setNumCards(cards.length);

        backOfCard ? setCardContent(card.back) : setCardContent(card.front);

      } catch (error) {
        console.log(`Error in Study.js - FetchData: `, error);
      }
      return () => abortController.abort;
    }
    fetchData();
  }, [backOfCard, cardId]);

  const handleFlipClick = () => {
    setBackOfCard(!backOfCard);
    setNextVis(true);
  };

  const handleNextClick = () => {
    if (cardId < numCards) {
      setBackOfCard(false);
      setNextVis(false);
      setCardId(cardId + 1);
    } else {
      const result = window.confirm(`Restart this deck?\n\nClick'cancel' to return to the home page.`);
      if(result) {
        setCardId(1)
        setNextVis(false)
        setBackOfCard(false)
      } else {
        history.push('/')
      }
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{`${deck.name}`}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>Study: {`${deck.name}`}</h2>
      {numCards > 2 ? (<div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {`${cardId}`} of {`${numCards}`}
          </h5>
          <p className="card-text">{cardContent}</p>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => handleFlipClick()}
          >
            Flip
          </button>
          {nextVis && (
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => handleNextClick()}
            >
              Next
            </button>
          )}
        </div>
      </div>) : (
        <div>
          <h3>Not enough cards.</h3>
          <p>You need at least 3 cards to study. There are {`${numCards}`} in this deck.</p>
          <AddCardsButton deckId={deckId} />
        </div>
      )}
    </div>
  );
}
