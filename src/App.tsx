
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

import type { WheelOption, WheelResult } from './types/wheel';

import { AddOption } from './components/AddOption/AddOption';
import { OptionsList } from './components/OptionsList/OptionsList';
import { Wheel } from './components/Wheel/Wheel';
import { ResultModal } from './components/ResultModal/ResultModal';
import { History } from './components/History/History';

import styles from './App.module.css';
import {MaxBridgeInfo} from "./components/MaxBridgeInfo/MaxBridgeInfo.tsx";

const initialOptions: WheelOption[] = [
  { id: '1', label: 'Пицца' },
  { id: '2', label: 'Суши' },
  { id: '3', label: 'Бургер' },
  { id: '4', label: 'Паста' },
  { id: '5', label: 'Шашлык' },
  { id: '6', label: 'Салат' },
];

const FULL_ROTATIONS = 5;
const HISTORY_LIMIT = 10;

function normalizeAngle(angle: number) {
  return ((angle % 360) + 360) % 360;
}

function App() {
  const [options, setOptions] = useState(initialOptions);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [winner, setWinner] = useState<WheelOption | null>(null);

  const [history, setHistory] = useState<WheelResult[]>(() => {
    try {
      const saved = localStorage.getItem('decision-wheel-history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
        'decision-wheel-history',
        JSON.stringify(history)
    );
  }, [history]);

  useEffect(() => {
    if (!winner) return;

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.65 },
    });
  }, [winner]);

  const handleAdd = (label: string) => {
    const newOption: WheelOption = {
      id: crypto.randomUUID(),
      label,
    };

    setOptions((current) => [...current, newOption]);
    setWinner(null);
  };

  const handleRemove = (id: string) => {
    setOptions((current) =>
        current.filter((option) => option.id !== id)
    );

    setWinner(null);
  };

  const handleSpin = () => {
    if (options.length === 0 || isSpinning) return;

    const randomIndex = Math.floor(
        Math.random() * options.length
    );

    const sliceAngle = 360 / options.length;

    const middleAngle =
        -90 + (randomIndex + 0.5) * sliceAngle;

    const currentRotation = normalizeAngle(rotation);

    const additionalRotation = normalizeAngle(
        -90 - (middleAngle + currentRotation)
    );

    const targetRotation =
        rotation +
        FULL_ROTATIONS * 360 +
        additionalRotation;

    setSelectedIndex(randomIndex);
    setWinner(null);
    setIsSpinning(true);
    setRotation(targetRotation);
  };

  const handleSpinEnd = () => {
    if (selectedIndex === null) return;

    const selectedOption = options[selectedIndex];

    if (!selectedOption) return;

    setWinner(selectedOption);

    setHistory((current) => [
      {
        id: crypto.randomUUID(),
        option: selectedOption,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ].slice(0, HISTORY_LIMIT));

    setSelectedIndex(null);
    setIsSpinning(false);
  };

  const handleRemoveWinner = () => {
    if (!winner) return;

    handleRemove(winner.id);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
      <main className={styles.app}>
        <header className={styles.header}>
          <div className={styles.logo}>🎯</div>
          <h1>Колесо решений</h1>
          <p>Не можешь определиться? Доверься случаю!</p>
        </header>

        <section className={styles.content}>
          <Wheel
              options={options}
              rotation={rotation}
              onSpinEnd={handleSpinEnd}
          />

          <button
              className={styles.spinButton}
              type="button"
              disabled={options.length === 0 || isSpinning}
              onClick={handleSpin}
          >
            {isSpinning ? 'Крутим...' : '🎡 Крутить колесо'}
          </button>

          <AddOption
              onAdd={handleAdd}
              disabled={isSpinning}
          />

          <OptionsList
              options={options}
              onRemove={handleRemove}
              disabled={isSpinning}
          />

          <History
              results={history}
              onClear={handleClearHistory}
          />
          <MaxBridgeInfo />
        </section>

        {winner && (
            <ResultModal
                winner={winner.label}
                onClose={() => setWinner(null)}
                onRemoveWinner={handleRemoveWinner}
                onSpinAgain={handleSpin}
            />
        )}

      </main>
  );
}

export default App;
