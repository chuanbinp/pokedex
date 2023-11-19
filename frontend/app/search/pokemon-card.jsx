import Image from 'next/image'
import PokemonStat from './pokemon-stat'
import PokemonAbility from './pokemon-ability'

const type_to_color = {
    normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
}

export default function PokemonCard({specs}) {
    const bg_color = `bg-[${type_to_color[specs.metadata.type1]}]`
    const icon_path = `/types/${specs.metadata.type1}.svg`
    const hp_color = specs.metadata.type1=="fighting" || specs.metadata.type1=="water" || specs.metadata.type1=="fire"? 
                        `text-black` 
                        : `text-red-600`
    const name_color = specs.metadata.type1=="dark" || specs.metadata.type1=="ghost" || specs.metadata.type1=="dragon"?
                        `text-white` 
                        : `text-black`
    return(
        <div className="w-full h-[32rem] bg-orange-300 rounded-2xl p-2 shadow-xl">
            <div className={bg_color + " w-full h-full rounded-xl p-2"}>
                <span className="font-semibold text-xs text-gray-100 align-top">#{specs.id}</span>
                <p className={name_color + " ml-2 font-semibold capitalize text-lg inline-block"}>{specs.metadata.name}</p>
                <div className="float-right inline-block">
                    <span className={hp_color + " font-bold text-md italic tracking-tighter"}>{specs.metadata.hp} HP</span>
                    <Image src={icon_path} alt="icon" width={16} height={16} className="inline-block ml-1 align-center"/>
                </div>
                <div className="flex justify-center bg-orange-100 rounded-lg">
                    <Image src={specs.metadata.image} alt="image" width={200} height={150}/>
                </div>
                <div className="text-[0.75rem] italic px-1 py-2 text-black text-justify leading-4">{specs.metadata.desc}</div>
                <div className="grid grid-cols-2 px-3 text-xs">
                    <PokemonStat statkey={"height"} statvalue={specs.metadata.height}/>
                    <PokemonStat statkey={"weight"} statvalue={specs.metadata.weight}/>
                    <PokemonStat statkey={"atk"} statvalue={specs.metadata.atk}/>
                    <PokemonStat statkey={"def"} statvalue={specs.metadata.def}/>
                    <PokemonStat statkey={"spatk"} statvalue={specs.metadata.spatk}/>
                    <PokemonStat statkey={"spdef"} statvalue={specs.metadata.spdef}/>
                </div>
                <div>
                    <div className="text-[0.75rem] px-1 py-2 text-black">
                        <p className="font-bold italic">Abilities</p>
                        <div className="flex flex-wrap gap-1">
                        {
                            specs.metadata.abilities.split(" ").slice(0, -1).map((ability, i)=>
                                <PokemonAbility key={i} ability={ability} />
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}