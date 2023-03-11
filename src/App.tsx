import { FormEvent, useState } from 'react';
import { Plus } from '@phosphor-icons/react';

import './App.css';

import siriLogo from './assets/siri-logo.svg';
import whiteShirt from './assets/whiteshirt.png';
import purpleShirt from './assets/purpleshirt.png';
import joker from './assets/joker.png';

import Checkbox from './components/Checkbox';

const fixPlayers = [
  'Zinho',
  'Florianus',
  'Henrikane',
  'Luca',
  'Bersi',
  'Lucca',
  'Victor',
  'Menezes',
  'Pedrinho',
  'Nathan',
  'Japa Uchida',
  'Be',
  'Neves',
  'Paulo',
  'Rodrigo',
  'Lipe',
  'Dani'
];

function App() {
  const [players, setPlayers] = useState(fixPlayers);
  const [choosenPlayers, setChoosenPlayers] = useState<string[]>([]);
  const [guest, setGuest] = useState('');
  const [playersQuantity, setPlayersQuantity] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [separetedTeams, setSeparatedTeams] = useState<string[][]>([]);

  function handleGuest(event: FormEvent) {
    event.preventDefault();

    setPlayers(prev => [...prev, guest]);

    setGuest('');
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (choosenPlayers.length < Number(playersQuantity)) {
      alert(
        'Número de jogadores selecionados tem que ser igual ou maior ao numero de jogadores por time'
      );
      setSubmitted(false);
    } else {
      sortTeams();

      setSubmitted(true);
    }
  }

  function handleTogglePlayer(player: string) {
    if (choosenPlayers.includes(player)) {
      const choosenPlayersWithRemovedOne = choosenPlayers.filter(
        person => person !== player
      );

      setChoosenPlayers(choosenPlayersWithRemovedOne);
    } else {
      const choosenPlayersWithAddedOne = [...choosenPlayers, player];

      setChoosenPlayers(choosenPlayersWithAddedOne);
    }
  }

  function sortTeams() {
    shuffleArray(choosenPlayers);

    let teamsArray = [];
    for (let i = 0; i < choosenPlayers.length; i += Number(playersQuantity)) {
      teamsArray.push(choosenPlayers.slice(i, i + Number(playersQuantity)));
    }

    setSeparatedTeams(teamsArray);
  }

  function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];

      array[i] = array[j];
      array[j] = temp;
    }
  }

  return (
    <>
      <img className="logo" src={siriLogo} alt="Siri Sorteio Logo" />

      {!submitted ? (
        <div>
          <h1>Siri Sorteio</h1>
          <section className="form-section">
            <div className="invited-container">
              <form onSubmit={handleGuest}>
                <label htmlFor="guest">Adicionar Convidado</label>
                <div>
                  <input
                    type="text"
                    id="guest"
                    placeholder="Nome"
                    required
                    autoComplete="off"
                    value={guest}
                    onChange={event => setGuest(event.target.value)}
                  />
                  <button className="add-guest" type="submit">
                    <Plus size={12} className="plus" />
                  </button>
                </div>
              </form>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="names-container">
                {players.map(player => (
                  <Checkbox
                    checked={choosenPlayers.includes(player)}
                    readOnly
                    onClick={() => handleTogglePlayer(player)}
                    key={player}
                    value={player}
                    personname={player}
                  />
                ))}
              </div>

              <div
                className="number-input-container"
                style={{ marginBottom: '20px', marginTop: '20px' }}
              >
                <label htmlFor="playersQuantity">Jogadores por time</label>
                <input
                  className="number-input"
                  type="number"
                  name="playersQuantity"
                  id="playersQuantity"
                  max={10}
                  min={5}
                  value={playersQuantity}
                  onChange={event => setPlayersQuantity(event.target.value)}
                  required
                />
              </div>

              <button className="form-submit" type="submit">
                Sortear
              </button>
            </form>
          </section>
        </div>
      ) : (
        <>
          <div className="teams-container">
            <div className="column1">
              <img src={whiteShirt} alt="siri ricao camisa branca" />
              {separetedTeams[0].map(player => (
                <h3>{player}</h3>
              ))}
            </div>

            <div className="column2">
              {separetedTeams[1] ? (
                <img src={purpleShirt} alt="siri ricao camisa roxa" />
              ) : null}

              {separetedTeams[1]
                ? separetedTeams[1].map(player => <h3>{player}</h3>)
                : null}
            </div>
          </div>

          <div className="joker-container">
            {separetedTeams[2] ? (
              <img src={joker} alt="Imagem do coringa" />
            ) : null}

            {separetedTeams[2]
              ? separetedTeams[2].map(player => <h3>{player}</h3>)
              : null}
          </div>

          <a className="form-submit" href="/">
            Sortear novamente
          </a>
        </>
      )}
    </>
  );
}

export default App;
