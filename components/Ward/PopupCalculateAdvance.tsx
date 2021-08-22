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

    const [formData, setFormData] = React.useState({
        totalArea: 0,
        constType: 0,
        yearInUse: 0,
        loai_BDS: 0,
        so_phap_ly: 0,
        loai_duong: 0,
        diem_manh: 0,
        diem_yeu: 0,
        duong_rong: 0,
        ra_duong_lon_hon: 0,
        gan_dia_diem_dep: 0,
        loai_hem: 0,
        hang_xom_dep: 0,
        co_via_he: 0,
        do_dep_nha: 0,
        do_rong_mat_truoc: 0,
        hoan_cong_trong_so: 0,
        duoc_xay_dung: 0,
        tiem_nang: 0,
        cung_cau: 0,
        lam_duoc: 0
    });
    const onHandleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = async (e)=>{
        e.preventDefault()

        let yearInUse = formData.yearInUse;
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
        let result: number = (formData.totalArea * formData.constType * yearInUse)*(100 + tangGiamPercent)/100

        setResult(result)
    }
    return (
        <>
            <DefaultModal
                openModal={openModal}
                isCentered={true}
                size={'xl'}>
                <DefaultModal.Header>Định giá chuyên sâu</DefaultModal.Header>
                <DefaultModal.Body>
                    <form onSubmit={onSubmit}>

                        <p>{subtitle}</p>

                        <div className={`grid grid-cols-2 gap-x-3 text-sm ${(formStep !== 0) && 'hidden'}`}>
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

                            <FormControl mt={4}>
                                <FormLabel>Loại công trình xây dựng</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'constType'} onChange={e=>onHandleChange(e)} value={formData.constType}>
                                    {listConst.loai_cong_trinh_xay_dung.map(item => (
                                        <option key={item.value} value={item.value}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Loại BĐS</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'loai_BDS'} onChange={e=>onHandleChange(e)} value={formData.loai_BDS}>
                                    {listConst.loai_BDS.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Sổ/ pháp lý</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'so_phap_ly'} onChange={e=>onHandleChange(e)} value={formData.so_phap_ly}>
                                    {listConst.so_phap_ly.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Loại đường</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'loai_duong'} onChange={e=>onHandleChange(e)} value={formData.loai_duong}>
                                    {listConst.loai_duong.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Điểm mạnh</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'diem_manh'} onChange={e=>onHandleChange(e)} value={formData.diem_manh}>
                                    {listConst.diem_manh.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Điểm yếu</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'diem_yeu'} onChange={e=>onHandleChange(e)} value={formData.diem_yeu}>
                                    {listConst.diem_yeu.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Đường rộng</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'duong_rong'} onChange={e=>onHandleChange(e)} value={formData.duong_rong}>
                                    {listConst.duong_rong.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Ra đường lớn hơn</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'ra_duong_lon_hon'} onChange={e=>onHandleChange(e)} value={formData.ra_duong_lon_hon}>
                                    {listConst.ra_duong_lon_hon.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Gần địa điểm đẹp</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'gan_dia_diem_dep'} onChange={e=>onHandleChange(e)} value={formData.gan_dia_diem_dep}>
                                    {listConst.gan_dia_diem_dep.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Loại Hẻm/ Nhánh Hẻm</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'loai_hem'} onChange={e=>onHandleChange(e)} value={formData.loai_hem}>
                                    {listConst.loai_hem.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <div className={`grid grid-cols-2 gap-x-3 text-sm ${(formStep === 0) && 'hidden'}`}>
                            <FormControl mt={4}>
                                <FormLabel>Hàng xóm đẹp</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'hang_xom_dep'} onChange={e=>onHandleChange(e)} value={formData.hang_xom_dep}>
                                    {listConst.hang_xom_dep.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Có vỉa hè</FormLabel>
                                <RadioGroup onChange={e=>setFormData({...formData, co_via_he: parseInt(e)})} value={`${formData.co_via_he}`}>
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
                                        name={'do_dep_nha'} onChange={e=>onHandleChange(e)} value={formData.do_dep_nha}>
                                    {listConst.do_dep_nha.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Độ rộng mặt trước nhà/đất</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'do_rong_mat_truoc'} onChange={e=>onHandleChange(e)} value={formData.do_rong_mat_truoc}>
                                    {listConst.do_rong_mat_truoc.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Hoàn công trong số</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'hoan_cong_trong_so'} onChange={e=>onHandleChange(e)} value={formData.hoan_cong_trong_so}>
                                    {listConst.hoan_cong_trong_so.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Được xây dựng</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'duoc_xay_dung'} onChange={e=>onHandleChange(e)} value={formData.duoc_xay_dung}>
                                    {listConst.duoc_xay_dung.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Tiềm năng</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'tiem_nang'} onChange={e=>onHandleChange(e)} value={formData.tiem_nang}>
                                    {listConst.tiem_nang.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Cung cầu</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'cung_cau'} onChange={e=>onHandleChange(e)} value={formData.cung_cau}>
                                    {listConst.cung_cau.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Làm được</FormLabel>
                                <Select isRequired={true} placeholder="Lựa chọn"
                                        name={'lam_duoc'} onChange={e=>onHandleChange(e)} value={formData.lam_duoc}>
                                    {listConst.lam_duoc.map(item => (
                                        <option key={item.name} value={item.tang_giam_gia}>{item.name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <div className="flex justify-between items-center">
                            {formStep === 0 ? (
                                <>
                                    <Button
                                        onClick={()=>setFormStep(1)}
                                        className={'mt-5'} variant="outline" colorScheme="blue">
                                        Tiếp
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <div>
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
                                    </div>

                                    <p className={'mt-3 text-sm lg:text-right'}><a className={'text-indigo-600 font-semibold'} href="">Nhận file tư vấn giá BĐS</a></p>
                                </>
                            )}
                        </div>


                        {result > 0 && (
                        <div className={''}>
                            <hr className={'mt-4'}/>
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
                    </form>
                </DefaultModal.Body>
                <DefaultModal.Footer>
                </DefaultModal.Footer>
            </DefaultModal>
        </>
    )
}

export default PopupCalculateAdvance
