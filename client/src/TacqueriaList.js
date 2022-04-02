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
                    name={tacqueria.name}
                    upvotes={tacqueria.upvotes}
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
        </p>
    )
};
