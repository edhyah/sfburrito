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

    function getTotalNumberOfUpvotes() {
        let numUpvotes = 0;
        for (let i = 0; i < tacquerias.length; i++) {
            numUpvotes += tacquerias[i].upvotes;
        }
        return numUpvotes;
    }

    function tacqueriaList() {
        const totalUpvotes = getTotalNumberOfUpvotes();
        return tacquerias.map((tacqueria) => {
            return (
                <TacqueriaCard
                    key={tacqueria._id}
                    id={tacqueria._id}
                    name={tacqueria.name}
                    origNumUpvotes={tacqueria.upvotes}
                    totalUpvotes={totalUpvotes}
                    chosen={chosenTacqueriaId === tacqueria._id}
                    previouslyChosen={previouslyChosenTacqueraId === tacqueria._id}
                    onUpvote={onUpvote}
                />
            );
        });
    }

    return (
        <div className="w-2/5 mx-auto">
            {tacqueriaList()}
        </div>
    );
}

function TacqueriaCard({ id, name, origNumUpvotes, totalUpvotes, chosen, previouslyChosen, onUpvote }) {
    const [upvotes, setUpvotes] = useState(origNumUpvotes);
    const [percentageUpvotes, setPercentageUpvotes] = useState(Math.round(100 * origNumUpvotes / totalUpvotes));

    function getNumberOfUpvotes() {
        if (!previouslyChosen) {
            if (chosen && upvotes === origNumUpvotes) {
                setUpvotes(origNumUpvotes + 1);
                setPercentageUpvotes(Math.round(100 * (origNumUpvotes + 1) / (totalUpvotes + 1)));
            } else if (!chosen && upvotes !== origNumUpvotes){
                setUpvotes(origNumUpvotes);
                setPercentageUpvotes(Math.round(100 * (origNumUpvotes) / (totalUpvotes + 1)));
            }
        } else {
            if (chosen && upvotes !== origNumUpvotes) {
                setUpvotes(origNumUpvotes);
                setPercentageUpvotes(Math.round(100 * (origNumUpvotes) / (totalUpvotes)));
            } else if (!chosen && upvotes === origNumUpvotes){
                setUpvotes(origNumUpvotes - 1);
                setPercentageUpvotes(Math.round(100 * (origNumUpvotes - 1) / (totalUpvotes)));
            }
        }
        return upvotes;
    }

    return (
        <div
            className={`px-5 py-2 my-1 text-center rounded-lg w-full border border-stone-400 cursor-pointer ${chosen ? 'ring-2 ring-orange-500 border-none' : ''}`}
            onClick={(e) => onUpvote(e, id)}
        >
            <div className="flex">
                {name}
                <div className="flex-auto text-right">
                    {getNumberOfUpvotes()}
                </div>
            </div>
            <div className="w-full h-1 my-1 bg-stone-200">
                <div className={`h-1 bg-orange-500 w-[${percentageUpvotes}%]`} />
            </div>
        </div>
    );
}
