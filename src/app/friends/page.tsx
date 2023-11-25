import {friends} from '@/config'
import type {Friend} from '@/libs/types'

export default function Page() {
    return (
        <div>
            <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:mb-8">Friends</h1>
            <div className="grid grid-cols-2 gap-4 my-6 sm:grid-cols-3 md:grid-cols-4">
                {friends.map((friend, index) => (
                    <Item key={index} friend={friend}/>
                ))}
            </div>
        </div>
    )
}

function Item({friend}: { friend: Friend }) {
    return (
        <a href={friend.link} target="_blank" rel="noreferrer" className="block">
            <div className="bg-neutral-100 select-none">
                <div className="flex flex-col items-center justify-between p-5">
                    <div className="mb-2">
                        <img src={friend.avatar} alt={friend.name} loading="lazy" className="w-16 h-16 rounded-full object-cover"/>
                    </div>
                    <p className="px-1 text-xl truncate w-full text-center">{friend.name}</p>
                </div>
            </div>
        </a>
    )
}

