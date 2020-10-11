import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet,ScrollView } from 'react-native';
import { Button, Title, ActivityIndicator, Modal, FAB, TextInput } from 'react-native-paper';

import { Text, View } from '../components/Themed';
import { createProject, deleteProject, getDetails } from '../services/Api';
import { useFocusEffect } from '@react-navigation/native';
import Project from '../components/Project';

export default function ProjectsScreen({ navigation }: StackScreenProps<any>) {
  const [loading, setLoading] = React.useState<boolean>();
  const [username, setusername] = React.useState<string>();
  const [npjname, setnpjname] = React.useState<string>();
  const [projects, setprojects] = React.useState<any[]>([]);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);
  useFocusEffect(
    React.useCallback(() => {
      getDetails().then((details) => {
        if (!details || !details.displayName) return navigation.goBack()
        
        console.warn(details)
        setusername(details.displayName)
        setprojects(details.projects)
        setLoading(false)
      }).catch(() => {
        navigation.replace('TabOne')
      })
      return () => null;
    }, [])
  );

  function onOpenProj (project) {
    navigation.push('project', {project})
  }
  async function _deleteProject (project: {_id: string}) {
    if (!project) return
    const res = await deleteProject(project._id)
    if (!res) return
    const tempprojects = [...projects]
    tempprojects.splice(tempprojects.findIndex(function (i) {
      return i._id === project._id;
    }), 1);
    setprojects(tempprojects)
  }
  async function _createProject () {
    if (!npjname) return
    const res = await createProject(npjname)
    if (!res) return
    setprojects([...projects, res])

    hideModal()
    setnpjname('')

  }
  if (loading === undefined) {
    return (
      <ActivityIndicator style={styles.loading} size='large' />
    )
  }
  
  return (
    <>
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Hello {username}</Text>
        {!!projects.length && <Text style={styles.title}>Project List</Text>}
        {!projects.length && <Text onPress={showModal} style={styles.titleLink}>Create first Project</Text>}
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        {projects.map((project) => { // TODO AND OR AUTOGRID
          return (
            <Project key={project._id} onDelete={_deleteProject} project={project} onPress={onOpenProj} />
          )
        })}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={showModal}
      />
      <Modal  contentContainerStyle={styles.modal} visible={visible} onDismiss={hideModal}>
        <View style={{flex:1, borderWidth: 1, borderColor: 'purple'}}>
         <Title style = {{padding: 20}}>Create new project:</Title>
         <View style={{flexDirection: 'row'}}>
         <TextInput value={npjname} onChangeText={setnpjname} style = {{margin: 10, height: 40}} />
         <Button onPress={_createProject} mode='contained' style = {{margin: 10, height: 35}}>Add</Button>
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
    height: '100%',
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
