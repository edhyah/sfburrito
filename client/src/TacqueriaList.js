import { useEffect, useState } from 'react';
import axios from 'axios';
import PercentageBar from './PercentageBar';

export default function TacqueriaList() {
    const [tacquerias, setTacquerias] = useState([]);
    const [chosenTacqueriaId, setChosenTacqueriaId] = useState(null);

    useEffect(() => {
        setChosenTacqueriaId(localStorage.getItem('chosenTacqueriaId'));
        axios
            .get('/api/tacquerias')
            .then(res => {
                setTacquerias(res.data.sort(sortFn));
            })
            .catch(_ => console.log('Error getting tacquerias.'));
    }, []);

    function sortFn(a, b) {
        if (a.upvotes < b.upvotes) {
            return 1;
        } else if (a.upvotes > b.upvotes) {
            return -1;
        } else {
            if (a.name > b.name) {
                return 1;
            } else {
                return -1;
            }
        }
    }

    function getIndexOfTacqueriaWithId(id) {
        let index = tacquerias.reduce((index, tacqueria, currentIndex) => {
            return tacqueria._id === id ? currentIndex : index;
        }, -1);
        return index;
    }

    function onUpvote(e, id) {
        e.preventDefault();
        if (id === chosenTacqueriaId) {
            return;
        }
        if (chosenTacqueriaId !== null) {
            axios
                .post(`/api/downvote/${chosenTacqueriaId.toString()}`)
                .then(_ => {
                    tacquerias[getIndexOfTacqueriaWithId(chosenTacqueriaId)].upvotes -= 1;
                })
                .catch((err) => console.log(err));
        }
        axios
            .post(`/api/upvote/${id.toString()}`)
            .then(_ => {
                tacquerias[getIndexOfTacqueriaWithId(id)].upvotes += 1;
                setChosenTacqueriaId(id);
                localStorage.setItem('chosenTacqueriaId', id);
            })
            .catch((err) => console.log(err));
    }

    function getTotalNumberOfUpvotes() {
        return tacquerias.reduce((previousSum, tacqueria) => {
            return previousSum + tacqueria.upvotes;
        }, 0);
    }

    function tacqueriaList() {
        const totalUpvotes = getTotalNumberOfUpvotes();
        return tacquerias.map((tacqueria) => {
            return (
                <TacqueriaCard
                    key={tacqueria._id}
                    id={tacqueria._id}
                    name={tacqueria.name}
                    numUpvotes={tacqueria.upvotes}
                    totalUpvotes={totalUpvotes}
                    chosen={chosenTacqueriaId === tacqueria._id}
                    onUpvote={onUpvote}
                />
            );
        });
    }

    return (
        <div className="mx-auto w-300px sm:w-500px">
            {tacqueriaList()}
        </div>
    );
}

function TacqueriaCard({ id, name, numUpvotes, totalUpvotes, chosen, onUpvote }) {
    return (
        <div
            className={`px-5 py-2 my-1 text-center rounded-lg w-full border border-stone-400 cursor-pointer ${chosen ? 'ring-2 ring-orange-500 border-none' : ''}`}
            onClick={(e) => onUpvote(e, id)}
        >
            <div className="flex">
                {name}
                <div className="flex-auto text-right">
                    {numUpvotes}
                </div>
            </div>
            <PercentageBar percent={Math.round(100*numUpvotes/totalUpvotes)} />
        </div>
    );
}
