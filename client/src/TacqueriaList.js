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
                <p>
                    {tacqueria.name} with {tacqueria.upvotes} upvotes
                </p>
            );
        });
    };

    return (
        <div className="">
            {tacqueriaList()}
        </div>
    );
};
