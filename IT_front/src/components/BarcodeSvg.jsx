import { useBarcode } from '@createnextapp/react-barcode';
import React from 'react'

const BarcodeSvg = ({serialNum}) => {
    const { inputRef } = useBarcode({
        value: serialNum,
        options: {
            background: '#ffffff',
            fontSize: 10,
            fontOptions: 'bold',
            width: 1,
            height: 30
        }
    });
  return (
    <td className='d-flex justify-content-center align-items-center'><svg ref={inputRef } /></td>
  )
}

export default BarcodeSvg