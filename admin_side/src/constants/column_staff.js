import GenerateContract from '~/pages/StaffPage/components/GenerateContract';
// import ConfirmContract from '~/pages/StaffPage/components/ConfirmContract';
const COLUMNS_CONTRACT = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),

    }, {
        title: 'Tax code',
        dataIndex: 'taxcode',
        key: 'taxcode',
        sorter: (a, b) => a.taxcode.localeCompare(b.taxcode),

    },
    {
        title: 'Quatity of branch',
        dataIndex: 'quantity',
        key: 'quantity',
        sorter: (a, b) => a.quantity.localeCompare(b.quantity),

    },
    {
        title: 'Representative',
        dataIndex: 'representative',
        key: 'representative',
        sorter: (a, b) => a.representative.localeCompare(b.representative),

    },
    {
        title: 'Bank Account',
        dataIndex: 'bank',
        key: 'bank',
    },
    {
        title: 'Culinary Style',
        dataIndex: 'culinaryStyle',
        key: 'culinaryStyle',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'createdAt',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'confirmedAt',
        dataIndex: 'confirmedAt',
        key: 'confirmedAt',
    },
    {
        title: 'Expiration date',
        dataIndex: 'expiration_date',
        key: 'expiration_date',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => GenerateContract(record)
    },

];

export { COLUMNS_CONTRACT };
