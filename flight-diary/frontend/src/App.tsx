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
          <p>Weather: {entry.weather}</p>
          <p>Visibility: {entry.visibility}</p>
          <p>Comment: {entry.comment}</p>
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
  const [errorMsg, setErrorMsg] = useState("");

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
    axios
      .post<DiaryEntry>("http://localhost:3000/api/diaries", newDiaryEntry)
      .then(() => {
        setDiaryEntries(diaryEntries.concat(newDiaryEntry));
      })
      .catch((error) => {
        if (axios.isAxiosError(error) || "response" in error) {
          setErrorMsg(error.response.data);
        }
      });
  };

  let errorMsgDiv = (
    <div>
      <p>{errorMsg}</p>
    </div>
  );
  if (errorMsg.length === 0) {
    errorMsgDiv = <></>;
  }

  return (
    <>
      <h1>Flight Diary Entries</h1>
      {errorMsgDiv}
      <div>
        <form onSubmit={createDiaryEntry}>
          <label>Date</label>
          <br></br>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <br></br>
          <label>Weather</label>
          <br></br>
          <input
            id="sunnyButton"
            type="radio"
            name="weatherSelection"
            onChange={() => setWeather("sunny")}
          />
          <label htmlFor="sunnyButton">Sunny</label>
          <input
            id="rainyButton"
            type="radio"
            name="weatherSelection"
            onChange={() => setWeather("rainy")}
          />
          <label htmlFor="rainyButton">Rainy</label>
          <input
            id="cloudyButton"
            type="radio"
            name="weatherSelection"
            onChange={() => setWeather("cloudy")}
          />
          <label htmlFor="cloudyButton">Cloudy</label>
          <input
            id="stormyButton"
            type="radio"
            name="weatherSelection"
            onChange={() => setWeather("stormy")}
          />
          <label htmlFor="stormyButton">Stormy</label>
          <input
            id="windyButton"
            type="radio"
            name="weatherSelection"
            onChange={() => setWeather("windy")}
          />
          <label htmlFor="windyButton">Windy</label>
          <br></br>
          <label>Visibility</label>
          <br></br>
          <input
            id="greatButton"
            type="radio"
            name="visibilitySelection"
            onChange={() => setVisibility("great")}
          />
          <label htmlFor="greatButton">Great</label>
          <input
            id="goodButton"
            type="radio"
            name="visibilitySelection"
            onChange={() => setVisibility("good")}
          />
          <label htmlFor="goodButton">Good</label>
          <input
            id="okButton"
            type="radio"
            name="visibilitySelection"
            onChange={() => setVisibility("ok")}
          />
          <label htmlFor="okButton">OK</label>
          <input
            id="poorButton"
            type="radio"
            name="visibilitySelection"
            onChange={() => setVisibility("poor")}
          />
          <label htmlFor="poorButton">Poor</label>
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
