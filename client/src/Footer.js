import LikeButton from './LikeButton';
import TwitterFollowButton from './TwitterFollowButton';
import VenmoButton from './VenmoButton';

export default function Footer() {
    return (
        <div className="flex flex-wrap justify-center pt-8 mx-auto mb-8 text-center">
            <LikeButton />
            <TwitterFollowButton />
            <VenmoButton />
        </div>
    );
}
