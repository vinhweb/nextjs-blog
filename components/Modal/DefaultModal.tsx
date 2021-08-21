import React, {Children} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Button,
} from "@chakra-ui/react"

const DefaultModal = ({children, size='md'}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const initialRef = React.useRef()

    let _header, _body, _footer, _button

    Children.forEach(children, child => {
        if (child.type === DefaultModalButton) {
            return _button = child
        }
        if (child.type === DefaultModalHeader) {
            return _header = child
        }
        if (child.type === DefaultModalBody) {
            return _body = child
        }
        if (child.type === DefaultModalFooter) {
            return _footer = child
        }
    })

    return (
        <>
            <div onClick={onOpen}>
                {_button}
            </div>
            <Modal
                initialFocusRef={initialRef}
                onClose={onClose}
                isOpen={isOpen}
                motionPreset="slideInBottom"
                size={size}
            >
                <ModalOverlay/>
                <ModalContent>
                    {_header}
                    <ModalCloseButton/>
                    {_body}
                    <ModalFooter>
                        {_footer}
                        <Button ml={3} variant="ghost" onClick={onClose}>Đóng</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DefaultModal

const DefaultModalHeader = ({children}) => <ModalHeader>{children}</ModalHeader>
const DefaultModalBody = ({children}) => <ModalBody>{children}</ModalBody>
const DefaultModalFooter = ({children}) => <div>{children}</div>
const DefaultModalButton = ({children}) => <div>{children}</div>


DefaultModal.Header = DefaultModalHeader
DefaultModal.Body = DefaultModalBody
DefaultModal.Footer = DefaultModalFooter
DefaultModal.Button = DefaultModalButton