import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon } from '@iconify/react';

function Footer() {
    return (
        <div className="w-[50%] pt-8 mx-auto text-center">
            <p>
                Don't see your favorite tacqueria?<br />
                Upset that your favorite tacqueria isn't at the top?
            </p>
            <div className="flex justify-center">
                <p className="mr-3">Reach out to me on Twitter!</p>
                <a href="https://twitter.com/edwardahn9?ref_src=twsrc%5Etfw" className="twitter-follow-button" data-show-screen-name="false" data-show-count="false">Follow @edwardahn9</a>
            </div>
            <div className="flex justify-center pt-5">
                <p className="mr-3">If you enjoyed this, punch this like button!</p>
                <FontAwesomeIcon icon={faThumbsUp} style={{color:"blue"}} className="py-1" />
            </div>
            <div className="w-4/5 pt-5 mx-auto mb-8">
                <p>Even better, send me a buck or two to fund my next burrito (and server costs)!</p>
                <Icon icon="bxl-venmo" color="#3d95ce" />
            </div>
        </div>
    );
};

export default Footer;
