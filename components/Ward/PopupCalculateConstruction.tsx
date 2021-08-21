import DefaultModal from "../Modal/DefaultModal";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Select,
    Button, Input
} from "@chakra-ui/react"

const PopupCalculateConstruction = ({subtitle}) => {
    const onSubmit = async (e)=>{
        e.preventDefault();
    }
    return (
        <>
        <form onSubmit={onSubmit}>
            <DefaultModal size={'xl'}>
                <DefaultModal.Button>
                    <Button className={'mt-5'} variant="outline" size="sm" colorScheme="blue">
                        Tính giá công trình
                    </Button>
                </DefaultModal.Button>
                <DefaultModal.Header>Tính Giá Công Trình</DefaultModal.Header>
                <DefaultModal.Body>
                    <p>Tính giá công trình tại {subtitle}</p>
                        <FormControl mt={4}>
                            <FormLabel>Diện tích sàn</FormLabel>
                            <Input placeholder="Tổng diện tích sử dụng (m2)" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Loại công trình xây dựng</FormLabel>
                            <Select placeholder="Lựa chọn">
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </Select>
                        </FormControl>


                </DefaultModal.Body>
                <DefaultModal.Footer>
                    <Button
                        colorScheme="blue"
                        type="submit">
                        Submit
                    </Button>
                </DefaultModal.Footer>
            </DefaultModal>
        </form>
        </>
    )
}

export default PopupCalculateConstruction
