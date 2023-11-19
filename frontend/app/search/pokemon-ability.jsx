export default function PokemonAbility({ability}) {
    return (
        <span className="bg-orange-300 rounded-xl px-2 shadow-sm border-orange-100 border border-1">
            <span className="uppercase text-black tracking-tighter font-semibold text-[0.65rem]">{ability.replace("-", " ")}</span>         
        </span>
    )
}