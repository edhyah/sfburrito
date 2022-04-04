import { Icon } from '@iconify/react';

export default function VenmoButton() {
    return ( 
        <a href="https://venmo.com/code?user_id=1959207003750400831&created=1649060579.625554&printed=1">
            <div className="flex bg-[#3d95ce] h-fit px-3 rounded-md cursor-pointer hover:bg-[#327cad] ml-3">
                <div className="py-1">
                    <Icon icon="bxl:venmo" color="white" height="12" />
                </div>
                <p className="text-[#ffffff] pl-1 text-sm">Buy me a 🌯</p>
            </div>
        </a>
    );
}
