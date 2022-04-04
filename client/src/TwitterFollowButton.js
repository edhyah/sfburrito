import { Icon } from '@iconify/react';

export default function TwitterFollowButton() {
    return ( 
        <a href="https://twitter.com/edwardahn9">
            <div className="flex bg-[#1da1f2] h-fit px-3 rounded-md cursor-pointer hover:bg-[#117dbf] ml-3">
                <div className="py-1">
                    <Icon icon="akar-icons:twitter-fill" color="white" height="12" />
                </div>
                <p className="text-[#ffffff] pl-1 text-sm">Follow</p>
            </div>
        </a>
    );
}
