type ratingDescriptionType = "Bad :(" | "Okay :)" | "Great! :D";

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: ratingDescriptionType;
  target: number;
  average: number;
}

function calculateExercises(
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
  const descriptions: { [id: number]: ratingDescriptionType } = {
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

try {
  const dailyExerHrs: number[] = process.argv
    .slice(2, process.argv.length - 1)
    .map((value) => Number(value))
    .filter((number) => Number.isNaN(number) === false);
  console.log(dailyExerHrs);
  const dailyTarget: number = Number(process.argv[process.argv.length - 1]);
  if (process.argv.length < 4) {
    throw "Give at least two arguments. All arguments must be numbers.";
  }
  console.log(calculateExercises(dailyExerHrs, dailyTarget));
} catch (error) {
  console.log("Error with arguments: " + error);
}
