export default function NotSupported({inline}:{
    inline?: boolean
}) {
    if (inline) {
        return (
            <span className="text-red-600">不支持</span>
        )
    }

    return (
        <div className="text-red-600">不支持</div>
    )
}
