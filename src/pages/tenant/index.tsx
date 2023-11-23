import { Tenant, TenantInfo } from "@/api/interface/home";
import { fetchTenantList } from "@/api/modules/home";
import { TENANT_ACCOUNT_LABEL, TENANT_SOURCE, TENANT_USER_TYPE } from "@/constants/tenant";
import { useTableList } from "@/hooks/useFormList";
import { Button, Pagination, Table, Tooltip } from "antd"
import type { ColumnsType } from 'antd/es/table';

import './index.less'
import { ChangeEvent } from "react";
import { getElements } from "@/ui/helper";
import { FormItemMixture } from "@/ui/interface";
import { inputInfo, optionList, selectInfo } from "./Test";
import { BSSearch } from "@/business/Search";

type GetKeys<T> = {
    [K in keyof T]: K
}

const TENANT_PROPS: GetKeys<TenantInfo> = {
    'tenantId': 'tenantId',
    'accountType': 'accountType',
    'source': 'source',
    'userMobile': 'userMobile',
    'createTime': 'createTime',
    'updateTime': 'updateTime',
    'notes': 'notes'
}

const fieldList: FormItemMixture[] = [
    inputInfo,
    selectInfo,
    {
        type: 'select',
        itemProps: {
            name: 'custom_select2',
            label: 'SELECT',
            rules: [{ required: true, message: 'select...' }]
        },
        elementProps: {
            options: optionList
        }
    } as FormItemMixture<'select'>
]

export const TenantPage = () => {
    const { tableData, tableParams, setTableParams } = useTableList<Partial<Tenant.ReqParams>, typeof fetchTenantList>({
        pageNo: 1,
        pageSize: 10
    }, fetchTenantList)

    console.log('tableData: ', tableData)

    // 操作
    const operationContent = (tenant: TenantInfo): JSX.Element => {
        return (
            <>
                <Button>编辑1</Button>
                <Button>编辑2</Button>
                <Button>编辑3</Button>
            </>
        )
    }

    const columns: ColumnsType<TenantInfo[]> = [
        {
            key: TENANT_PROPS.tenantId,
            title: '用户Id',
            align: 'center',
            render: ({ tenantId }: TenantInfo) => (
                <Tooltip title={tenantId}>
                    <span>{tenantId}</span>
                </Tooltip>
            )
        },
        {
            key: 'tenantName',
            title: '用户名称',
            align: 'center',
            render: ({ accountType, personName, enterpriseName }: TenantInfo) => {
                const tenantName = accountType === TENANT_USER_TYPE.PERSON ? personName : enterpriseName
                return (
                    <Tooltip title={tenantName}>
                        <span>{tenantName}</span>
                    </Tooltip>
                )
            }
        },
        {
            key: 'accountType',
            title: '账号类型',
            align: 'center',
            render: ({ accountType }: TenantInfo) => {
                const selectItem = TENANT_ACCOUNT_LABEL.find(item => item.TENANT_TYPE === accountType)
                const displayName = selectItem?.TENANT_ACCOUNT ?? '--'
                return (
                    <Tooltip title={displayName}>
                        <span>{displayName}</span>
                    </Tooltip>
                )
            }
        },
        {
            key: TENANT_PROPS.source,
            title: '来源',
            align: 'center',
            render: ({ source }: TenantInfo) => {
                const selectedItem = TENANT_SOURCE.find(item => item.SOURCE_TYPE === source)
                const displayName = selectedItem?.PLATFORM ?? '--'
                return (
                    <Tooltip title={displayName}>
                        <span>{displayName}</span>
                    </Tooltip>
                )
            }
        },
        {
            key: 'operation',
            title: '操作',
            width: 240,
            render: (tenant: TenantInfo) => {
                return operationContent(tenant)
            }
        }
    ]

    // 页脚
    const onShowTotal = (total: number) => {
        return `Total ${total} items`
    }

    // page | pageSize 回调
    const onPageOrSizeChange = (page: number, pageSize: number) => {
        setTableParams({
            ...tableParams,
            pageNo: page,
            pageSize
        })
    }

    // single search input change
    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
    }

    // query the single search results
    const onSearch = (value: string, _e, info?: any) => {
        console.log('search content: ', value, info?.source)
    }
    // query form search results
    const formSearch = (values: any) => {
        console.log('search content: ', values)
        setTableParams({

        })
    }
    // form search reset
    const formSearchReset = () => {
        setTableParams({
            ...tableParams,
            pageNo: 1,
            pageSize: 10
        })
    }

    // 新增
    const addNewItems = () => {

    }

    return (
        <div className="tenant-container">
            <BSSearch
                addNewItems={addNewItems}
                singleSearch={{
                    onChange: onSearchChange,
                    onSearch: onSearch,
                    style: { width: 300 }
                }}
                advancedSearch={{
                    onSearch: formSearch,
                    onReset: formSearchReset,
                    getFields: getElements(fieldList)
                }}
            />
            <Table
                rowKey={TENANT_PROPS.tenantId}
                columns={columns}
                dataSource={tableData.list}
                scroll={{ x: true, y: 570 }}
                pagination={false}
            />

            <Pagination
                total={tableData.total}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => onShowTotal(total)}
                onChange={onPageOrSizeChange}
                style={{ textAlign: 'center' }}
            />
        </div>
    )
}