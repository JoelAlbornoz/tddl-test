import "./App.css";
import Chart from "./components/Chart";
import Modal from "./components/NewUserModal";
import LeftCardComponent from "./components/LeftCardContent";
import { Button, Card, CardContent } from "@mui/material";
import React, { useState, useEffect } from "react";
import RightCardComponent from "./components/rightCardComponent";
import NoMoreFundsModalComponent from "./components/NoMoreFundsModal";

function App() {
  //Declaramos el state
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const [showNoMoreFundsModal, setShowNoMoreFundsModal] = useState(false);
  const [userData, setUserData] = useState(
    localUserData
      ? localUserData
      : {
          betting: false,
          balance: 0,
          bet: 0,
          bestBet: 0,
          historial: [],
          name: "",
          showUserModal: true,
        }
  );
  const [appState, setAppState] = useState({
    gameRunning: false,
    countdown: 5,
    currentMessage: "Place your bets",
    crashChance: 5,
  });
  const [data, setData] = useState([0, 5]);
  const [categories, setCategories] = useState([0, 1.0]);

  //Fin de la declaración del state
  //Funcion para guardar los datos del usuario en el local storage

  const saveUserData = () => {
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  //Bucle principal de la aplicación
  const handleClock = () => {
    const roll = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    console.log("roll: " + roll + "crash chance: " + appState.crashChance);
    if (roll <= appState.crashChance) {
      setAppState({
        ...appState,
        crashChance: 5,
        gameRunning: false,
        currentMessage: "Crashed, place your bets",
      });
      setCategories([0, 1.0]);
      setData([0, 5]);
      setUserData({
        ...userData,
        historial: [
          ...userData.historial,
          {
            multiplicator: categories[categories.length - 1],
            won: !userData.betting,
            bestBet:
              !userData.betting &&
              userData.bet * categories[categories.length - 1] >
                userData.bestBet
                ? userData.bet * categories[categories.length - 1]
                : userData.bestBet,
            earnings: !userData.betting
              ? userData.bet * categories[categories.length - 1]
              : -userData.bet,
          },
        ].slice(-5),
        bet: 0,
        betting: false,
      });
    } else {
      setData([...data, Math.round(data[data.length - 1] * 1.42 * 100) / 100]);
      setCategories([
        ...categories,
        Math.round(categories[categories.length - 1] * 1.2 * 100) / 100,
      ]);
      setAppState({
        ...appState,
        crashChance: data[data.length - 1] * 1.42,
      });
    }
    saveUserData();
  };
  //Fin del bucle principal

  //Función que se ejecuta al iniciar la aplicación
  useEffect(() => {
    const interval = setInterval(() => {
      if (appState.gameRunning) {
        handleClock();
      }
    }, 5000);
    const offGameInterval = setInterval(() => {
      if (!appState.gameRunning && userData.name !== "") {
        setAppState({ ...appState, countdown: appState.countdown - 1 });
        if (appState.countdown === 0) {
          setAppState({
            ...appState,
            countdown: 5,
            gameRunning: true,
            currentMessage: "Game Running!",
          });
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
      clearInterval(offGameInterval);
    };
  });
  //Fin de la función que se ejecuta al iniciar la aplicación

  const placeBet = (bet) => {
    if (userData.balance > 0) {
      setUserData({
        ...userData,
        bet: bet + userData.bet,
        balance: userData.balance - bet,
        betting: true,
      });
    } else {
      setShowNoMoreFundsModal(true);
    }
  };

  const retireBet = () => {
    if (userData.betting) {
      setUserData({
        ...userData,
        betting: false,
        balance:
          userData.balance + userData.bet * categories[categories.length - 1],
      });
    }
  };

  return (
    <div className="App">
      <div className="header">
        <b>Casino Crash Game</b>
      </div>
      <div className="card__container">
        <LeftCardComponent
          gameRunning={appState.gameRunning}
          countdown={appState.countdown}
          currentMessage={appState.currentMessage}
          className="card__container__card"
          userData={userData}
        />
        <Card className="card__container__card__middle">
          <CardContent>
            <Chart categories={categories} data={data} />
          </CardContent>
        </Card>
        <RightCardComponent></RightCardComponent>
        <Modal handleUserData={setUserData} show={userData.showUserModal} />
        <NoMoreFundsModalComponent
          show={showNoMoreFundsModal}
          handleUserData={setUserData}
          userData={userData}
          onClose={() => setShowNoMoreFundsModal(false)}
        />
      </div>
      {appState.gameRunning ? (
        <Button
          style={{
            width: "30%",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#3d4047",
          }}
          onClick={() => {
            retireBet();
          }}
        >
          Retire
        </Button>
      ) : (
        <Button
          style={{
            width: "30%",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#3d4047",
          }}
          onClick={() => {
            placeBet(100);
          }}
        >
          Place Bet 100
        </Button>
      )}
      <div>
        <footer>
          Elias Joel Albornoz © 2021
          <a href="https://www.linkedin.com/in/joel-albornoz/">Linkedin</a>
        </footer>
      </div>
    </div>
  );
}

export default App;
