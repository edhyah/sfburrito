import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TacqueriaList() {
    const [tacquerias, setTacquerias] = useState([]);
    const [chosenTacqueriaId, setChosenTacqueriaId] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:5000/tacquerias')
            .then(res => {
                setTacquerias(res.data);
            })
            .catch(_ => console.log('Error getting tacquerias.'))
    }, []);

    function onUpvote(e, id) {
        e.preventDefault();
        if (chosenTacqueriaId !== '') {
            axios
                .post(`http://localhost:5000/downvote/${chosenTacqueriaId.toString()}`)
                .catch((err) => console.log(err));
        }
        axios
            .post(`http://localhost:5000/upvote/${id.toString()}`)
            .catch((err) => console.log(err));
        setChosenTacqueriaId(id);
    }

    function tacqueriaList() {
        return tacquerias.map((tacqueria) => {
            return (
                <TacqueriaCard
                    key={tacqueria._id}
                    id={tacqueria._id}
                    name={tacqueria.name}
                    totalUpvotes={tacqueria.upvotes}
                    chosen={chosenTacqueriaId === tacqueria._id}
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

function TacqueriaCard({ id, name, totalUpvotes, chosen, onUpvote }) {
    const [upvotes, setUpvotes] = useState(totalUpvotes);

    function getNumberOfUpvotes() {
        if (chosen && upvotes === totalUpvotes) {
            setUpvotes(totalUpvotes + 1);
        } else if (!chosen && upvotes !== totalUpvotes){
            setUpvotes(totalUpvotes);
        }
        return upvotes;
    }

    return (
        <p>
            {name} with {getNumberOfUpvotes()} upvotes
            <button onClick={(e) => onUpvote(e, id)}>+1</button>
        </p>
    )
};
