import { Button, Form, Pagination, Popover, Space, Table, Tooltip } from "antd"
import { ChangeEvent, useState } from "react";
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from "antd/es/table/interface";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { fetchTenantList } from "@/api/modules/tenant";
import { TENANT_PROPS, TENANT_SEARCH_IDS, Tenant, TenantInfo, TenantSearch } from "@/api/interface/tenant";
import { TENANT_ACCOUNT_LABEL, TENANT_SOURCE, TENANT_USER_TYPE } from "@/constants/tenant";
import { useTableList } from "@/hooks/useFormList";

import { FormItemMixture } from "@/ui/interface";
import { UICheckbox } from "@/ui/modules/Checkbox";
import { BSSearch } from "@/business/Search";
import { ColumnHeader, ExportByExcelJS } from "@/business/Excel";
import { TenantModal } from "./tenantModal";
import './index.less'

/**
 * 关于导出字段过滤，是否需要在Table中显示出相关字段
 * 但对于不在checkList中的字段是否需要过滤掉(如用户名称tenantName，操作operation)
 * 默认应该是显示操作operation的
 */

export const TenantPage = () => {

    const [form] = Form.useForm()

    const { tableData, tableParams, setTableParams } = useTableList<Partial<Tenant.ReqParams>, typeof fetchTenantList>({
        pageNo: 1,
        pageSize: 10
    }, fetchTenantList)

    console.log('tableData: ', tableData)

    const [visible, setVisible] = useState(false)
    const [editInfo, setEditInfo] = useState<TenantInfo>({})

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [selectedData, setSelectedData] = useState<TenantInfo[]>([])

    const checkOptions = [
        TENANT_PROPS.tenantId!,
        'tenantName',
        TENANT_PROPS.accountType!,
        TENANT_PROPS.source!,
    ]
    const [checkList, setCheckList] = useState<CheckboxValueType[]>(checkOptions)
    
    // table 配置
    const columns: ColumnsType<TenantInfo> = [
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

    const filterColumns = () => {
        return columns.filter(c => {
            if(c.key !== 'operation') {
                return checkList.includes(c?.key as CheckboxValueType)
            }
            return true
        })
    }

    const onSelectChange = (selectedKeys: React.Key[]) => {
        setSelectedRowKeys(selectedKeys)
        const values = tableData.list.filter(item => selectedKeys.includes(item.tenantId as React.Key))
        setSelectedData(values)
    }
    // row keys
    const tableRowSelection: TableRowSelection<TenantInfo> = {
        selectedRowKeys,
        onChange: onSelectChange
    }

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
        setSelectedRowKeys([])
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

    const checkListChange = (checkedValue: CheckboxValueType[]) => {
        setCheckList(checkedValue)
    }
    // excel headers
    const getExcelHeaders = () => {
        // 需要一个key和title的映射
        return checkList.map(c => {
            return {
                key: c,
                title: `${c}_title`
            } as ColumnHeader
        })
    }
    const onExportSuccess = () => {
        setSelectedRowKeys([])
        setSelectedData([])
        setCheckList(checkOptions)
        console.log('export success')
    }
    // 插入在Search中的按钮
    const insertNodes = (
        <Space>
            <Button onClick={addNewItems} type={'primary'}>新增</Button>
        </Space>
    )

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
                    insertNodes={insertNodes}
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
                <div className="export-data">
                    <Space>
                        <ExportByExcelJS
                            data={selectedData}
                            fileName={'download'} 
                            // columns={['用户Id', '用户名称', '账号类型', '来源']}
                            columns={getExcelHeaders()}
                            disabled={selectedData.length === 0}
                            onSuccess={onExportSuccess}
                        />
                        <Popover
                            className="check-popover"
                            placement={'topLeft'}
                            trigger={'click'}
                            content={
                                <UICheckbox 
                                    value={checkList}
                                    onChange={checkListChange}
                                    options={checkOptions}
                                />
                            }
                        >
                            <Button type={'primary'}>筛选</Button>
                        </Popover>
                    </Space>
                </div>
                <Table
                    rowKey={TENANT_PROPS.tenantId}
                    // columns={columns}
                    columns={filterColumns()}
                    dataSource={tableData.list}
                    rowSelection={tableRowSelection}
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