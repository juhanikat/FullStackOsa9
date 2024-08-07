type ratingDescriptionTypeWeb = "Bad :(" | "Okay :)" | "Great! :D";

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: ratingDescriptionTypeWeb;
  target: number;
  average: number;
}

function calculateExercisesWeb(
  dailyExerHrs: number[],
  dailyTarget: number
): ExerciseResult {
  const periodLength = dailyExerHrs.length;
  const trainingDays = dailyExerHrs.filter((hours) => hours > 0).length;
  const average =
    dailyExerHrs.reduce((acc, current) => acc + current) / periodLength;
  const success = average >= dailyTarget;
  let rating;
  if (average > dailyTarget * 0.9) {
    rating = 3;
  } else if (average > dailyTarget * 0.6) {
    rating = 2;
  } else {
    rating = 1;
  }
  const descriptions: { [id: number]: ratingDescriptionTypeWeb } = {
    1: "Bad :(",
    2: "Okay :)",
    3: "Great! :D",
  };
  const ratingDescription = descriptions[rating];
  const result = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: dailyTarget,
    average: average,
  };
  return result;
}

export { calculateExercisesWeb };
