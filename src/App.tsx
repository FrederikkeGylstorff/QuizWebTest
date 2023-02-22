import React, { useState } from 'react';
import { QuizGameContext } from './NoNeedToTouch/QuizGameContext';
import './App.css';
import { QuizGame } from './model/QuizGame';
import exampleImage from './images/question_example.png';


const randomName = (prefix: string) => `${prefix} ${Math.round(Math.random() * 1000000)}`;

const randomGame = () => ({
    name: randomName("Game"),
    description: "This is a quiz game about star-wars!"
})

const randomQuiz = () => ({
    question: { text: { content: randomName("Question"), fontSize: 14, textColor: "#000" } },
    answers: [
        { text: { content: "Yes", fontSize: 14, textColor: "#FFF" }, correct: true },
        { text: { content: "No", fontSize: 14, textColor: "#FFF" }, correct: false }
    ]
})

const App = () => {
    const [getAll, loadingGetAll, errorGetAll] = QuizGameContext.useAllGames();
    const [get, loadingGet, errorGet] = QuizGameContext.useGame();
    const [remove, loadingremove, errorRemove] = QuizGameContext.useDeleteGame();
    const [create, loadingCreate, errorCreate] = QuizGameContext.useCreateGame();
    const [update, loadingUpdate, errorUpdate] = QuizGameContext.useUpdateGame();
    const [createQuiz, loadingCreateQuiz, errorCreateQuiz] = QuizGameContext.useCreateQuiz();
    const [removeQuiz, loadingRemoveQuiz, errorRemoveQuiz] = QuizGameContext.useRemoveQuiz();

    const loading = loadingGetAll || loadingGet || loadingremove || loadingCreate || loadingUpdate || loadingCreateQuiz || loadingRemoveQuiz;
    const error = errorGetAll || errorGet || errorRemove || errorCreate || errorUpdate || errorCreateQuiz || errorRemoveQuiz;

    const [games, setGames] = useState<QuizGame[]>([]);

    return (
        <div className="App">
            <div style={{backgroundColor: 'pink'}}>
                <p>This is an example of how to perform CRUD operations - feel free to make it prettier</p>

                <button onClick={() => create(randomGame()).then(x => setGames(g => [...g, x]))}>
                    Create game
                </button>
                <button onClick={() => get("8beabb14-417b-404a-acb9-699867233378").then(x => setGames(g => [...g, x]))}>
                    Fetch game
                </button>
                <button onClick={() => getAll().then(setGames)}>Fetch All games</button>

                <div>
                    <h1>Games</h1>

                    {games.map(x =>
                        <div key={x.id}>
                            Name: "{x.name}", no of q: {x.quizzes?.length ?? 0}
                            <button onClick={() => remove(x.id).then(() => setGames(g => g.filter(y => y.id !== x.id)))}>Delete game</button>
                            <button onClick={() => update(x.id, { ...x, name: randomName("Game") }).then((updatedGame) => setGames(g => g.map(y => y.id !== updatedGame.id ? y : updatedGame)))}>update game name</button>
                            <button onClick={() => createQuiz(x.id, randomQuiz()).then((updatedGame) => setGames(g => g.map(y => y.id !== updatedGame.id ? y : updatedGame)))}>add quiz</button>
                            {x.quizzes.length > 0 &&
                                <button
                                    onClick={() => removeQuiz(x.id, x.quizzes[0].id).then((updatedGame) => setGames(g => g.map(y => y.id !== updatedGame.id ? y : updatedGame)))}
                                >
                                    remove quiz
                                </button>
                            }
                        </div>
                    )}
                    {games.length === 0 && "No games.."}
                    <h2>
                        {loading && "Loading..."}
                        {error && `${error.status} ${error.message}`}
                    </h2>
                </div>
            </div>
            <h1>Your goal is:</h1>
            <p>To make an editor for a simple quizgame, the user should be able to:</p>
            <ul>
                <li>See a list of their games</li>
                <li>Create new quizzes</li>
                <li>Edit quizzes</li>
                <li>Remove quizzes</li>
                <li>Preview how their questions will look in the game when it is played later.</li>
            </ul>

            <h1>We would like to see:</h1>       
            <ul>
                <li>Well-written code</li>
                <li>Good commit messages</li>
                <li>Pretty colors</li>
                <li>Awesome stuff?</li>
                
            </ul>

            <h1>If something is too difficult, dont panic! We can always talk about a solution at the interview</h1>

            <p>Here is an example of how question could look, background provided in (images/question_background.png):</p>
            <img src={exampleImage} alt='example-img' />
        </div>
    );
}

export default App;
