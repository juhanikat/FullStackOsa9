function calculateBmi(height: number, weight: number): string {
  const bmi = weight / ((height / 100) ^ 2);
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25 && bmi <= 29.9) {
    return "Overweight";
  } else {
    return "Obese";
  }
}
try {
  const height: number = Number(process.argv[2]);
  const weight: number = Number(process.argv[3]);
  if (
    Number.isNaN(height) ||
    typeof height !== "number" ||
    Number.isNaN(weight) ||
    typeof weight !== "number"
  ) {
    throw "Height or weight is not a valid number";
  }
  console.log(calculateBmi(height, weight));
} catch (error) {
  console.log("Error with arguments: " + error);
}
