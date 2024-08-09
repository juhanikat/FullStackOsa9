import { useState, useEffect } from "react";
import axios from "axios";

interface DiaryProps {
  diaryEntries: DiaryEntry[];
}

interface DiaryEntry {
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

const DiaryEntries = (props: DiaryProps) => {
  const diaryEntries = props.diaryEntries;
  return (
    <>
      {diaryEntries.map((entry) => (
        <div>
          <h2>{entry.date}</h2>
          <p>{entry.weather}</p>
          <p>{entry.visibility}</p>
          <p>{entry.comment}</p>
        </div>
      ))}
    </>
  );
};

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3000/api/diaries")
      .then((response) => {
        setDiaryEntries(response.data);
      });
  }, []);

  const createDiaryEntry = (event: React.FormEvent) => {
    event.preventDefault();
    const newDiaryEntry = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment,
    };
    axios.post<DiaryEntry>("http://localhost:3000/api/diaries", newDiaryEntry);
    setDiaryEntries(diaryEntries.concat(newDiaryEntry));
  };

  return (
    <>
      <h1>Flight Diary Entries</h1>
      <div>
        <form onSubmit={createDiaryEntry}>
          <label>Date</label>
          <br></br>
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <br></br>
          <label>Weather</label>
          <br></br>
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
          <br></br>
          <label>Visibility</label>
          <br></br>
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
          <br></br>
          <label>Comment</label>
          <br></br>
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <br></br>
          <button type="submit">Add Diary Entry</button>
        </form>
      </div>
      <DiaryEntries diaryEntries={diaryEntries} />
    </>
  );
}

export default App;
