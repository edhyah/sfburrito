import { Icon } from '@iconify/react';
import LikeButton from './LikeButton';

export default function Footer() {
    return (
        <div className="flex justify-center pt-8 mx-auto mb-8 text-center">
            <LikeButton />
            <div className="ml-3">
                <a href="https://twitter.com/edwardahn9?ref_src=twsrc%5Etfw" className="twitter-follow-button" data-show-screen-name="false" data-show-count="false" />
            </div>
            <div className="flex bg-[#3d95ce] h-fit px-2 rounded-md cursor-pointer hover:bg-[#327cad] ml-3">
                <div className="py-1">
                    <Icon icon="bxl:venmo" color="white" height="12" />
                </div>
                <p className="text-[#ffffff] pl-1 text-sm">Buy me a 🌯</p>
            </div>
        </div>
    );
}
