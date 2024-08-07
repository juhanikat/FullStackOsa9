interface PartProps {
  part: CoursePart;
}

interface HeaderProps {
  title: string;
}

interface ContentProps {
  courseParts: CoursePart[];
}

interface TotalProps {
  totalExercises: number;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartRequirements extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartRequirements;

const Part = (props: PartProps) => {
  const part = props.part;
  let returned;
  switch (part.kind) {
    case "basic":
      returned = (
        <>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>{part.description}</p>
        </>
      );
      break;
    case "group":
      returned = (
        <>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>Group project exercises {part.groupProjectCount}</p>
        </>
      );
      break;
    case "background":
      returned = (
        <>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>{part.description}</p>
          <p>Background material: {part.backgroundMaterial}</p>
        </>
      );
      break;
    case "special":
      returned = (
        <>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>{part.description}</p>
          <p>Required Skills: </p>
          {part.requirements.map((part) => (
            <p>{part}</p>
          ))}
        </>
      );
      break;
    default:
      break;
  }
  return returned;
};

const Header = (props: HeaderProps) => {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  );
};

const Content = (props: ContentProps) => {
  const courseParts: CoursePart[] = props.courseParts;
  return (
    <div>
      {courseParts.map((part) => (
        <Part part={part} />
      ))}
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
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
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
