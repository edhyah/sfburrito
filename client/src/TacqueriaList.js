import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TacqueriaList() {
    const [tacquerias, setTacquerias] = useState([]);
    const [chosenTacqueriaId, setChosenTacqueriaId] = useState(null);
    const [previouslyChosenTacqueraId, setPreviouslyChosenTacqueriaId] = useState(null);

    useEffect(() => {
        setPreviouslyChosenTacqueriaId(localStorage.getItem('chosenTacqueriaId'));
        setChosenTacqueriaId(localStorage.getItem('chosenTacqueriaId'));
        axios
            .get('http://localhost:5000/tacquerias')
            .then(res => {
                setTacquerias(res.data);
            })
            .catch(_ => console.log('Error getting tacquerias.'))
    }, []);

    function onUpvote(e, id) {
        e.preventDefault();
        if (id === chosenTacqueriaId) {
            return;
        }
        if (chosenTacqueriaId !== null) {
            axios
                .post(`http://localhost:5000/downvote/${chosenTacqueriaId.toString()}`)
                .catch((err) => console.log(err));
        }
        axios
            .post(`http://localhost:5000/upvote/${id.toString()}`)
            .catch((err) => console.log(err));
        setChosenTacqueriaId(id);
        localStorage.setItem('chosenTacqueriaId', id);
    }

    function tacqueriaList() {
        return tacquerias.map((tacqueria) => {
            return (
                <TacqueriaCard
                    key={tacqueria._id}
                    id={tacqueria._id}
                    name={tacqueria.name}
                    origNumUpvotes={tacqueria.upvotes}
                    chosen={chosenTacqueriaId === tacqueria._id}
                    previouslyChosen={previouslyChosenTacqueraId === tacqueria._id}
                    onUpvote={onUpvote}
                />
            );
        });
    };

    return (
        <div className="">
            {tacqueriaList()}
        </div>
    );
};

function TacqueriaCard({ id, name, origNumUpvotes, chosen, previouslyChosen, onUpvote }) {
    const [upvotes, setUpvotes] = useState(origNumUpvotes);

    function getNumberOfUpvotes() {
        if (!previouslyChosen) {
            if (chosen && upvotes === origNumUpvotes) {
                setUpvotes(origNumUpvotes + 1);
            } else if (!chosen && upvotes !== origNumUpvotes){
                setUpvotes(origNumUpvotes);
            }
        } else {
            if (chosen && upvotes !== origNumUpvotes) {
                setUpvotes(origNumUpvotes);
            } else if (!chosen && upvotes === origNumUpvotes){
                setUpvotes(origNumUpvotes - 1);
            }
        }
        return upvotes;
    }

    return (
        <p>
            {name} with {getNumberOfUpvotes()} upvotes
            <button onClick={(e) => onUpvote(e, id)}>+1</button>
            {chosen &&
                'Chosen!'
            }
        </p>
    )
};
