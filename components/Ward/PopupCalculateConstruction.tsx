import DefaultModal from "../Modal/DefaultModal";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Select,
    Button, Input
} from "@chakra-ui/react"
import React, {useEffect, useRef} from "react";
import { getNumberWithCommas } from "../../utils/Utils";

const PopupCalculateConstruction = ({subtitle, averagePrice, openModal, openRelated}) => {
    const constRef = useRef();
    const [loaiCongTrinh, setLoaiCongTrinh] = React.useState([])

    useEffect(()=>{
        let listConst = []
        listConst = JSON.parse(localStorage.getItem('listConst'))
        setLoaiCongTrinh(listConst.filter(item => item.type == 'loai_cong_trinh_xay_dung'))
    }, [])

    const onOpenModal = () => {
        constRef.current.openModal()
    }

    useEffect(()=>{
        if (openModal > 0){
            onOpenModal()
        }
    }, [openModal])


    const [result, setResult] = React.useState({
        giaCongTrinh: 0,
        giaSoBo: 0
    });

    const [formData, setFormData] = React.useState({
        totalArea: 0,
        constType: 0,
        yearInUse: 0,
    });
    const onHandleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async (e)=>{
        e.preventDefault()

        let yearInUse = formData.yearInUse;
        if(yearInUse >= 1 && yearInUse <= 18){
            yearInUse = 100 - (5*yearInUse);
        }else{
            yearInUse = 10;
        }
        yearInUse = yearInUse/100

        setResult({
            giaCongTrinh: formData.totalArea * formData.constType * yearInUse,
            giaSoBo: formData.totalArea * averagePrice
        })
    }
    return (
        <>
            <DefaultModal
                ref={constRef}
                size={'xl'}>
                <DefaultModal.Header>Tính Giá Công Trình</DefaultModal.Header>
                <DefaultModal.Body>
                    <form onSubmit={onSubmit}>

                        <p>Tính giá công trình tại {subtitle}</p>

                        <div className="lg:flex lg:space-x-3">
                            <FormControl mt={4}>
                                <FormLabel>Diện tích sàn</FormLabel>
                                <Input isRequired={true} type={'number'} placeholder="Tổng diện tích sử dụng (m2)"
                                       name={'totalArea'} onChange={e=>onHandleChange(e)} value={formData.totalArea} />
                            </FormControl>

                            <FormControl className={''} mt={4}>
                                <FormLabel>Chất lượng còn lại (số năm)</FormLabel>
                                <Input isRequired={true} type={'number'}
                                       name={'yearInUse'} onChange={e=>onHandleChange(e)} value={formData.yearInUse}
                                       placeholder="1, 2... năm" />
                            </FormControl>
                        </div>

                        <FormControl mt={4}>
                            <FormLabel>Loại công trình xây dựng</FormLabel>
                            <Select isRequired={true} placeholder="Lựa chọn"
                                    name={'constType'} onChange={e=>onHandleChange(e)} value={formData.constType}>
                                {loaiCongTrinh.map(item => (
                                    <option key={item.value} value={parseInt(item.value)}>{item.name}</option>
                                ))}
                            </Select>
                        </FormControl>


                        <Button
                            className={'mt-5'} variant="outline" size="sm" colorScheme="blue"
                            type="submit">
                            Tính giá
                        </Button>

                        {result.giaCongTrinh > 0 && (
                        <div className={''}>
                            <hr className={'mt-4'}/>
                                <div>
                                    <FormControl mt={4}>
                                        <FormLabel>Giá của công trình xây dựng tạm tính:</FormLabel>
                                        <h4 className={'text-lg font-semibold'}>{getNumberWithCommas(result.giaCongTrinh)} đ</h4>
                                    </FormControl>

                                    <FormControl mt={4}>
                                        <FormLabel>Tổng giá sơ bộ của Bất động sản bao gồm QSD Đất và công trình xây dựng:</FormLabel>
                                        <h4 className={'text-lg font-semibold'}>{getNumberWithCommas(result.giaCongTrinh + result.giaSoBo)} đ</h4>
                                    </FormControl>
                                </div>

                            <div className={'my-2'}>
                                <ul className={'text-gray-600 italic text-xs list-disc list-inside my-1 space-y-1 space-y-1'}>
                                    <li>Giá trị được sơ bộ tính tự động bởi ThamDinhGiaAV.com</li>
                                    <li>Ghi rõ nguồn nếu phát hành, chúng tôi không chịu trách nhiệm về nội dung này khi chưa được Thẩm định giá chính thức</li>
                                </ul>
                            </div>
                        </div>
                        )}

                        <p className={'mt-3 text-sm'}>Cần chính xác hơn? Tiếp tục <a onClick={()=>openRelated()} className={'text-indigo-600 cursor-pointer font-semibold'} >Định giá chuyên sâu</a></p>

                    </form>
                </DefaultModal.Body>
                <DefaultModal.Footer>
                </DefaultModal.Footer>
            </DefaultModal>
        </>
    )
}

export default PopupCalculateConstruction
