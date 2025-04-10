import type {Friend} from '@/libs/types'
import {friends} from '@/config'
import {CamoImage} from '@/components/common/Image'

export default function Page() {
    return (
        <div className="select-none">
            <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:mb-8">朋友们</h1>
            <p className="mb-4 text-lg md:text-xl lg:mb-8 font-semibold">海内存知己，天涯若比邻</p>
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
        <a href={friend.link} target="_blank" className="block">
            <div className="rounded-sm bg-neutral-100 dark:bg-neutral-800">
                <div className="flex flex-col items-center justify-between p-5">
                    <div className="mb-2">
                        <CamoImage src={friend.avatar} alt={friend.name} loading="lazy" className="w-16 h-16 rounded-lg object-cover"/>
                    </div>
                    <p className="px-1 text-base truncate w-full text-center">{friend.name}</p>
                </div>
            </div>
        </a>
    )
}
