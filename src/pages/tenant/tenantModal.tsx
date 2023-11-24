import { TENANT_PROPS } from "@/api/interface/tenant"
import { getElements } from "@/ui/helper"
import { FormItemMixture } from "@/ui/interface"
import { Col, Form, Modal, ModalProps, Row } from "antd"

interface TenantModalProps {
    visible: boolean
}

export const TenantModal = (props: TenantModalProps) => {

    const {
        visible = false,
    } = props

    const [form] = Form.useForm()

    // Modal
    const onModalOk = () => {}

    const onModalCancel = () => {}

    const modalProps: ModalProps = {
        title: '新增',
        open: visible,
        onOk: onModalOk,
        onCancel: onModalCancel,
    }

    const onRadioChange = () => {

    }

    // fieldList
    const fieldList: FormItemMixture[] = [
        {
            type: 'radio',
            itemProps: {
                name: TENANT_PROPS.accountType,
                label: '账号类型',
                rules: [{required: true, message: '请选择'}]
            },
            elementProps: {
                onChange: onRadioChange,
                
            }

        } as FormItemMixture<'radio'>
    ]

    return (
        <Modal
            {...modalProps}
        >
            <Form
                form={form}
            >
                <Row gutter={24}>
                {
                    fieldList.map((field, idx) => (
                        <Col key={idx} span={6}>
                            {getElements(field)}
                        </Col>
                    ))
                }
            </Row>
            </Form>
        </Modal>
    )
}