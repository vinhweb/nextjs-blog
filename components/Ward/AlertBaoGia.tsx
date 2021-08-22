import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,

    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
    useDisclosure
} from "@chakra-ui/react"
import React from "react";
import { getNumberWithCommas } from "../../utils/Utils";

const AlertBaoGia = ({subtitle, baogia})=> {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const {
        giaDat,
        tileDC,
        giadatTL,
        dientichDat,
        tonggiaQSD,
        tongSanXD,
        dongiaXD,
        chatluongConLai,
        giaCongTrinh,
        tongGiaBDS,
        sotienDcVay
    } = baogia


    return (
        <>
            <p onClick={onOpen} className={'mt-3 text-sm'}><a className={'text-indigo-600 font-semibold cursor-pointer'}>Nhận file tư vấn giá BĐS</a></p>

            <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Báo giá phần tích tư vấn</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        <p className={'mb-3'}>{subtitle}</p>
                        <Table className={'text-sm'} variant="striped" colorScheme="teal">
                            <Tbody>
                                <Tr>
                                    <Td>Giá đất/ Giá nhà</Td>
                                    <Td isNumeric>{getNumberWithCommas(giaDat)}đ</Td>
                                </Tr>
                                <Tr>
                                    <Td>Tỉ lệ điều chỉnh giá cộng gộp</Td>
                                    <Td isNumeric>{getNumberWithCommas(tileDC)}%</Td>
                                </Tr>
                                <Tr>
                                    <Td>Giá đất nhà nhân tỉ lệ</Td>
                                    <Td isNumeric>{getNumberWithCommas(giadatTL)}đ</Td>
                                </Tr>
                                <Tr>
                                    <Td>Số m2 đất</Td>
                                    <Td isNumeric>{getNumberWithCommas(dientichDat)}m</Td>
                                </Tr>
                                <Tr>
                                    <Td>Tổng giá QSD đất chuyên sâu</Td>
                                    <Td isNumeric>{getNumberWithCommas(tonggiaQSD)}đ</Td>
                                </Tr>
                                <Tr>
                                    <Td>Tổng diện tích sàn XD</Td>
                                    <Td isNumeric>{getNumberWithCommas(tongSanXD)}m</Td>
                                </Tr>
                                <Tr>
                                    <Td>Đơn giá XD</Td>
                                    <Td isNumeric>{getNumberWithCommas(dongiaXD)}đ</Td>
                                </Tr>
                                <Tr>
                                    <Td>Chất lượng công trình còn lại</Td>
                                    <Td isNumeric>{getNumberWithCommas(chatluongConLai)}%</Td>
                                </Tr>
                                <Tr>
                                    <Td>Giá công trình</Td>
                                    <Td isNumeric>{getNumberWithCommas(giaCongTrinh)}đ</Td>
                                </Tr>
                                <Tr>
                                    <Td>Tổng giá BDS (đất + công trình)</Td>
                                    <Td isNumeric>{getNumberWithCommas(tongGiaBDS)}đ</Td>
                                </Tr>
                                <Tr>
                                    <Td>Số tiền được vay (tỉ lệ vay 70%)</Td>
                                    <Td isNumeric>{getNumberWithCommas(sotienDcVay)}đ</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button colorScheme="blue" onClick={onClose} ml={3}>
                            Oke
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default AlertBaoGia