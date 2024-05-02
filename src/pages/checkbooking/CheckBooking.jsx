
import { Tabs } from 'antd';
import Approved from './Approved';
import Pending from './Pending';
import Rejected from './Rejected';
import Success from './Success';

const items = [
    {
        key: '1',
        label: 'รายการการจองรออนุมัติ',
        children: <Pending />
    },
    {
        key: '2',
        label: 'รายการการจองถูกอนุมัติ',
        children: <Approved />
    },
    {
        key: '3',
        label: 'รายการการจองถูกปฏิเสธ',
        children: <Rejected />
    },
    {
        key: '4',
        label: 'รายการสอนสำเร็จ',
        children: <Success />
    }
]


function CheckBooking() {
    return (
        <div>
            <div className='mx-32 mt-16 mb-32 '>
                <Tabs defaultActiveKey="1" items={items}  />
            </div>
        </div>
    );
}

export default CheckBooking