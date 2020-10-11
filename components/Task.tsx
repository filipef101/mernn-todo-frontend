import * as React from 'react';
import { Avatar, Button, Card, Dialog, IconButton, Paragraph, TextInput,  } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Hoverable from '../components/hover/Hoverable';
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const Task = ({ task, onDelete, onEdit }) => {

    const [taskname, settaskname] = React.useState<string>(task.todo);
    const [finished, setfinished] = React.useState<Date | null>(task.finished);
    const [editing, setediting] = React.useState(false);

    function _onEdit() {
        setediting(false)
        onEdit({ ...task, todo: taskname })
    }
    function _finish() {
        onEdit({ ...task, finished: new Date() })
        setfinished(new Date())
    }
    function cancel() {
        settaskname(task.todo)
        setediting(false)
    }

    function Right(props: { size: number }) {
        return (
            <IconButton {...props} icon="more-vert" onPress={() => { }} />
        )
    }

    return (
        <Hoverable  >
            {isHovered => (
                <Card style={styles.card}>

                    {!editing && <Card.Title style={finished ? { textDecorationLine: 'line-through' } : undefined} title={taskname} />}

                    {editing && <TextInput style={styles.input} value={taskname} onChangeText={settaskname} />}

                    {!!editing && <Card.Actions style={{ flex: 1, justifyContent: 'space-around' }}>
                        <Button onPress={_onEdit} >Save</Button>
                        <Button onPress={cancel} >Cancel</Button>
                    </Card.Actions>}

                    {!finished && !editing && <Card.Actions style={{ flex: 1, justifyContent: 'space-around' }}>
                        <Button onPress={() => setediting(true)} >Edit</Button>
                        <Button onPress={_finish} >Finish</Button>
                        <Button onPress={() => onDelete(task)} >Delete</Button>
                    </Card.Actions>}
                    <Dialog style={{height: 30}} visible={isHovered && task.finished} >
            <Paragraph>  Finished at: {new Date(task.finished).toLocaleString()}</Paragraph>
                    </Dialog>
                </Card>
            )}
        </Hoverable>
    )
};

export default Task;



const styles = StyleSheet.create({
    card: {
        margin: 15,
        width: '90%',
        maxWidth: 600
    },
    input: {
        height: 50
    }
});


 //const MyComponent = ({task, onDelete, onEdit}) => (
//     <Card style= {styles.card}>

//       <Card.Title style={{textDecorationLine: 'line-through'}} title={task.todo} >

//         </Card.Title>
//         <Card.Actions style={{flex:1, justifyContent: 'space-around'}}>
//         <Button onPress={() => onEdit(task)} >Edit</Button>
//         <Button onPress={() => onDelete(task)} >Delete</Button>
//       </Card.Actions>

//     </Card>

//   );