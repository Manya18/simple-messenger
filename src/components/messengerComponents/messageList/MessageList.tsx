import { MessageType } from '../../../types/MessageType';
import styles from './messageList.module.css'

const MessageList = ({props} : {props: MessageType[]}) => {
    return ( 
        <div className={styles.messageList}>
            {props.map((message, index) => (
                <div key={index} className={message.type === 'question' ? styles.question : styles.answer}>
                    {message.text}
                </div>
            ))}
        </div>
     );
}
 
export default MessageList;