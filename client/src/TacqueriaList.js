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

    function onUpvote(e, id) {
        e.preventDefault();
        axios
            .post(`http://localhost:5000/upvote/${id.toString()}`)
            .then((response) => {
                const index = tacquerias.findIndex((tacqueria) => tacqueria._id == response.data._id);
                console.log('------');
                console.log(tacquerias[index].upvotes);
                tacquerias[index].upvotes += 1;
                console.log(tacquerias[index].upvotes);
            })
    }

    function tacqueriaList() {
        return tacquerias.map((tacqueria) => {
            return (
                <TacqueriaCard
                    key={tacqueria._id}
                    id={tacqueria._id}
                    name={tacqueria.name}
                    upvotes={tacqueria.upvotes}
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

function TacqueriaCard(props) {
    return (
        <p>
            {props.name} with {props.upvotes} upvotes
            <button onClick={(e) => props.onUpvote(e, props.id)}>+1</button>
        </p>
    )
};
