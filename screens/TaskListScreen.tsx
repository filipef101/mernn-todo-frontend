import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, ActivityIndicator, Modal, FAB, TextInput } from 'react-native-paper';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { createProject, createTodo, deleteTodo, editTodo, getDetails } from '../services/Api';
import { BottomTabParamList, RootStackParamList, TabOneParamList } from '../types';
import Prompt from 'react-native-simple-prompt';
import Task from '../components/Task';

export default function ProjectsScreen({ navigation, route }: StackScreenProps<BottomTabParamList, 'TabOne'>) {

  const project = route?.params.project || {}
  let tasks: any[] = project.tasks || []
  tasks = tasks.sort((a,b) =>  a.finished ? 1 : -1 )
  const [taskname, settaskname] = React.useState<string>();
  const [todos, settodos] = React.useState(tasks);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);

  //   React.useEffect(() => {
  //     // makeApi().then(() => {
  //       getDetails().then((details) => {
  //         if (!details || !details.displayName) return navigation.goBack()

  //         console.warn(details)
  //         setusername(details.displayName)
  //         setprojects(details.projects)
  //         setLoading(false)
  //       }).catch(() => {
  //         navigation.replace('TabOne')
  //       })
  //     // })

  // }, []);

  async function _createTask() {
    if (!taskname) return
    const res = await createTodo(taskname, project._id)
    if (!res) return
    const tempTodos = [...todos]
    tempTodos.unshift(res)
    settodos(tempTodos)
    hideModal()
    settaskname('')

  }

  const onDelete = async (task: { _id: string; }) => {
    if (!task) return
    const res = await deleteTodo(task._id)
    if (!res) return
    const tempTodos = [...todos]
    tempTodos.splice(tempTodos.findIndex(function (i) {
      return i._id === task._id;
    }), 1);
    settodos(tempTodos)
  }

  const onEdit = async (task) => {
    if (!task) return
    const res = await editTodo(task._id, task.todo, task.finished)
    if (!res) return
    const tempTodos = [...todos]

    tempTodos[tempTodos.findIndex(el => el._id === task._id)] = task;

    settodos(tempTodos)

  }
  console.debug('project on tasklistscreen', project)
  if (!project) return null
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{project.project}</Text>
        {!!todos.length && <Text style={styles.title}>Task List</Text>}
        {!todos.length && <Text onPress={showModal} style={styles.titleLink}>Create first task</Text>}
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        {todos.map((task) => { // TODO AND OR AUTOGRID
          return (
            <Task key={task._id} task={task} onDelete={onDelete} onEdit={onEdit} />
          )
        })}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={showModal}
      />
      <Modal contentContainerStyle={styles.modal} visible={visible} onDismiss={hideModal}>
        <View style={{ flex: 1, borderWidth: 1, borderColor: 'purple' }}>
          <Title style={{ padding: 20 }}>Create new task:</Title>
          <View style={{ flexDirection: 'row' }}>
            <TextInput value={taskname} onSubmitEditing={_createTask} onChangeText={settaskname} style={{ margin: 10, height: 40 }} />
            <Button onPress={_createTask} mode='contained' style={{ margin: 10, height: 35 }}>Add</Button>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  buttons: {
    flexDirection: 'row',
    marginHorizontal: '10%',
    width: '90%',
    marginVertical: 30,
    maxWidth: 800,
    justifyContent: 'space-evenly',
  },
  loading: {
    marginTop: '10%',
  },
  modal: {
    alignSelf: 'center',
    maxWidth: 600,
    maxHeight: 600,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleLink: {
    color: 'blue',
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  card: {
    width: 500
  }
});

