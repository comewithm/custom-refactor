import { TENANT_PROPS, TenantInfo } from "@/api/interface/tenant"
import { TENANT_ACCOUNT_LABEL } from "@/constants/tenant"
import { getElements } from "@/ui/helper"
import { FormItemMixture } from "@/ui/interface"
import { Col, Form, FormProps, Modal, ModalProps, Row } from "antd"
import { useEffect, useState } from "react"

interface TenantModalProps {
    formProps?: FormProps
    visible: boolean
    editModalInfo: TenantInfo
    onModalConfirm: () => void
    onModalCancel: () => void
}

export const TenantModal = (props: TenantModalProps) => {
    const {
        formProps,
        visible,
        editModalInfo,
        onModalConfirm,
        onModalCancel
    } = props

    const isEditStatus = !!Object.keys(editModalInfo).length

    const [form] = Form.useForm()

    const [tenantType, setTenantType] = useState(TENANT_ACCOUNT_LABEL[0].value)

    useEffect(() => {
        if(isEditStatus) {
            setTenantType(editModalInfo.accountType!)
            // set edit modal value
            form.setFieldsValue({
                ...editModalInfo
            })
        }
    }, [editModalInfo])

    
    // modal
    const onOk = async () => {
        // const res = await form.validateFields()
        // request commit api

        // callback
        onModalConfirm()
    }

    const onCancel = () => {
        onModalCancel()
    }

    const modalProps: ModalProps = {
        open: visible,
        title: '新增',
        centered: true,
        width: 700,
        onOk,
        onCancel
    }

    // fieldList
    const fieldList: FormItemMixture[] = [
        {
            type: 'radio',
            itemProps: {
                name: TENANT_PROPS.accountType,
                label: '账号类型',
                labelCol: {style: {width: 100}},
                initialValue: tenantType,
                rules: [{ required: true, message: '请选择' }]
            },
            elementProps: {
                onChange: (e) => {setTenantType(e.target.value)},
                options: TENANT_ACCOUNT_LABEL,
                disabled: isEditStatus
            }
        } as FormItemMixture<'radio'>,
        {
            type: 'input',
            itemProps: {
                visible: tenantType === TENANT_ACCOUNT_LABEL[0].value,
                name: TENANT_PROPS.personName,
                label: '姓名',
                labelCol: {style: {width: 100}},
                rules: [{ required: true, message: '请输入姓名'}]
            },
            elementProps: {
                maxLength: 20,
                showCount: true
            }
        } as FormItemMixture<'input'>,
        {
            type: 'input',
            itemProps: {
                visible: tenantType === TENANT_ACCOUNT_LABEL[1].value,
                name: TENANT_PROPS.enterpriseName,
                label: '企业名称',
                labelCol: {style: {width: 100}},
                rules: [{ required: true, message: '请输入企业名称'}]
            },
            elementProps: {
                maxLength: 50,
                showCount: true
            }
        } as FormItemMixture<'input'>,
        {
            type: 'input',
            itemProps: {
                visible: tenantType === TENANT_ACCOUNT_LABEL[1].value,
                name: TENANT_PROPS.businessType,
                label: '业务类型',
                labelCol: {style: {width: 100}},
                rules: [{ required: true, message: '请输入业务类型'}]
            },
            elementProps: {
                maxLength: 50,
                showCount: true
            }
        } as FormItemMixture<'input'>,
        {
            type: 'inputNumber',
            itemProps: {
                name: TENANT_PROPS.userMobile,
                label: '手机号',
                labelCol: {style: {width: 100}},
                rules: [{ required: true, message: '请输入手机号'}],
            },
            elementProps: {
                maxLength: 11,
                style: {width: '100%'}
            }
        } as FormItemMixture<'inputNumber'>,
        {
            type: 'input',
            itemProps: {
                name: TENANT_PROPS.userName,
                label: '登录账号',
                labelCol: {style: {width: 100}},
                rules: [{ required: true, message: '请输入登录账号'}]
            },
            elementProps: {
                minLength: 8,
                maxLength: 20
            }
        } as FormItemMixture<'input'>,
        {
            type: 'inputPassword',
            itemProps: {
                name: TENANT_PROPS.userPwd,
                label: '密码',
                labelCol: {style: {width: 100}},
                rules: [{ required: true, message: '请输入密码'}]
            },
            elementProps: {
                visibilityToggle: true
            }
        } as FormItemMixture<'inputPassword'>,
        {
            type: 'textArea',
            itemProps: {
                name: TENANT_PROPS.notes,
                label: '备注',
                labelCol: {style: {width: 100}},
            },
            elementProps: {
                showCount: true,
                count: {
                    max: 200
                },
                rows: 4
            }
        } as FormItemMixture<'textArea'>
    ]

    return (
        <Modal
            {...modalProps}
        >
            <Form
                {...formProps}
                form={form}
            >
                <Row>
                    {
                        fieldList.map((field, idx) => (
                            <Col key={idx} span={24}>
                                {getElements(field)}
                            </Col>
                        ))
                    }
                </Row>
            </Form>
        </Modal>
    )
}