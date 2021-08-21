import React, {Children, useImperativeHandle, forwardRef} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Button,
} from "@chakra-ui/react"

// @ts-ignore
const DefaultModal = forwardRef(({children, size = 'md', isCentered=false}, ref) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const initialRef = React.useRef()

    let _header, _body, _footer, _button

    useImperativeHandle(
        ref,
        () => ({
            openModal(){
                onOpen();
            },
            closeModal(){
                onClose();
            }
        }),
    )

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
            <Modal
                isCentered={isCentered}
                initialFocusRef={initialRef}
                onClose={onClose}
                isOpen={isOpen}
                motionPreset="slideInBottom"
                size={size}
                scrollBehavior={'inside'}
            >
                <ModalOverlay/>
                <ModalContent>
                    {_header}
                    <ModalCloseButton/>
                    {_body}
                    <ModalFooter>
                        {_footer}
                        <Button ml={3} onClick={onClose}>Đóng</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
})

export default DefaultModal

const DefaultModalHeader = ({children}) => <ModalHeader>{children}</ModalHeader>
const DefaultModalBody = ({children}) => <ModalBody>{children}</ModalBody>
const DefaultModalFooter = ({children}) => <div>{children}</div>
const DefaultModalButton = ({children}) => <div>{children}</div>


DefaultModal.Header = DefaultModalHeader
DefaultModal.Body = DefaultModalBody
DefaultModal.Footer = DefaultModalFooter
DefaultModal.Button = DefaultModalButton