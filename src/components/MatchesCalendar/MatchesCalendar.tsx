import React, { useState } from "react";
import Calendar from "react-calendar";
import { PageLayout } from "../PageLayout/PageLayout";
import styles from "./MatchesCalendar.module.css";
import { useAllBookedMatches } from "../../queries/bookedMatches";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const MatchesCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  const bookedMatches = useAllBookedMatches();

  return (
    <PageLayout>
      <Calendar
        onChange={onChange}
        className={styles.calendar}
        value={value}
        view="month"
        tileClassName={({ date, view }) => {
          if (!bookedMatches.data) return styles.tiles;

          if (view === "month") {
            const time = date.getTime();

            console.log(time);
            const times = bookedMatches.data.map((match) => match.date);

            console.log(times.includes(time));

            const bookedMatch = bookedMatches.data.find(
              (match) => match.date === time
            );

            if (bookedMatch) {
              console.log("Booked match found", bookedMatch);
              return styles.bookedMatch;
            }

            return styles.tiles;
          }
        }}
      />
    </PageLayout>
  );
};

MatchesCalendar.displayName = "MatchesCalendar";
