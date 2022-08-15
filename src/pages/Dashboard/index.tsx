import { useEffect, useState } from 'react'
import produce from 'immer'
import { toast } from 'react-toastify'

import { AddTodo } from '../../components/AddTodo'
import { Todo } from '../../components/Todo'
import { Logo } from '../../components/Logo'
import { ModalEdit } from '../../components/ModalEdit'

import illustrationAstronaut from '../../images/astronaut.svg'
import { Container, Header, Heading, NoTodos, Todos } from './style'

interface ITodo {
    content: string
    isCompleted: boolean
    key: string
}

export const Dashboard = () => {
    const [todos, setTodos] = useState<ITodo[]>([])

    const [isModalEditActive, setIsModalEditActive] = useState(false)
    const [whichTaskShouldUpdate, setWhichTaskShouldUpdate] = useState('')

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('@todo')!)
        console.log('Dashboard data:', data)

        if (data) setTodos(data)
    }, [])

    useEffect(() => {
        localStorage.setItem('@todo', JSON.stringify(todos))
    }, [todos])

    function addTodoOnState(todo: ITodo) {
        setTodos([...todos, todo])
    }

    function editTodo(keyTodo: string, newValue: string) {
        const filteredTodo = todos.map((todo) => {
            return todo.key === keyTodo ? { ...todo, content: newValue } : todo
        })
        console.log('filteredTodo 1', filteredTodo)
        setTodos(filteredTodo)
    }

    function markTodoAsCompleted(keyTodo: string) {
        const filteredTodo = todos.map((todo) => {
            return todo.key === keyTodo ? { ...todo, isCompleted: true } : todo
        })
        console.log('filteredTodo 2', filteredTodo)
        setTodos(filteredTodo)
        toast.success('Task completed successfully')
    }

    function deleteTodo(keyTodo: string) {
        const filteredTodo = todos.filter((todo) => todo.key !== keyTodo)
        console.log('filteredTodo 3', filteredTodo)
        setTodos(filteredTodo)
        toast.success('Task deleted successfully')
    }

    function openModalEdit(keyTodo: string) {
        setIsModalEditActive(true)
        setWhichTaskShouldUpdate(keyTodo)
    }

    function moveListItem(from: number, to: number) {
        setTodos(
            produce(todos, (draft) => {
                const dragged = draft[from]

                draft.splice(from, 1)
                draft.splice(to, 0, dragged)
            })
        )
    }

    return (
        <>
            <Header />
            <Container>
                <Heading>
                    <Logo />
                </Heading>
                <AddTodo addTodoOnState={addTodoOnState} />

                {todos.length <= 0 && (
                    <NoTodos>
                        <img
                            src={illustrationAstronaut}
                            alt="astronaut illustration"
                        />
                        <p>
                            No tasks around here..
                            <br />
                            Start by adding your first task.
                        </p>
                    </NoTodos>
                )}

                <Todos>
                    {todos.map((todo, indexTodo) => (
                        <Todo
                            key={todo.key}
                            todo={todo}
                            indexTodo={indexTodo}
                            moveListItem={moveListItem}
                            deleteTodo={deleteTodo}
                            markTodoAsCompleted={markTodoAsCompleted}
                            openModalEdit={openModalEdit}
                        />
                    ))}
                </Todos>

                {isModalEditActive && (
                    <ModalEdit
                        keyTodo={whichTaskShouldUpdate}
                        editTodo={editTodo}
                        closeModalEdit={setIsModalEditActive}
                    />
                )}
            </Container>
        </>
    )
}
