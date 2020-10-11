import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const Project = ({project, onPress, onDelete}) => (
  <TouchableOpacity onPressIn={() => onPress(project)} style={styles.touch}>
  <Card style= {styles.card}>
    <Card.Title title={project.project} left={LeftContent} />
    <Card.Actions>
      {/* <Button onPress={() => onEdit(project)} >Edit</Button> */}
      <Button onPress={() => onDelete(project)} >Delete</Button>
    </Card.Actions>

  </Card>
  </TouchableOpacity>

);

export default Project

const styles = StyleSheet.create({
touch: {margin: 15, width: '90%', alignItems: 'center'},
  card: {
    maxWidth: 500,
    width: '100%'
  }
});
