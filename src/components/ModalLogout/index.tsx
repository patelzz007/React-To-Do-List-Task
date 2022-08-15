import { useNavigate } from 'react-router-dom'
import { Button } from '../Button'

import iconLogout from '../../images/logout.svg'
import iconNonoLogout from '../../images/nono-logout.svg'

import { ModalOverlay, ModalContent, Buttons } from './styles'

interface IModalLogoutProps {
    setIsModalLogout: React.Dispatch<React.SetStateAction<boolean>>
}

export function ModalLogout({ setIsModalLogout }: IModalLogoutProps) {
    const navigate = useNavigate()

    function logoutPlatform() {
        navigate('/')
    }

    return (
        <ModalOverlay>
            <ModalContent>
                <h2>Are you sure you want to log out?</h2>

                <Buttons>
                    <Button onClick={() => setIsModalLogout(false)}>
                        <img src={iconNonoLogout} alt="icon nono logout" />
                        No
                    </Button>
                    <Button onClick={logoutPlatform}>
                        <img src={iconLogout} alt="icon logout" />
                        Yes
                    </Button>
                </Buttons>
            </ModalContent>
        </ModalOverlay>
    )
}
