import { Tenant, TenantInfo } from "@/api/interface/home";
import { fetchTenantList } from "@/api/modules/home";
import { TENANT_TYPE } from "@/constants/tenant";
import { useTableList } from "@/hooks/useFormList";
import { Table, Tooltip } from "antd"
import type { ColumnsType } from 'antd/es/table';

export const TenantPage = () => {

    const {tableData} = useTableList<Partial<Tenant.ReqParams>, typeof fetchTenantList>({
        pageNo: 1,
        pageSize: 10
    }, fetchTenantList)

    console.log('tableData: ', tableData)

    const columns: ColumnsType<TenantInfo[]> = [
        {
            key: 'tenantId',
            title: '用户Id',
            align: 'center',
            render: ({tenantId}) => (
                <Tooltip title={tenantId}>
                    <span>{tenantId}</span>
                </Tooltip>
            )
        },
        {
            key: 'tenantName',
            title: '用户名称',
            align: 'center',
            render: ({accountType, personName, enterpriseName}) => {
                const tenantName = accountType === TENANT_TYPE.PERSON ? personName : enterpriseName
                return (
                    <Tooltip title={tenantName}>
                        <span>{tenantName}</span>
                    </Tooltip>
                )
            }
        }
    ]

    return (
        <Table
            columns={columns}
            dataSource={tableData.list}
        />
    )
}