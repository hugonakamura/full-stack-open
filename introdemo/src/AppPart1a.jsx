const App = (props) => {
  const { counter } = props;
  console.log(counter);
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const name = "HGN"
  const age = 31

  return (
    <div>
      {courses.map(course =>
        <Course key={course.id} course={course}></Course>
      )}
      {/* <h2> homework </h2>
      <Hello name={name} age={age}></Hello>
      <div>Counter: {counter}</div> */}
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name}></Header>
      <Content parts={props.course.parts}></Content>
      <Total parts={props.course.parts}></Total>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}


// original part1a implementation (before map was introduced)
// const Content = (props) => {
//   return (
//     <div>
//       <Part partName={props.parts[0].name} exercise={props.parts[0].exercises}> </Part>
//       <Part partName={props.parts[1].name} exercise={props.parts[1].exercises}> </Part>
//       <Part partName={props.parts[2].name} exercise={props.parts[2].exercises}> </Part>
//     </div>
//   )
// }

// new part1a implementation - part2a homework - refactoring with map
const Content = (props) => {
  return (
    <div>
      {props.parts.map(part =>
        <Part key={part.id} partName={part.name} exercise={part.exercises}> </Part>
      )}
    </div>
  )
}


// original part1a implementation (before map was introduced)
// const Total = (props) => {
//   return (
//     <div>
//       <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
//     </div>
//   )
// }

// new part1a implementation - part2a homework - refactoring with map
const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.parts.map(part => part.exercises).reduce((a, b) => a + b)}</p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p> {props.partName} {props.exercise} </p>
    </div>
  )
}

const Hello = ({ name, age }) => {
  // deconstructing
  // const { name, age } = props;
  const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - age
  }

  return (
    <div>
      <p>Hello {name}, you are {age} years old </p>
      <p>So you were probably born in {bornYear()} or {bornYear() - 1} </p>
    </div>
  )
}


export default App