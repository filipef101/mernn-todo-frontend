import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
    baseURL: process.env?.APP_MANIFEST?.extra?.api,
    
  })

export async function checkLogin() {
    const token = await  AsyncStorage.getItem('auth')
    if (token) {
        api.defaults.headers.post['x-auth'] = token
        api.defaults.headers.get['x-auth'] = token
        api.defaults.headers.delete['x-auth'] = token
        api.defaults.headers.patch['x-auth'] = token
    }
    
   const res = await api.post('users/token', undefined,)
   console.debug('checkLogin',res)
   if (res.data) return res.data
   return false
}

export async function login(email: string, password: string) {
    const res = await api.post('users/login', {email, password})

    if (res.data?.token){
        const token = res.data.token
         AsyncStorage.setItem('auth', token)
         api.defaults.headers.post['x-auth'] = token
         api.defaults.headers.get['x-auth'] = token
         api.defaults.headers.delete['x-auth'] = token
         api.defaults.headers.patch['x-auth'] = token
        return res.data
    }
    return false
 }
 
 export async function register(email: string, password: string) {
    const res = await api.post('users/register', {email, password})
    console.debug(res)
    if (res.data?.token){
        const token = res.data.token
         AsyncStorage.setItem('auth', token)
         api.defaults.headers.post['x-auth'] = token
         api.defaults.headers.get['x-auth'] = token
         api.defaults.headers.delete['x-auth'] = token
         api.defaults.headers.patch['x-auth'] = token
        return res.data
    }
    return false
 }
 
 export async function getDetails() {
    const res = await api.get('users')
    if (res.data) return res.data
    return false
 }
 

 export async function createProject(project: string) {
    const res = await api.post('projects', {project})
    if (res.data) return res.data
    return false
 }
 
 export async function deleteProject(id: string) {
    const res = await api.delete('projects/' + id)
    if (res.data) return res.data
    return false
 }
 export async function deleteTodo(id: string) {
    const res = await api.delete('todos/' + id)
    if (res.data) return res.data
    return false
 }
 
 export async function createTodo(todo: string, project: string) {
    const res = await api.post('todos', {project, todo})
    if (res.data) return res.data
    return false
 }

 export async function editProject(id: string, project: string) {
    const res = await api.patch('projects', {project, id})
    if (res.data) return res.data
    return false
 }
 
 export async function editTodo(id: string, todo?: string, finished: null | Date) {
    const res = await api.patch('todos', { todo, id, finished})
    if (res.data) return res.data
    return false
 }