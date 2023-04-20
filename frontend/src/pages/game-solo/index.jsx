import { useEffect, useState } from "react";

const GameSolo = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [points, setPoints] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(10);

  const room = JSON.parse(sessionStorage.getItem("dataRoom")) || {};
  const { dataRoom } = room;

  // Función para seleccionar una respuesta
  function handleSelectAnswer(answer) {
    setSelectedAnswer(answer);
  }

  // Función para comprobar la respuesta seleccionada por el usuario
  function checkAnswer() {
    if (selectedAnswer === dataRoom.questions[currentQuestionIndex].correctAnswer) {
      setPoints(points + 20);
      room.dataRoom.player.correctAnswers.push(dataRoom.questions[currentQuestionIndex].topicId);
      room.dataRoom.player.points = points;
    }
    setSelectedAnswer("");
    setTimeRemaining(10);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  // Función para reiniciar la trivia
  function resetTrivia() {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setPoints(0);
    setTimeRemaining(10);
  }

  // Muestra la pregunta actual y las opciones de respuesta
  const currentQuestion = dataRoom?.questions[currentQuestionIndex];
  let answers = [];
  if (currentQuestion) {
    answers = [currentQuestion?.correctAnswer, ...currentQuestion?.incorrectAnswers];
  }
  const hasTimeRemaining = timeRemaining > 0 && currentQuestionIndex < dataRoom?.questions.length;
  sessionStorage.setItem("dataRoom", JSON.stringify(room));

  // Utiliza useEffect para actualizar el temporizador
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    // Cuando el tiempo se agote o se cambie de pregunta, reinicia el temporizador
    if (timeRemaining === 0 || currentQuestionIndex >= dataRoom?.questions.length) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [currentQuestionIndex, timeRemaining]);

  return (
    <div>
      {hasTimeRemaining ? (
        <div>
          <h2>{currentQuestion.question}</h2>
          <ul>
            {answers.map((answer, index) => (
              <li key={index}>
                <button onClick={() => handleSelectAnswer(answer)} disabled={selectedAnswer !== ""}>
                  {answer}
                </button>
              </li>
            ))}
          </ul>
          <p>{`Tiempo restante: ${timeRemaining}s`}</p>
          <button onClick={checkAnswer} disabled={selectedAnswer === ""}>
            Responder
          </button>
        </div>
      ) : (
        <div>
          <h2>Trivia completada</h2>
          <p>{`Puntaje: ${points} de ${dataRoom?.questions.length}`}</p>
          <button onClick={resetTrivia}>Reiniciar</button>
        </div>
      )}
    </div>
  );
};

export default GameSolo;
