export default function PercentageBar(props) {
    return (
        <div className="w-full h-1 my-1 bg-stone-200">
            <div className={`h-1 bg-orange-500 w-[${props.percent}%]`} />
        </div>
    );
}
