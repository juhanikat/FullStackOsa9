interface HeaderProps {
  title: string;
}

interface coursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: coursePart[];
}

interface TotalProps {
  totalExercises: number;
}

const Header = (props: HeaderProps) => {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  );
};

const Content = (props: ContentProps) => {
  const courseParts = props.courseParts;
  return (
    <div>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
    </div>
  );
};

const Total = (props: TotalProps) => {
  return (
    <>
      <p>Number of exercises {props.totalExercises}</p>
    </>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header title={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
