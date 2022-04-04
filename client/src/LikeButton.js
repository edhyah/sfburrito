import { useEffect, useState } from 'react';
import axios from 'axios';

import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LikeButton() {
    return (
        <div className="flex bg-[#4267B2] w-fit h-fit px-2 rounded-md cursor-pointer hover:bg-[#35538f]">
            <FontAwesomeIcon icon={faThumbsUp} style={{color:"#ffffff"}} className="py-1" size="xs" />
            <p className="text-[#ffffff] pl-1 text-sm">Like 3.2K</p>
        </div>
    );
}
