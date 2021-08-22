import DefaultModal from "../Modal/DefaultModal";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Select,
    Button, Input,
    Radio, RadioGroup, Stack
} from "@chakra-ui/react"
import React, {useEffect} from "react";
import _ from 'lodash';
import { getNumberWithCommas } from "../../utils/Utils";
import AlertBaoGia from "./AlertBaoGia";
import {any} from "prop-types";

const PopupCalculateAdvance = ({subtitle, averagePrice, openModal}) => {
    const [formStep, setFormStep] = React.useState(0)
    const [listConst, setListConst] = React.useState({
        loai_cong_trinh_xay_dung: [],
        loai_BDS: [],
        so_phap_ly: [],
        loai_duong: [],
        diem_manh: [],
        diem_yeu: [],
        duong_rong: [],
        ra_duong_lon_hon: [],
        gan_dia_diem_dep: [],
        loai_hem: [],
        hang_xom_dep: [],
        co_via_he: [],
        do_dep_nha: [],
        do_rong_mat_truoc: [],
        hoan_cong_trong_so: [],
        duoc_xay_dung: [],
        tiem_nang: [],
        cung_cau: [],
        lam_duoc: [],
    })

    useEffect(()=>{
        let listConst = []
        listConst = JSON.parse(localStorage.getItem('listConst'))

        setListConst({
            loai_cong_trinh_xay_dung: listConst.filter(item => item.type == 'loai_cong_trinh_xay_dung'),
            loai_BDS: listConst.filter(item => item.type == 'loai_BDS'),
            so_phap_ly: listConst.filter(item => item.type == 'so_phap_ly'),
            loai_duong: listConst.filter(item => item.type == 'loai_duong'),
            diem_manh: listConst.filter(item => item.type == 'diem_manh'),
            diem_yeu: listConst.filter(item => item.type == 'diem_yeu'),
            duong_rong: listConst.filter(item => item.type == 'duong_rong'),
            ra_duong_lon_hon: listConst.filter(item => item.type == 'ra_duong_lon_hon'),
            gan_dia_diem_dep: listConst.filter(item => item.type == 'gan_dia_diem_dep'),
            loai_hem: listConst.filter(item => item.type == 'loai_hem'),
            hang_xom_dep: listConst.filter(item => item.type == 'hang_xom_dep'),
            co_via_he: listConst.filter(item => item.type == 'co_via_he'),
            do_dep_nha: listConst.filter(item => item.type == 'do_dep_nha'),
            do_rong_mat_truoc: listConst.filter(item => item.type == 'do_rong_mat_truoc'),
            hoan_cong_trong_so: listConst.filter(item => item.type == 'hoan_cong_trong_so'),
            duoc_xay_dung: listConst.filter(item => item.type == 'duoc_xay_dung'),
            tiem_nang: listConst.filter(item => item.type == 'tiem_nang'),
            cung_cau: listConst.filter(item => item.type == 'cung_cau'),
            lam_duoc: listConst.filter(item => item.type == 'lam_duoc')
        })
    }, [])

    const [result, setResult] = React.useState(0);
    const [baogia, setBaogia] = React.useState({
        giaDat: 0,
        tileDC: 0,
        giadatTL: 0,
        dientichDat: 0,
        tonggiaQSD: 0,
        tongSanXD: 0,
        dongiaXD: 0,
        chatluongConLai: 0,
        giaCongTrinh: 0,
        tongGiaBDS: 0,
        sotienDcVay: 0,
    })

    const [formData, setFormData] = React.useState({
        dientichSan: any,
        constType: any,
        yearInUse: any,
        dientichDat: any,
        loai_BDS: any,
        so_phap_ly: any,
        loai_duong: any,
        diem_manh: any,
        diem_yeu: any,
        duong_rong: any,
        ra_duong_lon_hon: any,
        gan_dia_diem_dep: any,
        loai_hem: any,
        hang_xom_dep: any,
        co_via_he: any,
        do_dep_nha: any,
        do_rong_mat_truoc: any,
        hoan_cong_trong_so: any,
        duoc_xay_dung: any,
        tiem_nang: any,
        cung_cau: any,
        lam_duoc: any
    });
    const onHandleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = async (e)=>{
        e.preventDefault()

        setFormStep(1)
    }

    const onSubmit2 = async (e) => {
        e.preventDefault();

        // @ts-ignore
        let yearInUse = parseFloat(formData.yearInUse);
        if(yearInUse >= 1 && yearInUse <= 18){
            yearInUse = 100 - (5*yearInUse);
        }else{
            yearInUse = 10;
        }
        yearInUse = yearInUse/100

        let tangGiamPercent: any;
        tangGiamPercent =
            +formData.loai_BDS +
            +formData.so_phap_ly +
            +formData.loai_duong +
            +formData.diem_manh +
            +formData.diem_yeu +
            +formData.duong_rong +
            +formData.ra_duong_lon_hon +
            +formData.gan_dia_diem_dep +
            +formData.loai_hem +
            +formData.hang_xom_dep +
            +formData.co_via_he +
            +formData.do_dep_nha +
            +formData.do_rong_mat_truoc +
            +formData.hoan_cong_trong_so +
            +formData.duoc_xay_dung +
            +formData.tiem_nang +
            +formData.cung_cau +
            +formData.lam_duoc

        console.log(formData)
        console.log(tangGiamPercent)
        // @ts-ignore
        let result: number = (formData.dientichSan * formData.constType * yearInUse)*(100 + tangGiamPercent)/100

        setResult(result)

        let tonggiaQSD: number = averagePrice*(100 + tangGiamPercent)/100*formData.dientichDat
        let giaCongTrinh: number = formData.dientichSan * formData.constType * yearInUse
        setBaogia({
            giaDat: averagePrice,
            tileDC: (100 + tangGiamPercent),
            giadatTL: (averagePrice*(100 + tangGiamPercent)/100),
            dientichDat: formData.dientichDat,
            tonggiaQSD: tonggiaQSD,
            tongSanXD: formData.dientichSan,
            dongiaXD: formData.constType,
            chatluongConLai: (yearInUse * 100),
            giaCongTrinh: giaCongTrinh,
            tongGiaBDS: tonggiaQSD + giaCongTrinh,
            sotienDcVay: ((tonggiaQSD + giaCongTrinh) * 0.7),
        })

        console.log(baogia)
    }


    return (
        <>
            <DefaultModal
                openModal={openModal}
                isCentered={true}
                size={'xl'}>
                <DefaultModal.Header>Định giá chuyên sâu</DefaultModal.Header>
                <DefaultModal.Body>
                    <div>

                        <p>{subtitle}</p>

                        <form onSubmit={onSubmit} className={`text-sm ${(formStep !== 0) && 'hidden'}`}>
                            <div className={'grid grid-cols-2 gap-x-3'}>
                                <FormControl mt={4}>
                                    <FormLabel>Diện tích sàn</FormLabel>
                                    <Input isRequired={true} type={'number'} placeholder="Tổng diện tích sử dụng (m2)"
                                           name={'dientichSan'} onChange={e=>onHandleChange(e)} value={`${formData.dientichSan}`} />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Số m2 đất</FormLabel>
                                    <Input isRequired={true} type={'number'} placeholder="Số m2 đất"
                                           name={'dientichDat'} onChange={e=>onHandleChange(e)} value={`${formData.dientichDat}`} />
                                </FormControl>
                            </div>

                            <div className={'grid grid-cols-2 gap-x-3'}>
                                <FormControl className={'col-span-1'} mt={4}>
                                    <FormLabel>Loại công trình xây dựng</FormLabel>
                                    <Select isRequired={true} placeholder="Lựa chọn"
                                            name={'constType'} onChange={e=>onHandleChange(e)} value={`${formData.constType}`}>
                                        {listConst.loai_cong_trinh_xay_dung.map(item => (
                                            <option key={item.value} value={item.value}>{item.name}</option>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl className={''} mt={4}>
                                    <FormLabel>Chất lượng còn lại (số năm)</FormLabel>
                                    <Input isRequired={true} type={'number'}
                                           name={'yearInUse'} onChange={e=>onHandleChange(e)} value={`${formData.yearInUse}`}
                                           placeholder="1, 2... năm" />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Loại BĐS</FormLabel>
                                    <Select isRequired={true} placeholder="Lựa chọn"
                                            name={'loai_BDS'} onChange={e=>onHandleChange(e)} value={`${formData.loai_BDS}`}>
                                        {listConst.loai_BDS.map(item => (
                                            <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Sổ/ pháp lý</FormLabel>
                                    <Select isRequired={true} placeholder="Lựa chọn"
                                            name={'so_phap_ly'} onChange={e=>onHandleChange(e)} value={`${formData.so_phap_ly}`}>
                                        {listConst.so_phap_ly.map(item => (
                                            <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Loại đường</FormLabel>
                                    <Select isRequired={true} placeholder="Lựa chọn"
                                            name={'loai_duong'} onChange={e=>onHandleChange(e)} value={`${formData.loai_duong}`}>
                                        {listConst.loai_duong.map(item => (
                                            <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Điểm mạnh</FormLabel>
                                    <Select isRequired={true} placeholder="Lựa chọn"
                                            name={'diem_manh'} onChange={e=>onHandleChange(e)} value={`${formData.diem_manh}`}>
                                        {listConst.diem_manh.map(item => (
                                            <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Điểm yếu</FormLabel>
                                    <Select isRequired={true} placeholder="Lựa chọn"
                                            name={'diem_yeu'} onChange={e=>onHandleChange(e)} value={`${formData.diem_yeu}`}>
                                        {listConst.diem_yeu.map(item => (
                                            <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Đường rộng</FormLabel>
                                    <Select isRequired={true} placeholder="Lựa chọn"
                                            name={'duong_rong'} onChange={e=>onHandleChange(e)} value={`${formData.duong_rong}`}>
                                        {listConst.duong_rong.map(item => (
                                            <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Ra đường lớn hơn</FormLabel>
                                    <Select isRequired={true} placeholder="Lựa chọn"
                                            name={'ra_duong_lon_hon'} onChange={e=>onHandleChange(e)} value={`${formData.ra_duong_lon_hon}`}>
                                        {listConst.ra_duong_lon_hon.map(item => (
                                            <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Gần địa điểm đẹp</FormLabel>
                                    <Select isRequired={true} placeholder="Lựa chọn"
                                            name={'gan_dia_diem_dep'} onChange={e=>onHandleChange(e)} value={`${formData.gan_dia_diem_dep}`}>
                                        {listConst.gan_dia_diem_dep.map(item => (
                                            <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                        ))}
                                    </Select>
                                </FormControl>

                                <div></div>
                                <Button
                                    type={'submit'}
                                    className={'mt-5'} variant="outline" colorScheme="blue">
                                    Tiếp
                                </Button>
                            </div>
                        </form>

                        <form onSubmit={onSubmit2} className={`grid grid-cols-2 gap-x-3 text-sm ${(formStep === 0) && 'hidden'}`}>
                            <FormControl mt={4}>
                                <FormLabel>Loại Hẻm/ Nhánh Hẻm</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'loai_hem'} onChange={e=>onHandleChange(e)} value={`${formData.loai_hem}`}>
                                    {listConst.loai_hem.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Hàng xóm đẹp</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'hang_xom_dep'} onChange={e=>onHandleChange(e)} value={`${formData.hang_xom_dep}`}>
                                    {listConst.hang_xom_dep.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Có vỉa hè</FormLabel>
                                <RadioGroup isRequired={true} onChange={e=>setFormData({...formData, co_via_he: parseInt(e)})} value={`${formData.co_via_he}`}>
                                    <Stack direction="row">
                                        {listConst.co_via_he.map(item => (
                                            <Radio key={item.name} value={`${item.tang_giam_gia}`}>{item.name}</Radio>
                                        ))}
                                    </Stack>
                                </RadioGroup>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Độ đẹp nhà</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'do_dep_nha'} onChange={e=>onHandleChange(e)} value={`${formData.do_dep_nha}`}>
                                    {listConst.do_dep_nha.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Độ rộng mặt trước nhà/đất</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'do_rong_mat_truoc'} onChange={e=>onHandleChange(e)} value={`${formData.do_rong_mat_truoc}`}>
                                    {listConst.do_rong_mat_truoc.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Hoàn công trong số</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'hoan_cong_trong_so'} onChange={e=>onHandleChange(e)} value={`${formData.hoan_cong_trong_so}`}>
                                    {listConst.hoan_cong_trong_so.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Được xây dựng</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'duoc_xay_dung'} onChange={e=>onHandleChange(e)} value={`${formData.duoc_xay_dung}`}>
                                    {listConst.duoc_xay_dung.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Tiềm năng</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'tiem_nang'} onChange={e=>onHandleChange(e)} value={`${formData.tiem_nang}`}>
                                    {listConst.tiem_nang.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Cung cầu</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'cung_cau'} onChange={e=>onHandleChange(e)} value={`${formData.cung_cau}`}>
                                    {listConst.cung_cau.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Làm được</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'lam_duoc'} onChange={e=>onHandleChange(e)} value={`${formData.lam_duoc}`}>
                                    {listConst.lam_duoc.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <Button
                                onClick={()=>setFormStep(0)}
                                className={'mt-5 mr-3'} variant="outline" colorScheme="blue">
                                Quay lại
                            </Button>
                            <Button
                                className={'mt-5'} colorScheme="blue"
                                type="submit">
                                Tính giá
                            </Button>
                        </form>


                        {result > 0 && (formStep !== 0) && (
                        <div className={''}>
                            <hr className={'mt-4'}/>
                            <AlertBaoGia baogia={baogia} subtitle={subtitle}/>

                            <div>
                                <FormControl mt={4}>
                                    <FormLabel>Giá trị Bất động sản được tư vấn chuyên sâu là:</FormLabel>
                                    <h4 className={'text-lg font-semibold'}>{getNumberWithCommas(result)} đ</h4>
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
                    </div>
                </DefaultModal.Body>
                <DefaultModal.Footer>
                </DefaultModal.Footer>
            </DefaultModal>
        </>
    )
}

export default PopupCalculateAdvance
