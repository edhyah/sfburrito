import { useEffect, useState } from 'react';
import PercentageBar from './PercentageBar';

import { useSupabase } from './Supabase'

export default function TaqueriaList() {
    const [taquerias, setTaquerias] = useState([]);
    const [chosenTaqueriaId, setChosenTaqueriaId] = useState(null);
    const supabase = useSupabase();

    useEffect(() => {
        const _id = localStorage.getItem('chosenTacqueriaId');
        if (_id) setChosenTaqueriaId(parseInt(_id, 10));
        async function fetchTaquerias() {
            const { data, error } = await supabase.rpc('sfburrito_get_taquerias')
            if (data) {
                setTaquerias(data.sort(sortFn));
            } else {
                console.error("Error fetching taquerias:", error);
            }
        }
        fetchTaquerias();
    }, [supabase]);

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
            return taqueria.id === id ? currentIndex : index;
        }, -1);
        return index;
    }

    function onUpvote(e, id) {
        e.preventDefault();
        if (id === chosenTaqueriaId) {
            return;
        }

        // To ensure downvote gets called first before upvote
        let downvotePromise;

        if (chosenTaqueriaId !== null) {
            downvotePromise = supabase
                .rpc('sfburrito_downvote_taqueria', { taqueria_id: chosenTaqueriaId })
                .then(({ _, error }) => {
                    if (error) console.error(error);
                    taquerias[getIndexOfTaqueriaWithId(chosenTaqueriaId)].upvotes -= 1;
                })
                .catch(error => {
                    console.error("An unexpected error occurred while downvoting:", error);
                });
        } else {
            downvotePromise = Promise.resolve();
        }

        downvotePromise.then(() => {
            return supabase
                .rpc('sfburrito_upvote_taqueria', { taqueria_id: id })
                .then(({ _, error }) => {
                    if (error) console.error(error);
                    taquerias[getIndexOfTaqueriaWithId(id)].upvotes += 1;
                    setChosenTaqueriaId(id);
                    localStorage.setItem('chosenTacqueriaId', id);
                })
                .catch(error => {
                    console.error("An unexpected error occurred while upvoting:", error);
                });
        });
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
                    key={taqueria.id}
                    id={taqueria.id}
                    name={taqueria.name}
                    numUpvotes={taqueria.upvotes}
                    totalUpvotes={totalUpvotes}
                    chosen={chosenTaqueriaId === taqueria.id}
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
