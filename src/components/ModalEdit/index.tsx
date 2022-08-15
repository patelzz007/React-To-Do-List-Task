import { useState, FormEvent } from 'react'
import { Button } from '../Button'

import { toast } from 'react-toastify'
import closeIcon from '../../images/close.svg'

import { ModalOverlay, ModalContent } from './styles'

interface IModalEditProps {
    keyTodo: string
    editTodo: (key: string, newValue: string) => void
    closeModalEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export function ModalEdit({
    closeModalEdit,
    editTodo,
    keyTodo,
}: IModalEditProps) {
    const [updateTodo, setUpdateTodo] = useState('')

    function handleForm(event: FormEvent) {
        event.preventDefault()

        if (updateTodo.trim() === '') {
            toast.error('Please fill in the field')
            return
        }

        editTodo(keyTodo, updateTodo)
        setUpdateTodo('')

        toast.success('Your task has been successfully edited')
        closeModalEdit(false)
    }

    return (
        <ModalOverlay>
            <ModalContent>
                <h2>Edit Task.</h2>
                <p>Are you sure you want to edit this task?</p>
                <img
                    onClick={() => closeModalEdit(false)}
                    src={closeIcon}
                    alt="close icon"
                />

                <form onSubmit={handleForm}>
                    <div>
                        <label htmlFor="newTodo" className="sr-only">
                            Enter your new task
                        </label>
                        <input
                            type="text"
                            id="newTodo"
                            placeholder="Enter your new task"
                            value={updateTodo}
                            onChange={(event) =>
                                setUpdateTodo(event.target.value)
                            }
                            autoComplete="off"
                        />
                    </div>
                    <Button>Yes, edit</Button>
                </form>
            </ModalContent>
        </ModalOverlay>
    )
}
