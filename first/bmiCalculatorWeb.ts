function calculateBmiWeb(height: number, weight: number): object {
  if (
    Number.isNaN(height) ||
    typeof height !== "number" ||
    Number.isNaN(weight) ||
    typeof weight !== "number"
  ) {
    return { error: "Height or weight is not a valid number" };
  }
  const bmi = weight / ((height / 100) ^ 2);
  let bmiDescription: string;
  if (bmi < 18.5) {
    bmiDescription = "Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    bmiDescription = "Normal (healthy weight)";
  } else if (bmi >= 25 && bmi <= 29.9) {
    bmiDescription = "Overweight";
  } else {
    bmiDescription = "Obese";
  }
  return {
    weight: weight,
    height: height,
    bmi: bmiDescription,
  };
}

export { calculateBmiWeb };
