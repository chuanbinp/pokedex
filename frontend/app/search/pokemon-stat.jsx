export default function PokemonStat({statkey, statvalue}) {
    return (
        <div>
            <span className="uppercase text-black tracking-tighter font-semibold">{statkey}:</span>
            <span className="text-white font-semibold ml-2">{statvalue}</span>
        </div>
    )
}