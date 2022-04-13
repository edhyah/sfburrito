import { useEffect, useState } from 'react';
import axios from 'axios';
import PercentageBar from './PercentageBar';

export default function TaqueriaList() {
    const [taquerias, setTaquerias] = useState([]);
    const [chosenTaqueriaId, setChosenTaqueriaId] = useState(null);

    useEffect(() => {
        setChosenTaqueriaId(localStorage.getItem('chosenTacqueriaId'));
        axios
            .get('/api/taquerias')
            .then(res => {
                setTaquerias(res.data.sort(sortFn));
            })
            .catch(_ => console.log('Error getting taquerias.'));
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

    function getIndexOfTaqueriaWithId(id) {
        let index = taquerias.reduce((index, taqueria, currentIndex) => {
            return taqueria._id === id ? currentIndex : index;
        }, -1);
        return index;
    }

    function onUpvote(e, id) {
        e.preventDefault();
        if (id === chosenTaqueriaId) {
            return;
        }
        if (chosenTaqueriaId !== null) {
            axios
                .post(`/api/downvote/${chosenTaqueriaId.toString()}`)
                .then(_ => {
                    taquerias[getIndexOfTaqueriaWithId(chosenTaqueriaId)].upvotes -= 1;
                })
                .catch((err) => console.log(err));
        }
        axios
            .post(`/api/upvote/${id.toString()}`)
            .then(_ => {
                taquerias[getIndexOfTaqueriaWithId(id)].upvotes += 1;
                setChosenTaqueriaId(id);
                localStorage.setItem('chosenTacqueriaId', id);
            })
            .catch((err) => console.log(err));
    }

    function getTotalNumberOfUpvotes() {
        return taquerias.reduce((previousSum, taqueria) => {
            return previousSum + taqueria.upvotes;
        }, 0);
    }

    function taqueriaList() {
        const totalUpvotes = getTotalNumberOfUpvotes();
        return taquerias.map((taqueria) => {
            return (
                <TaqueriaCard
                    key={taqueria._id}
                    id={taqueria._id}
                    name={taqueria.name}
                    numUpvotes={taqueria.upvotes}
                    totalUpvotes={totalUpvotes}
                    chosen={chosenTaqueriaId === taqueria._id}
                    onUpvote={onUpvote}
                />
            );
        });
    }

    return (
        <div className="mx-auto w-300px sm:w-500px">
            {taqueriaList()}
        </div>
    );
}

function TaqueriaCard({ id, name, numUpvotes, totalUpvotes, chosen, onUpvote }) {
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
