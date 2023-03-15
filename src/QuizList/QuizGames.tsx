import React, {useState} from "react";
import { BsFillTrashFill, BsFillPencilFill  } from "react-icons/bs";
import "./style.css"

interface QuizGames {
    id: string;
    title: string;
    description: string
}

function QuizGames(){
    const [games, setGames] = useState<QuizGames[]>([]);
    const [id, setId] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [editIndex, setEditIndex] = useState<number | null>(null);

    // create Quiz
    const createQuiz = (id: string, title: string, description: string ): void => {
        const newGame: QuizGames = {
            id: id,
            title: title,
            description: description
        };
        setGames([...games, newGame]);
    
    };

    //delete quiz
    const deleteQuiz = (index: number): void => {
        const newGames = [...games];
        newGames.splice(index, 1);
        setGames(newGames);

    }

    //edit quiz
    const editQuiz = (index: number, id: string, title: string, description: string ): void => {
        const newGames = [...games];
        newGames[index] = {
            id: id,
            title: title,
            description: description

        }; 
        setGames(newGames);
        setEditIndex(null);
    }

    
   const submitForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault(); 
    if (editIndex !== null ){
        editQuiz(editIndex, id, title, description)
    } else {
        createQuiz(id, title, description)
    }
    setTitle('');
    setDescription('');
    setId('');
    setEditIndex(null)
   }
    

   return ( 
    <div>
        <h2> create Quizgame</h2>
        <form onSubmit={submitForm}>
            <label > <strong>Id:  </strong> 
                <input required className="input" type="text" value={id} onChange={(event) => setId(event.target.value)}></input>
            </label>
            <label> <strong>Title:  </strong> 
                <input className="input" type="text" value={title} onChange={(event) => setTitle(event.target.value)}></input>
            </label>
            <label> <strong>Description:  </strong>
                <input className="input" type="text" value={description} onChange={(event) => setDescription(event.target.value)}></input>
            </label>

            <button className="buttonCreate" type="submit">{editIndex !== null ? 'Save' : 'Create'}</button>
        {editIndex !== null && <button className="buttonCreate" type="button" onClick={() => setEditIndex(null)}>Cancel</button>}
         

            <div className="div">
            <h3> Game List</h3>
            <table className="tabel" >
            <tr>
                <th>Id</th>
                 <th>Name</th>
                <th>description</th>
                <th>buttons</th>
            </tr>
            {games.map((game: QuizGames, index: number) =>
            <tr key={index}>
                <td><strong>{game.id}</strong></td>
                <td>{game.title}</td>
                <td>{game.description}</td>
                <td><button className="button" onClick={() => setEditIndex(index)}><BsFillPencilFill/></button>
                <button className="button" onClick={() => deleteQuiz(index)} ><BsFillTrashFill/></button>
                 </td>
            </tr>)}
            </table>
            </div>
        </form>
    </div>

   )
   

    
    
}

export default QuizGames;