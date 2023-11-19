export default function LoadingPokemonCard({}) {
    return(
        <div className="w-full h-[32rem] rounded-2xl p-2 shadow-xl bg-slate-700 animate-pulse">
            <div className={"w-full h-full rounded-xl p-2"}>
                <div className="align-top inline-block rounded-lg bg-slate-600 h-6 w-10 sm:w-8"/>
                <div className={"ml-2 inline-block rounded-lg align-baseline bg-slate-600 h-8 w-40 sm:w-28 l:30 2xl:w-3632"}/>
                <div className="float-right inline-block rounded-lg align-baseline bg-slate-600 h-8 w-16 xs:w-20 sm:w-14 md:w-12"/>
                <div className="flex block justify-center">
                    <div className="bg-slate-600 rounded-lg w-full h-60"/>
                </div>
                <div className="max-w-lg px-1 py-2">
                    <div className="h-3 bg-slate-600 rounded-full my-2.5"></div>
                    <div className="h-3 bg-slate-600 rounded-full mb-2.5"></div>
                    <div className="h-3 bg-slate-600 rounded-full max-w-sm mb-2.5"></div>
                </div>
                <div className="grid grid-cols-2 px-3 gap-2">
                    <span className="h-12 w-32 bg-slate-600 rounded-lg sm:w-20"/>
                    <span className="h-12 w-32 bg-slate-600 rounded-lg sm:w-20"/>
                </div>
            </div>
        </div>
    )
}