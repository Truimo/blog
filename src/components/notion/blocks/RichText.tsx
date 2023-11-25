import Text from '@/components/notion/blocks/Text'
import NotSupported from '@/components/notion/blocks/NotSupported'
import Equation from '@/components/notion/blocks/Equation'
import type {RichTextItemResponse} from '@notionhq/client/build/src/api-endpoints'

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
