import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon } from '@iconify/react';

function Footer() {
    return (
        <div className="w-[50%] pt-8 mx-auto text-center flex mb-8 justify-center">
            <div className="flex bg-[#4267B2] w-fit h-fit px-2 rounded-md cursor-pointer">
                <FontAwesomeIcon icon={faThumbsUp} style={{color:"#ffffff"}} className="py-1" size="xs" />
                <p className="text-[#ffffff] pl-1 text-sm">Like 3.2K</p>
            </div>
            <div className="mx-3">
                <a href="https://twitter.com/edwardahn9?ref_src=twsrc%5Etfw" className="twitter-follow-button" data-show-screen-name="false" data-show-count="false">Follow @edwardahn9</a>
            </div>
            <div className="flex bg-[#3d95ce] h-fit px-2 rounded-md cursor-pointer">
                <div className="py-1">
                    <Icon icon="bxl:venmo" color="white" height="12" />
                </div>
                <p className="text-[#ffffff] pl-1 text-sm">Buy me a burrito</p>
            </div>
        </div>
    );
};

export default Footer;
