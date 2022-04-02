import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TacqueriaList() {
    const [tacquerias, setTacquerias] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/tacquerias')
            .then(res => {
                setTacquerias(res.data);
            })
            .catch(_ => console.log('Error getting tacquerias.'))
    }, []);

    function tacqueriaList() {
        return tacquerias.map((tacqueria) => {
            return (
                <TacqueriaCard
                    key={tacqueria._id}
                    id={tacqueria._id}
                    name={tacqueria.name}
                    totalUpvotes={tacqueria.upvotes}
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

function TacqueriaCard({ id, name, totalUpvotes }) {
    const [upvotes, setUpvotes] = useState(totalUpvotes);

    function onUpvote(e) {
        e.preventDefault();
        setUpvotes((upvotes) => upvotes + 1);
        axios
            .post(`http://localhost:5000/upvote/${id.toString()}`)
            .catch((err) => console.log(err));
    }

    return (
        <p>
            {name} with {upvotes} upvotes
            <button onClick={(e) => onUpvote(e)}>+1</button>
        </p>
    )
};
