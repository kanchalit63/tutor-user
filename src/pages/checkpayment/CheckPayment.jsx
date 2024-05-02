import { Tabs } from 'antd';
import PendingPayment from './PendingPayment';

const CheckPayment = () => {

    const items = [
        {
            key: '1',
            label: 'รายการชำระเงิน',
            children: <PendingPayment />
        },
    ]


    return (
        <div>
            <div className='mx-32 mt-16 mb-32 '>
                <Tabs defaultActiveKey="1" items={items}  />
            </div>
        </div>
    )
}

export default CheckPayment