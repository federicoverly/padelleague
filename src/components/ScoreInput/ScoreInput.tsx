import React from "react";
import styles from "./ScoreInput.module.css";

interface ScoreInputProps {
  score: number;
  setScore: (score: number) => void;
}

export const ScoreInput = ({ score, setScore }: ScoreInputProps) => {
  return (
    <input
      type="number"
      value={score}
      onChange={(event) => setScore(Number(event.target.value))}
      className={styles.input}
    />
  );
};
