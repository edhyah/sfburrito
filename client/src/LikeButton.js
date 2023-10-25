import { useEffect, useState } from 'react';

import { faCheck, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSupabase } from './Supabase'

export default function LikeButton() {
    const [numLikes, setNumLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const supabase = useSupabase();

    useEffect(() => {
        if (localStorage.getItem('liked')) {
            setLiked(true);
        }
        async function fetchLikes() {
            const { data, error } = await supabase.rpc('sfburrito_get_likes');
            if (data) {
                setNumLikes(data);
            } else {
                console.error("Error fetching likes:", error);
            }
        }
        fetchLikes();
    }, []);

    function onLike(e) {
        e.preventDefault();
        if (liked) return;
        supabase
            .rpc('sfburrito_like')
            .then(({ _, error }) => {
                if (error) console.error(error);
                setNumLikes(numLikes + 1);
                setLiked(true);
                localStorage.setItem('liked', true);
            })
            .catch(error => {
                console.error("An unexpected error occurred while liking:", error);
            });
    }

    // https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
    function numFormatted(num, digits) {
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "K" },
            { value: 1e6, symbol: "M" }
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup.slice().reverse().find(function(item) {
            return num >= item.value;
        });
        return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    }

    function LikeIcon(props) {
        const liked = props.liked;
        if (liked) {
            return <FontAwesomeIcon icon={faCheck} style={{color:"white"}} className="py-1" size="xs" />;
        } else {
            return <FontAwesomeIcon icon={faThumbsUp} style={{color:"white"}} className="py-1" size="xs" />;
        }
    }

    return (
        <div
            className="flex bg-[#4267B2] w-fit h-fit px-3 rounded-md cursor-pointer hover:bg-[#35538f]"
            onClick={(e) => onLike(e)}
        >
            <LikeIcon liked={liked} />
            <p className="text-[#ffffff] pl-1 text-sm">Like {numFormatted(numLikes, 1)}</p>
        </div>
    );
}
