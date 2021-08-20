import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Box
} from "@chakra-ui/react"
import {useState} from "react";
import {numberWithCommas} from "../../utils/Utils";

const WardSlider = ({averagePrice = 0}) => {
    const [area, setArea] = useState({
        value: 0,
        price: 0
    });

    const calculatePrice = (val)=>{
        let price: any;
        price = numberWithCommas(val * averagePrice);

        setArea({
            value: val,
            price: price
        })
    }

    return (
        <>
            <div className={'text-center'}>
                <div className={'my-3'}>
                    <h3 className="font-semibold mb-2 text-2xl">Định giá đất Sơ Bộ</h3>
                    <p className={'text-gray-500'}>Kéo số m² để Định giá đất sơ bộ nhanh</p>
                </div>
                <div className={'flex'}>
                    <span className={'whitespace-nowrap text-sm px-2 mr-3'}>25m²</span>
                    <Slider defaultValue={25} min={0} max={500} step={25}  onChange={(val) => calculatePrice(val)}>
                        <SliderTrack >
                            <Box position="relative" right={10} />
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb boxSize={6} />
                    </Slider>
                    <span className={'whitespace-nowrap text-sm px-2 ml-3'}>500m²</span>
                </div>

                <Box className={'mt-4'}>
                    <div className={'text-gray-500'}>Giá đất sơ bộ nhanh cho {area.value}m² là</div>
                    <div className={'text-lg font-semibold'}>{area.price} đ</div>
                </Box>
            </div>
        </>
    )
}

export default WardSlider;