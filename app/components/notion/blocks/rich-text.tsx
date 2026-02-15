import type {RichTextItemResponse} from '@notionhq/client/build/src/api-endpoints'
import Text from './text'
import Equation from './equation'
import NotSupported from './not-supported'

export default function RichText({rich_text}: {
    rich_text: RichTextItemResponse[]
}) {
    return rich_text.map((text, idx) => {
        switch (text.type) {
            case "text":
                return <Text key={idx} text={text}/>
            case "mention":
                return <NotSupported key={idx} inline/>
            case "equation":
                return <Equation key={idx} equation={text}/>
        }
    })
}
