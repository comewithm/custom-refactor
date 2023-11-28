import { TENANT_PROPS, TENANT_SEARCH_IDS, Tenant, TenantInfo, TenantSearch } from "@/api/interface/tenant";
import { fetchTenantList } from "@/api/modules/tenant";
import { TENANT_ACCOUNT_LABEL, TENANT_SOURCE, TENANT_USER_TYPE } from "@/constants/tenant";
import { useTableList } from "@/hooks/useFormList";
import { Button, Form, Pagination, Space, Table, Tooltip } from "antd"
import type { ColumnsType } from 'antd/es/table';

import './index.less'
import { ChangeEvent, useState } from "react";
import { FormItemMixture } from "@/ui/interface";
import { BSSearch } from "@/business/Search";
import { TenantModal } from "./tenantModal";

export const TenantPage = () => {

    const [form] = Form.useForm()

    const { tableData, tableParams, setTableParams } = useTableList<Partial<Tenant.ReqParams>, typeof fetchTenantList>({
        pageNo: 1,
        pageSize: 10
    }, fetchTenantList)

    console.log('tableData: ', tableData)

    const [visible, setVisible] = useState(false)
    const [editInfo, setEditInfo] = useState<TenantInfo>({})

    // table 配置
    const columns: ColumnsType<TenantInfo[]> = [
        {
            key: TENANT_PROPS.tenantId,
            title: '用户Id',
            align: 'center',
            render: ({ tenantId }: TenantInfo) => (
                <Tooltip title={tenantId}>
                    <div>{tenantId}</div>
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
                        <div>{tenantName}</div>
                    </Tooltip>
                )
            }
        },
        {
            key: TENANT_PROPS.accountType,
            title: '账号类型',
            align: 'center',
            render: ({ accountType }: TenantInfo) => {
                const selectItem = TENANT_ACCOUNT_LABEL.find(item => item.value === accountType)
                const displayName = selectItem?.label ?? '--'
                return (
                    <Tooltip title={displayName}>
                        <div>{displayName}</div>
                    </Tooltip>
                )
            }
        },
        {
            key: TENANT_PROPS.source,
            title: '来源',
            align: 'center',
            render: ({ source }: TenantInfo) => {
                const selectedItem = TENANT_SOURCE.find(item => item.value === source)
                const displayName = selectedItem?.label ?? '--'
                return (
                    <Tooltip title={displayName}>
                        <div>{displayName}</div>
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

    // search option list
    const searchOptionList: FormItemMixture[] = [
        {
            type: 'input',
            itemProps: {
                name: TENANT_SEARCH_IDS.tenantIdSearch
            },
            elementProps: {
                placeholder: '租户id'
            }
        } as FormItemMixture<'input'>,
        {
            type: 'input',
            itemProps: {
                name: TENANT_SEARCH_IDS.tenantNameSearch
            },
            elementProps: {
                placeholder: '租户名称'
            }
        } as FormItemMixture<'input'>,
        {
            type: 'input',
            itemProps: {
                name: TENANT_SEARCH_IDS.userMobileSearch
            },
            elementProps: {
                placeholder: '手机号'
            }
        } as FormItemMixture<'input'>,
        {
            type: 'select',
            itemProps: {
                name: TENANT_SEARCH_IDS.accountTypeSearch
            },
            elementProps: {
                placeholder: '账号类型',
                options: TENANT_ACCOUNT_LABEL
            }
        } as FormItemMixture<'select'>,
        {
            type: 'rangePicker',
            itemProps: {
                name: TENANT_SEARCH_IDS.createTimeSearch
            },
            elementProps: {
                format: ['YYYY-MM-DD', 'YYYY-MM-DD'],
                placeholder: ['开始时间', '结束时间']
            }
        } as FormItemMixture<'rangePicker'>,
        {
            type: 'select',
            itemProps: {
                name: TENANT_SEARCH_IDS.sourceSearch
            },
            elementProps: {
                placeholder: '来源',
                options: TENANT_SOURCE
            }
        } as FormItemMixture<'select'>,
        {
            type: 'input',
            itemProps: {
                name: TENANT_SEARCH_IDS.notesSearch
            },
            elementProps: {
                placeholder: '备注'
            }
        } as FormItemMixture<'input'>
    ]

    // single search input change
    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
    }
    // query the single search results
    const onSearch = (value: string, _e, info?: any) => {
        console.log('single search content: ', value, info?.source)
        setTableParams({
            ...tableParams,
            pageNo: 1,
            searchName: value.trim()
        })
    }
    // query form search results
    const formSearch = (values: TenantSearch) => {
        console.log('search content: ', values)
        const {
            tenantIdSearch,
            tenantNameSearch,
            userMobileSearch,
            accountTypeSearch,
            sourceSearch,
            createTimeSearch = [],
            notesSearch
        } = values
        const [startTime, endTime] = createTimeSearch
        setTableParams({
            ...tableParams,
            pageNo: 1,
            tenantId: tenantIdSearch,
            name: tenantNameSearch,
            userMobile: userMobileSearch,
            accountType: accountTypeSearch,
            source: sourceSearch,
            notes: notesSearch,
            startTime: startTime ?? '',
            endTime: endTime ?? ''
        })
    }
    // form search reset
    const formSearchReset = () => {
        setTableParams({
            pageNo: 1,
            pageSize: 10
        })
    }

    // 操作
    const operationContent = (tenant: TenantInfo): JSX.Element => {
        return (
            <>
                <Space>
                    <Button type={'primary'} onClick={() => onEditModal(tenant)}>编辑</Button>
                    <Button>编辑2</Button>
                    <Button>编辑3</Button>
                </Space>
            </>
        )
    }

    // edit
    const onEditModal = (info: TenantInfo) => {
        setEditInfo(info)
        setVisible(true)
    }

    // add
    const addNewItems = () => {
        setEditInfo({})
        setVisible(true)
    }

    const onModalConfirm = () => {

        // close modal
        onModalCancel()
    }

    const onModalCancel = () => {
        setVisible(false)
    }

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

    return (
        <div className="tenant-container">
            <div>
                <BSSearch
                    addNewItems={addNewItems}
                    singleSearch={{
                        placeholder: '租户名称/手机号',
                        allowClear: true,
                        onChange: onSearchChange,
                        onSearch: onSearch,
                        style: { width: 300 }
                    }}
                    advancedSearch={{
                        form: form,
                        formProps: {
                            layout: 'horizontal'
                        },
                        onSearch: formSearch,
                        onReset: formSearchReset,
                        getFields: searchOptionList
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

            <TenantModal
                visible={visible}
                editModalInfo={editInfo}
                onModalConfirm={onModalConfirm}
                onModalCancel={onModalCancel}
            />
        </div>
    )
}